import { defineStore } from "pinia";
const { listMessages, getMessage, markAsRead } = useGmailService();
const route = useRoute();

export const useMailStore = defineStore("mailStore", () => {
  const selectMail = ref<{
    data: any;
    renderHtml: string;
  } | null>(null);

  const mailList = reactive({
    data: [] as any[],
    nextPageToken: null as string | null,
  });

  function updateMailList(newData: any[], nextToken: string | null) {
    const existingIds = new Set(mailList.data.map((m) => m.id));
    const uniqueNew = newData.filter((m) => !existingIds.has(m.id));
    mailList.data.push(...uniqueNew);
    mailList.nextPageToken = nextToken;
  }

  async function setSelectMail(mail: any) {
    const html = await getMessage(mail.id);
    await markAsRead(mail.id);

    // อัปเดต labelIds ใน memory
    mail.read = true;

    // // อัปเดตใน list
    const index = mailList.data.findIndex((m) => m.id === mail.id);
    if (index !== -1) {
      mailList.data[index] = { ...mail };
    }

    selectMail.value = {
      data: mail,
      renderHtml: html as string,
    };
  }

  function clearSelectMailStore() {
    selectMail.value = null;
  }

  watch(
    () => route.path,
    (newVal) => {
      if (newVal !== "/mail") {
        clearSelectMailStore();
      }
    }
  );

  return {
    selectMail,
    mailList,
    updateMailList,
    setSelectMail,
    clearSelectMailStore,
  };
});
