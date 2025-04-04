import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customerStore", () => {
  const customer = reactive({
    FirstName: "",
    LastName: "",
    Email: "",
    Address: "",
    TaxIdNo: "",
  });

  const customerList = ref([]);
  const customerToUpdate = ref([]);
  const customerToDelete = ref([]);

  const customerService = useCustomerService();

  function setCustomer(customer: any) {
    customerList.value = customer;
  }

  async function getCustomer() {
    try {
      const response = await customerService.getCustomers();
      customerList.value = response; // อัปเดต State
    } catch (error) {
      console.error("❌ Failed to load products:", error);
    }
  }

  function setCustomerToUpdate(customer: any) {
    customerToUpdate.value = customer;
  }
  function setcustomerToDelete(customer: any) {
    customerToDelete.value = customer;
  }

  function cleaCustomerToUpdate() {
    customerToUpdate.value = null;
  }
  function cleaCustomerToDelete() {
    customerToUpdate.value = null;
  }

  return {
    setCustomer,
    getCustomer,
    customerList,
    customerToUpdate,
    customerToDelete,
    setCustomerToUpdate,
    setcustomerToDelete,
    cleaCustomerToUpdate,
    cleaCustomerToDelete,
  };
});
