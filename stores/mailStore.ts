import type { UUID } from "crypto";
import { defineStore } from "pinia";
import { mails } from "@/components/Base/Mail/data/mail";
const { listMessages, getMessage } = useGmailService();

export const useMailStore = defineStore("mailStore", () => {
  const selectMail = ref<{
    data: any;
    renderHtml: string;
  } | null>(null);

  const mailList = ref([]);

  function getMails() {}

  async function setSelectMail(mail: any) {
    const html = await getMessage(mail.id);
    selectMail.value = {
      data: { ...mail },
      renderHtml: html as string,
    };
  }

  function clearSelectMailStore() {
    selectMail.value = null;
  }

  return {
    selectMail,
    mailList,
    clearSelectMailStore,
    getMails,
    setSelectMail,
  };
});
