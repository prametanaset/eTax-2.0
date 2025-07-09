export function useGmailService() {
  const { gmailClient } = useGmailClient()

  async function listMessages(maxResults = 10) {
    const res = await gmailClient.get('/users/me/messages', {
      params: { maxResults }
    })
    return res.data
  }

  async function getMessage(id: string) {
    const res = await gmailClient.get(`/users/me/messages/${id}`)
    return res.data
  }

  async function sendMessage(rawBase64: string) {
    const res = await gmailClient.post('/users/me/messages/send', {
      raw: rawBase64
    })
    return res.data
  }

  return {
    listMessages,
    getMessage,
    sendMessage
  }
}
