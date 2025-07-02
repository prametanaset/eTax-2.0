// ~/composables/useUserService.ts
import { useFetch } from '#app'   // หรือใช้ $fetch ตรง ๆ ก็ได้

export function useMerchantService() {
  const { apiClient } = useApiClient();

   async function registerMerchant(payload: {
    merchant_type: string,
    person?: {
      first_name: string,
      last_name: string,
      vat_no?: string
    },
    company?: {
      company_name: string,
      vat_no: string
    },
    store: {
      store_name: string,
      branch_no: string,
      address_line1: string,
      subdistrict_id: number,
      district_id: number,
      province_id: number,
      postal_code: string,
    },
    contacts?: {
      contact_type: string,
      contact_value: string
    }[]
  }) {
    // สมมติ endpoint ของคุณคือ /merchant/register
    // แนะนำให้ไม่ต้องใส่ skipAuth: true เพราะ endpoint นี้ต้อง auth (ดูจาก c.Locals("user_id"))
    return apiClient.post("/merchants/register", payload)
  }

  

  return {
    registerMerchant,
  };
}
