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

        return {
          id: msg.id,
          snippet: res.data.snippet || "",
          subject: getHeader("Subject"),
          from: getHeader("From"),
          date: getHeader("Date"),
          read: !res.data.labelIds.includes("UNREAD"),
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

  return {
    listMessages,
    getMessage,
    sendMessage,
    markAsRead,
  };
}
