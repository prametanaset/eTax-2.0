import useAxios from "@/composables/useAxios";
import type { Customer } from "~/types/customer";

export default function useCustomers() {
  const { apiClient } = useApiClient();
  const profileStore = useProfileStore();
  const storeId = profileStore.stores[0].id || null;

  const getCustomersService = async () => {
    try {
      const response = await apiClient.get(`/customers/store/${storeId}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching customers:", error);
      throw error;
    }
  };
  const getCustomersByIdService = async (id: number) => {
    try {
      const response = await apiClient.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching customers:", error);
      throw error;
    }
  };

  const updateCustomerService = async (
    id: Number,
    payload: Customer,
    type: "person" | "company"
  ) => {
    try {
      const formattedPayload = {
        customer: {
          store_id: storeId, // ✅ ใส่ให้ตายตัว หรือรับจาก context
          customer_type: type,
          customer_id: id,
          status: "active",
          created_by: 1,
          updated_by: 1,
        },
        person:
          type === "person"
            ? {
                first_name: payload.firstName,
                last_name: payload.lastName,
                tin: payload.tin || "",
              }
            : undefined,
        company:
          type === "company"
            ? {
                company_name: payload.firstName,
                tin: `${payload.tin}${payload.branchCode}` || "",
              }
            : undefined,
        address: {
          address_line1: payload.address,
          address_line2: "", // ใส่ถ้ามีช่องกรอกที่อยู่เพิ่ม
          province_id: payload.provinceId,
          districts_id: payload.districtsId,
          subdistricts_id: payload.subdistrictsId,
          postal_code: String(payload.zipCode),
        },
        contacts: [
          {
            contact_type: "email",
            contact_value: payload.email,
          },
          ...(payload.phone
            ? [
                {
                  contact_type: "phone",
                  contact_value: payload.phone,
                },
              ]
            : []),
        ],
      };
      // ส่งไปยัง API
      const response = await apiClient.put(
        `/customers/${id}`,
        formattedPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // สมมติ API ส่งข้อมูลลูกค้ากลับมา
    } catch (error) {
      console.error("❌ Error updating customers:", error);
    }
  };

  const createCustomerService = async (
    payload: Customer,
    type: "person" | "company"
  ) => {
    try {
      const formattedPayload = {
        customer: {
          store_id: storeId, // ✅ ใส่ให้ตายตัว หรือรับจาก context
          customer_type: type,
          status: "active",
          created_by: 1,
          updated_by: 1,
        },
        person:
          type === "person"
            ? {
                first_name: payload.firstName,
                last_name: payload.lastName,
                tin: payload.tin || "",
              }
            : undefined,
        company:
          type === "company"
            ? {
                company_name: payload.firstName,
                tin: payload.tin || "",
              }
            : undefined,
        address: {
          address_line1: payload.address,
          address_line2: "", // ใส่ถ้ามีช่องกรอกที่อยู่เพิ่ม
          province_id: payload.provinceId,
          districts_id: payload.districtsId,
          subdistricts_id: payload.subdistrictsId,
          postal_code: String(payload.zipCode),
        },
        contacts: [
          {
            contact_type: "email",
            contact_value: payload.email,
          },
          ...(payload.phone
            ? [
                {
                  contact_type: "phone",
                  contact_value: payload.phone,
                },
              ]
            : []),
        ],
      };

      // ส่งไปยัง API
      const response = await apiClient.post("/customers", formattedPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
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

  const deleteCustomerService = async (id: Number) => {
    try {
      const response = await apiClient.delete(`/customers/${id}`);
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
    getCustomersByIdService,
  };
}
