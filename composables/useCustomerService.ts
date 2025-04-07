import useAxios from "@/composables/useAxios";
import { custom } from "zod";
import type { Customer } from "~/types/customer";

export default function useCustomers() {
  const $axios = useAxios(); // ดึง Axios จาก composable

  interface Customer {
    ID: number;
    StoreId: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Address: string;
    TaxIdNo: string;
  }

  const getCustomersService = async () => {
    try {
      const response = await $axios.get("/customers");
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching customers:", error);
      throw error;
    }
  };

  const updateCustomerService = async (payload: Customer) => {
    try {
      const response = await $axios.put(`/customers/${payload.ID}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // สมมติ API ส่งข้อมูลลูกค้ากลับมา
    } catch (error) {
      console.error("❌ Error updating customers:", error);
    }
  };

  const createCustomerService = async (payload: Customer) => {
    try {
      const response = await $axios.post("/customers", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // สมมติ API ส่งข้อมูลลูกค้ากลับมา
    } catch (error: any) {
      console.error(
        "❌ Error creating customer:",
        error?.response?.data || error.message
      );
      throw new Error(
        error?.response?.data?.message || "เกิดข้อผิดพลาดในการสร้างลูกค้า"
      );
    }
  };

  const deleteCustomerService = async (payload: Customer) => {
    try {
      const response = await $axios.delete(`/customers/${payload.ID}`);
      return response.data; // ✅ ส่งกลับเฉพาะข้อมูลที่สำคัญ
    } catch (error: any) {
      console.error(
        "❌ Error to delete customer:",
        error.response?.data || error
      );
      throw new Error(
        error.response?.data?.message || "Failed to delete customer"
      );
    }
  };

  return {
    getCustomersService,
    createCustomerService,
    updateCustomerService,
    deleteCustomerService,
  };
}
