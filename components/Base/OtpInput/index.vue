<script setup lang="ts">
import { PinInput, PinInputGroup, PinInputSlot } from '@/components/ui/pin-input'
import { FormControl } from '@/components/ui/form'
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  length?: number
  name?: string
  id?: string
  placeholder?: string
  type?: string
}>()

// ดึง store ที่เก็บ otpValue
const authForm = useRegisterFormStore()

const OTP_LENGTH = computed(() => props.length ?? 6)
// sync ค่าใน store มาแสดงใน local
const localValue = ref<string[]>(Array(OTP_LENGTH.value).fill(''))
watch(
  () => authForm.otpValue,
  (val) => {
    if (!val) return

    const next = Array(OTP_LENGTH.value)
      .fill('')
      .map((_, i) => val[i] || '')

    if (JSON.stringify(localValue.value) !== JSON.stringify(next)) {
      localValue.value = next
    }
  },
  { immediate: true, deep: true }
)


// แทน emit:update:modelValue ให้เขียนลง store โดยตรง
function handleUpdate(val: string[]) {
  const next = Array(OTP_LENGTH.value)
    .fill('')
    .map((_, i) => val[i] || '')
  authForm.otpValue = next
}

// เมื่อครบ ให้เก็บลง store และเรียก action
function handleComplete(val: string[]) {
  authForm.otpValue = val
  authForm.handleComplete(val)
}
</script>

<template>
  <FormControl>
    <PinInput
      :model-value="localValue"
      @update:model-value="handleUpdate"
      :otp="true"
      :type="(props.type === 'text' ? 'text' : 'number')"
      :placeholder="props.placeholder || '○'"
      class="flex gap-2 items-center mt-1"
      :name="props.name"
      :id="props.id"
      autocomplete="one-time-code"
    >
      <PinInputGroup>
        <PinInputSlot
          v-for="(_, index) in OTP_LENGTH"
          :key="index"
          :index="index"
        />
      </PinInputGroup>
    </PinInput>
  </FormControl>
</template>
