// stores/useShopFormStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShopFormStore = defineStore('shopForm', () => {
  // State
  const step = ref(1)
  const tab = ref<'corporate' | 'person'>('corporate')

  // Corporate
  const storeName = ref('')
  const taxId = ref('')
  const branchCode = ref('')
  // Person
  const contactName = ref('')
  const personalId = ref('')
  // Address
  const address = ref('')

  const province = ref<{ code: number | null; label: string }>({ code: null, label: '' })
  const district = ref<{ code: number | null; label: string }>({ code: null, label: '' })
  const subdistrict = ref<{ code: number | null; label: string }>({ code: null, label: '' })
  const zipcode = ref('')


  // Actions
  function reset() {
    step.value = 1
    tab.value = 'corporate'
    storeName.value = ''
    taxId.value = ''
    branchCode.value = ''
    contactName.value = ''
    personalId.value = ''
    address.value = ''
    province.value = { code: null, label: '' }
    district.value = { code: null, label: '' }
    subdistrict.value = { code: null, label: '' }
    zipcode.value = ''
  }
  function nextStep() {
    step.value++
  }
  function prevStep() {
    step.value--
  }

  return {
    // state
    step, tab,
    storeName, taxId, branchCode,
    contactName, personalId,
    address,
    province, district, subdistrict, zipcode,
    
    // actions
    nextStep, prevStep, reset,
  }
})
