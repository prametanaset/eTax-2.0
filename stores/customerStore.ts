import { defineStore } from "pinia";
import type { Customer } from "~/types/customer";

export const useCustomerStore = defineStore("customerStore", () => {
  const customerList = ref<Array<Customer>>([]);
  const customerToUpdate = ref<Array<Customer>>([]);
  const customerToDelete = ref<Array<Customer>>([]);

  const customerService = useCustomerService();

  function setCustomer(customer: Array<Customer>) {
    customerList.value = customer;
  }

  async function getCustomer() {
    try {
      const response = await customerService.getCustomersService();
      customerList.value = response; // อัปเดต State
    } catch (error) {
      console.error("❌ Failed to load products:", error);
    }
  }

  function setCustomerToUpdate(customer: Array<Customer>) {
    customerToUpdate.value = customer;
  }
  function setcustomerToDelete(customer: Array<Customer>) {
    customerToDelete.value = customer;
  }

  function cleaCustomerToUpdate() {
    customerToUpdate.value = [];
  }
  function cleaCustomerToDelete() {
    customerToUpdate.value = [];
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
