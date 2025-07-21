import type { label } from "@unovis/ts/components/axis/style";
import { Filter } from "lucide-vue-next";

export function useGmailService() {
  const { gmailClient } = useGmailClient();
  const mailStore = useMailStore();

  interface GmailListResult {
    messages: { id: string }[];
    nextPageToken?: string;
  }

  async function createLabel(name: string) {
    try {
      // ดึง label ทั้งหมดมาก่อน
      const res = await gmailClient.get("/users/me/labels");
      mailStore.labelList = res.data;
      const etaxlabel = res.data.labels.find((l: any) => l.name === name);
      if (etaxlabel) {
        mailStore.labelID = etaxlabel.id;
        return;
      }

      // สร้าง label ใหม่
      const createRes = await gmailClient.post("/users/me/labels", {
        name,
        labelListVisibility: "labelShow",
        messageListVisibility: "show",
      });

      mailStore.labelID = createRes.data.id;
      return;
    } catch (error: any) {
      throw error;
    }
  }

  async function listMessages(
    keyword: string,
    maxResults = 10,
    pageToken?: string
  ): Promise<{ data: any[]; nextPageToken?: string }> {
    const params: Record<string, any> = { maxResults };
    if (pageToken) params.pageToken = pageToken;
    // ค้นหาที่ส่งเมลจาก edta
    params.q = `${keyword}`;
    // params.q = keyword;
    const res = await gmailClient.get<GmailListResult>("/users/me/messages", {
      params,
    });

    const messages = res.data.messages || [];

    const inboxDetails = await Promise.all(
      messages.map(async (msg) => {
        const res = await gmailClient.get(
          `/users/me/messages/${msg.id}?format=full`
        );
        const payload = res.data.payload;
        const headers = payload.headers || [];

        const getHeader = (name: string) =>
          headers.find((h: any) => h.name === name)?.value || "";

        // ค้นหาไฟล์แนบใน parts ของ payload
        // ฟังก์ชันดึงไฟล์แนบจาก messageId และ attachmentId
        const getAttachments = async (parts: any[] = []) => {
          const files = [];
          for (const part of parts) {
            if (part.filename && part.body?.attachmentId) {
              const attachmentId = part.body.attachmentId;
              const file = await getFile(msg.id, attachmentId);
              files.push({
                filename: part.filename,
                file,
              });
            }
          }
          return files;
        };

        // ค้นหาไฟล์แนบใน parts ของ payload
        const attachments = await getAttachments(payload.parts);

        return {
          id: msg.id,
          snippet: res.data.snippet || "",
          subject: getHeader("Subject"),
          from: getHeader("From"),
          to: getHeader("To"),
          date: getHeader("Date"),
          read: !res.data.labelIds.includes("UNREAD"),
          labels: mailStore.labelList.labels.filter(
            (label) =>
              ["etax", "etda"].includes(label.name) &&
              res.data.labelIds.includes(label.id)
          ),
          html: await getMessage(msg.id),
          attachments, // เพิ่มข้อมูลไฟล์แนบ
        };
      })
    );

    return {
      data: inboxDetails,
      nextPageToken: res.data.nextPageToken,
    };
  }

  async function getMessage(id: string): Promise<string | null> {
    const res = await gmailClient.get(`/users/me/messages/${id}?format=full`);
    const payload = res.data?.payload;

    // recursive function เพื่อหา text/html ในทุกระดับ
    function findHtmlPart(part: any): string | null {
      if (!part) return null;

      // ถ้าเป็น HTML โดยตรง
      if (part.mimeType === "text/html" && part.body?.data) {
        return part.body.data;
      }

      // ถ้าเป็น multipart (มี sub-parts)
      if (Array.isArray(part.parts)) {
        for (const subPart of part.parts) {
          const result = findHtmlPart(subPart);
          if (result) return result;
        }
      }

      return null;
    }

    const raw = findHtmlPart(payload) || payload?.body?.data;
    if (!raw) return null;

    // แปลงจาก Base64 URL-safe → Standard แล้ว decode
    const decoded = atob(raw.replace(/-/g, "+").replace(/_/g, "/"));
    const decodedHtml = decodeURIComponent(
      Array.from(decoded)
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );

    return decodedHtml;
  }

  function encodeSubject(subject: string) {
    const utf8Bytes = new TextEncoder().encode(subject);
    const base64 = btoa(String.fromCharCode(...utf8Bytes));
    return `=?UTF-8?B?${base64}?=`;
  }

  async function sendMail(
    to: string,
    subject: string,
    body: string,
    labelId: string
  ) {
    const email = [
      `To: ${to}`,
      'Content-Type: text/html; charset="UTF-8"',
      "MIME-Version: 1.0",
      `Subject: ${encodeSubject(subject)}`,
      "",
      body,
    ].join("\n");

    const encodedMessage = btoa(unescape(encodeURIComponent(email)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // 1. ส่งอีเมลก่อน
    const res = await gmailClient.post("/users/me/messages/send", {
      raw: encodedMessage,
    });

    const messageId = res.data.id;

    // 2. ถ้ามี labelId ส่งมา ให้เพิ่ม label หลังส่ง
    if (messageId) {
      await gmailClient.post(`/users/me/messages/${messageId}/modify`, {
        addLabelIds: [labelId],
      });
    }

    return res;
  }

  async function markAsRead(id: string) {
    try {
      const res = await gmailClient.post(`/users/me/messages/${id}/modify`, {
        removeLabelIds: ["UNREAD"],
      });
      // อัปเดต local state, ถ้ามี
    } catch (err) {
      console.error("Failed to mark mail as read", err);
    }
  }

  async function getFile(messageId: string, attachmentId: string) {
    try {
      // ดึงข้อมูลไฟล์แนบจาก Gmail API
      const res = await gmailClient.get(
        `/users/me/messages/${messageId}/attachments/${attachmentId}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching attachment:", error);
    }
  }

  function downloadFile(file: { filename: string; data: string }) {
    const mimeType = getMimeType(file.filename);
    const raw = file.data.includes(",") ? file.data.split(",")[1] : file.data;
    const safeBase64 = decodeBase64UrlSafe(raw);

    try {
      const byteCharacters = atob(safeBase64);
      const byteArrays: Uint8Array[] = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: mimeType });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.filename;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }

  function decodeBase64UrlSafe(base64url: string): string {
    let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }
    return base64;
  }

  // Helper to detect file MIME type from extension
  function getMimeType(filename: string): string {
    const ext = filename.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "ics":
        return "text/calendar";
      case "pdf":
        return "application/pdf";
      case "txt":
        return "text/plain";
      case "csv":
        return "text/csv";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "gif":
        return "image/gif";
      case "png":
        return "image/png";
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      default:
        return "application/octet-stream";
    }
  }

  function normalizeBase64(base64url: string): string {
    // แปลง base64 ที่มาจาก Gmail ให้เป็นรูปแบบปกติ
    let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    if (pad) {
      base64 += "=".repeat(4 - pad);
    }
    return base64;
  }

  function imageSrc(file: any): string {
    const ext = file.filename.split(".").pop() || "jpg";
    const mime = getMimeType(ext);
    const base64 = normalizeBase64(file.file.data);
    return `data:${mime};base64,${base64}`;
  }

  return {
    listMessages,
    getMessage,
    sendMail,
    markAsRead,
    downloadFile,
    imageSrc,
    createLabel,
  };
}
