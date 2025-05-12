import type { UUID } from "crypto";
import { defineStore } from "pinia";
import { mails } from "@/components/Base/Mail/data/mail";

export const useMailStore = defineStore("mailStore", () => {
  interface Mail {
    id: String;
    name: String;
    email: String;
    subject: String;
    text: String;
    date: Date;
    read: Boolean;
    labels: [];
  }

  const selectMail = ref<Array<Mail>>([]);
  const mailList = ref<Array<Mail>>([]);

  function getMails() {
    mailList.value = mails;
  }

  function setSelectMail(mail: any) {
    selectMail.value = mail;
  }

  function clearSelectMailStore() {
    selectMail.value = [];
  }

  return {
    selectMail,
    mailList,
    clearSelectMailStore,
    getMails,
    setSelectMail,
  };
});
