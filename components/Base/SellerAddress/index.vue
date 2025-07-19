<template>
  <div class="bg-white dark:bg-purple-950/60 border border-gray-200 dark:border-purple-700 rounded-lg p-5 transition-colors">
    <h2 class="text-gray-700 dark:text-purple-100 text-lg font-semibold flex items-center gap-2 mb-4">
      <Store class="w-5 h-5 text-gray-700 dark:text-purple-300" />
      ข้อมูลร้านค้า
    </h2>

    <div class="text-base text-gray-700 dark:text-purple-100 space-y-1">
      <InfoRow label="เลขประจำตัวผู้เสียภาษี" :value="seller.taxNo" />
      <InfoRow label="ชื่อบริษัท" :value="seller.name" />
      <InfoRow label="ที่อยู่" :value="seller.address" />
      <InfoRow label="อีเมล" :value="seller.email" />
      <InfoRow label="เบอร์โทร" :value="seller.phone" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Store } from 'lucide-vue-next'
import InfoRow from '~/components/Base/SellerAddress/InfoRow.vue'
import { profileEnd } from 'console'

const profileStore = useProfileStore()
const invoiceStore = useInvoiceStore()
const locateService = useLocateService()

const seller = ref({
  name: '',
  taxNo: '',
  address: '',
  email: null,
  phone: null,
  logo: null,
})

onMounted(async () => {
  const store = profileStore.stores?.[0]
  if (!store) return

  const address = await getSellerAddress(store)

  seller.value = {
    name: store.store_name || '',
    taxNo: profileStore.company?.vat_no || '',
    address: address || '',
    email: null,
    phone: null,
    logo: null,
  }

  invoiceStore.setSellerInfo({
    type: (profileStore.merchant?.merchant_type.Name?? 'company') as 'company' | 'person',
    company: {
      name: store.store_name || '',
      tax_id: profileStore.company?.vat_no || '',
      address: address || '',
    },
    store_id: store.id,
  })
})


async function getSellerAddress(store: any): Promise<string> {
  try {
    const address = store.address || {}
    const [province, district, subdistrict] = await Promise.all([
      address.province_id ? locateService.getProvinceById(String(address.province_id)) : null,
      address.district_id ? locateService.getDistrictById(String(address.district_id)) : null,
      address.subdistrict_id ? locateService.getSubdistrictById(String(address.subdistrict_id)) : null,
    ])

    return `${address.address_line1 || ''} ต.${subdistrict?.name_th || ''} อ.${district?.Label || ''} จ.${province?.Label || ''} ${address.postal_code || ''}`.trim()
  } catch (error) {
    console.error('Failed to fetch address:', error)
    return ''
  }
}
</script>
