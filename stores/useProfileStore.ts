import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const user = ref<null | {
    id: string;
    username: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
  }>(null);

  const merchant = ref<null | {
    id: string;
    user_id: string;
    merchant_type_id: number;
    merchant_type: {
      ID: number;
      Name: "person" | "company";
    };
  }>(null);

  const person = ref<null | {
    id: string;
    merchant_id: string;
    first_name: string;
    last_name: string;
    vat_no: string;
  }>(null);

  const company = ref<null | {
    id: string;
    merchant_id: string;
    company_name: string;
    vat_no: string;
  }>(null);

  const stores = ref<
    Array<{
      id: string;
      merchant_id: string;
      store_name: string;
      branch_no: string;
      created_at: string;
      updated_at: string;
    }>
  >([]);

  // 🧠 ตรวจสอบประเภท merchant
  const isCompany = computed(
    () => merchant.value?.merchant_type.Name === "company"
  );
  const isPerson = computed(
    () => merchant.value?.merchant_type.Name === "person"
  );

  // 👤 ชื่อเต็มของ person หรือ company
  const displayName = computed(() => {
    if (isCompany.value && company.value) {
      return company.value.company_name;
    }
    if (isPerson.value && person.value) {
      return `${person.value.first_name} ${person.value.last_name}`;
    }
    return "";
  });

  // 🎯 Setter หลักจาก API
  function setProfile(data: any) {
    if (!data || typeof data !== "object") {
      console.warn("Invalid profile data:", data);
      user.value = null;
      merchant.value = null;
      person.value = null;
      company.value = null;
      stores.value = [];
      return;
    }

    user.value = data.user ?? null;

    const merchantInfo = data.merchant_info ?? {};

    merchant.value = merchantInfo.merchant ?? null;
    stores.value = merchantInfo.stores ?? [];

    if (merchantInfo.person) {
      person.value = merchantInfo.person;
      company.value = null;
    } else if (merchantInfo.company) {
      company.value = merchantInfo.company;
      person.value = null;
    } else {
      person.value = null;
      company.value = null;
    }
  }

  return {
    user,
    merchant,
    person,
    company,
    stores,
    isCompany,
    isPerson,
    displayName,
    setProfile,
  };
});
