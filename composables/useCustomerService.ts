import useAxios from "@/composables/useAxios";
import type { Customer } from "~/types/customer";

export default function useCustomers() {
  const $axios = useAxios(); // ดึง Axios จาก composable

  const customerList = ref([]);

  const getCustomers = async () => {
    try {
      const response = await $axios.get("/customers");
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching customers:", error);
      throw error;
    }
  };

  const updateCustomers = async (payload: Customer) => {
    try {
      const response = await $axios.put("/customers", payload);
      return response.data; // สมมติ API ส่งข้อมูลลูกค้ากลับมา
    } catch (error) {
      console.error("❌ Error updating customers:", error);
    }
  };

  const createCustomerService = async (payload: Customer) => {
    console.log(payload);
  };
  const updateCustomerService = async (payload: Customer) => {
    console.log(payload);
  };
  const deleteCustomerService = async (payload: Customer) => {
    console.log(payload);
  };

  return {
    getCustomers,
    updateCustomers,
    createCustomerService,
    updateCustomerService,
    deleteCustomerService,
  };
}
