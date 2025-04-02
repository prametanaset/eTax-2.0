import useAxios from "@/composables/useAxios";
import type { Customer } from "~/types/customer";

export default function useCustomers() {
  const $axios = useAxios(); // ดึง Axios จาก composable

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

  return { getCustomers, updateCustomers };
}
