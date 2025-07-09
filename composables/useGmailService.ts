export function useGmailService() {
  const { gmailClient } = useGmailClient();

  interface GmailListResult {
    messages: { id: string }[];
    nextPageToken?: string;
  }

  async function listMessages(
    maxResults = 30,
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

    let raw = "";

    if (payload?.parts) {
      // หา part ที่เป็น text/html
      const htmlPart = payload.parts.find(
        (part: any) => part.mimeType === "text/html"
      );
      raw = htmlPart?.body?.data;
    } else {
      // บางอีเมลจะไม่มี parts → อยู่ใน payload.body
      raw = payload?.body?.data;
    }

    if (!raw) return null;

    // แปลงจาก Base64 URL-safe → Standard แล้ว decode
    const decoded = atob(raw.replace(/-/g, "+").replace(/_/g, "/"));
    return decodeURIComponent(
      Array.from(decoded)
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  }

  async function sendMessage(rawBase64: string) {
    const res = await gmailClient.post("/users/me/messages/send", {
      raw: rawBase64,
    });
    return res.data;
  }

  return {
    listMessages,
    getMessage,
    sendMessage,
  };
}
