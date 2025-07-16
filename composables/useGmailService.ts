export function useGmailService() {
  const { gmailClient } = useGmailClient();

  interface GmailListResult {
    messages: { id: string }[];
    nextPageToken?: string;
  }

  async function listMessages(
  maxResults = 10,
  pageToken?: string
): Promise<{ data: any[]; nextPageToken?: string }> {
  const res = await gmailClient.get<GmailListResult>("/users/me/messages", {
    params: { maxResults, pageToken },
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
      // const attachments = hasAttachments(payload.parts);
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
        date: getHeader("Date"),
        read: !res.data.labelIds.includes("UNREAD"),
        html: await getMessage(msg.id),
        attachments,  // เพิ่มข้อมูลไฟล์แนบ
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

  async function sendMessage(rawBase64: string) {
    const res = await gmailClient.post("/users/me/messages/send", {
      raw: rawBase64,
    });
    return res.data;
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

  async function getFile(messageId: string, attachmentId: string){
    try {
      // ดึงข้อมูลไฟล์แนบจาก Gmail API
      const res = await gmailClient.get(`/users/me/messages/${messageId}/attachments/${attachmentId}`);
      return res.data
      
      // // ตรวจสอบว่าไฟล์แนบมีข้อมูลหรือไม่
      // if (attachment && attachment.data) {
      //   const fileData = attachment.data;

      //   // แปลงจาก base64 เป็น Binary (blob)
      //   const decodedData = atob(fileData);  // แปลง base64 เป็น binary string

      //   // แปลงเป็น Uint8Array สำหรับการสร้างไฟล์
      //   const byteArray = new Uint8Array(decodedData.length);
      //   for (let i = 0; i < decodedData.length; i++) {
      //     byteArray[i] = decodedData.charCodeAt(i);
      //   }

      //   // สร้าง Blob เพื่อดาวน์โหลดไฟล์
      //   const blob = new Blob([byteArray]);
      //   return blob;
      }
    catch (error) {
      console.error('Error fetching attachment:', error);
    }
}

  return {
    listMessages,
    getMessage,
    sendMessage,
    markAsRead,
  };
}
