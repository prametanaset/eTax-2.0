import { defineStore } from "pinia";

export const useMailStore = defineStore("mailStore", () => {
  const { markAsRead } = useGmailService();
  const route = useRoute();
  const showMailType = ref("all");
  const labelID = ref("");
  const labelList = ref([] as any[]);

  const selectMail = ref<{
    data: any;
  } | null>(null);

  const date = reactive({
    start: "",
    end: "",
  });

  const mailList = reactive({
    data: [] as any[],
    nextPageToken: null as string | null,
  });
  const mailLoaded = ref(false);

  function updateMailList(newData: any[], nextToken: string | null) {
    const existingIds = new Set(mailList.data.map((m) => m.id));
    const uniqueNew = newData.filter((m) => !existingIds.has(m.id));
    mailList.data.push(...uniqueNew);
    mailList.nextPageToken = nextToken;
  }

  async function setSelectMail(mail: any) {
    // อัปเดต labelIds ใน memory
    if (showMailType.value === "unread")
      return (selectMail.value = {
        data: mail,
      });

    const mailread = mail.read;
    mail.read = true;
    // // อัปเดตใน list
    const index = mailList.data.findIndex((m) => m.id === mail.id);
    if (index !== -1) {
      mailList.data[index] = { ...mail };
    }

    selectMail.value = {
      data: mail,
    };

    if (!mailread) {
      await markAsRead(mail.id);
    }
  }

  function setShowMailType(type: string) {
    showMailType.value = type;
  }

  function clearSelectMailStore() {
    selectMail.value = null;
  }

  function clearMailListStore() {
    mailList.data = [];
    mailList.nextPageToken = null;
  }

  function getLabelByName(label: string) {}

  watch(
    () => route.path,
    (newVal) => {
      if (newVal !== "/mail") {
        clearSelectMailStore();
      }
    }
  );

  watch(
    () => selectMail.value,
    async (newVal, oldVal) => {
      if (
        showMailType.value === "unread" &&
        (newVal === null || newVal) &&
        oldVal
      ) {
        const index = mailList.data.findIndex((m) => m.id === oldVal.data.id);
        if (index !== -1) {
          // mark ว่าอ่านแล้ว
          mailList.data[index] = { ...mailList.data[index], read: true };
        }
        await markAsRead(oldVal.data.id);
      }
    },
    { deep: true }
  );

  return {
    labelID,
    labelList,
    selectMail,
    showMailType,
    mailList,
    mailLoaded,
    date,
    updateMailList,
    setSelectMail,
    clearSelectMailStore,
    setShowMailType,
    clearMailListStore,
  };
});
