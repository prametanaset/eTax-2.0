<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { ChevronsUpDown, Search, Check } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxTrigger,
  ComboboxList,
  ComboboxInput,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItemIndicator,
} from "@/components/ui/combobox";
import { useLocationService } from "@/composables/useLocationService";

interface Dropdown {
  dvalue: number;
  dlabel: string;
}

const props = defineProps<{
  modelValue?: Dropdown | null;
  type: "province" | "district" | "subdistrict";
  id?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Dropdown | null): void;
  (e: "selected-data", data: Dropdown): void;
}>();

const value = ref<Dropdown | null>(props.modelValue ?? null);
const options = ref<Dropdown[]>([]);

watch(
  () => props.modelValue,
  (newVal) => {
    value.value = newVal ?? null;
  }
);

watch(value, (val) => {
  emit("update:modelValue", val);
  if (val) emit("selected-data", val);
});

// โหลดข้อมูลจาก service
const service = useLocationService();

const loadOptions = async () => {
  if (props.type === "province") {
    options.value = await service.getProvinces();
  } else if (props.type === "district" && props.id) {
    options.value = await service.getDistrictsByProvinceId(props.id);
  } else if (props.type === "subdistrict" && props.id) {
    options.value = await service.getSubDistrictsByDistrictId(props.id);
  } else {
    options.value = [];
  }
};

onMounted(loadOptions);
watch(() => props.id, loadOptions);
</script>

<template>
  <Combobox v-model="value" by="dvalue">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button variant="outline" class="justify-between w-full">
          {{ value?.dlabel ?? "เลือกข้อมูล" }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput
          class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
          placeholder="ค้นหา..."
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-3"
        >
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>

      <ComboboxEmpty>ไม่พบข้อมูล</ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem v-for="item in options" :key="item.dvalue" :value="item">
          {{ item.dlabel }}
          <ComboboxItemIndicator>
            <Check class="ml-auto h-4 w-4" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
