<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // ✅ เพิ่ม Label
import { MapPin } from "lucide-vue-next";
import { useLocateService } from "@/composables/useLocateService";

const emit = defineEmits<{
  (
    e: "location-data",
    location: {
      provinceId: number | null;
      districtId: number | null;
      subdistrictId: number | null;
      zipCode: string;
    }
  ): void;
}>();

const locateService = useLocateService();

const provinces = ref<{ Value: number; Label: string }[]>([]);
const districts = ref<{ Value: number; Label: string }[]>([]);
const subdistricts = ref<{ Value: number; Label: string }[]>([]);

const selectedProvince = ref<number | null>(null);
const selectedDistrict = ref<number | null>(null);
const selectedSubdistrict = ref<number | null>(null);
const zipCode = ref("");

const showProvince = ref(false);
const showDistrict = ref(false);
const showSubdistrict = ref(false);

// Validation
const touchedProvince = ref(false);
const touchedDistrict = ref(false);
const touchedSubdistrict = ref(false);

const errorProvince = computed(
  () => touchedProvince.value && !selectedProvince.value
);
const errorDistrict = computed(
  () => touchedDistrict.value && !selectedDistrict.value
);
const errorSubdistrict = computed(
  () => touchedSubdistrict.value && !selectedSubdistrict.value
);

onMounted(async () => {
  provinces.value = await locateService.fetchProvinces();
});

watch(selectedProvince, async (code) => {
  if (code == null) return;
  districts.value = await locateService.fetchDistricts(code);
  selectedDistrict.value = null;
  selectedSubdistrict.value = null;
  subdistricts.value = [];
  zipCode.value = "";
});

watch(selectedDistrict, async (code) => {
  if (code == null) return;
  subdistricts.value = await locateService.fetchSubdistricts(code);
  selectedSubdistrict.value = null;
  zipCode.value = "";
});

watch(selectedSubdistrict, async (code) => {
  if (code == null) return;
  const zipRes = await locateService.fetchZipcode(code);
  zipCode.value = String(zipRes.zip_code);
  const data = {
    provinceId: selectedProvince.value,
    districtId: selectedDistrict.value,
    subdistrictId: selectedSubdistrict.value,
    zipCode: zipCode.value,
  };
  emit("location-data", data);
});

const labelProvince = computed(
  () =>
    provinces.value.find((p) => p.Value === selectedProvince.value)?.Label ||
    "เลือกจังหวัด"
);
const labelDistrict = computed(
  () =>
    districts.value.find((d) => d.Value === selectedDistrict.value)?.Label ||
    "เลือกอำเภอ"
);
const labelSubdistrict = computed(
  () =>
    subdistricts.value.find((s) => s.Value === selectedSubdistrict.value)
      ?.Label || "เลือกตำบล"
);
</script>

<template>
  <div class="grid grid-cols-2 items-center gap-4">
    <!-- จังหวัด -->
    <div class="relative">
      <Label class="block text-sm font-medium">
        จังหวัด <span class="text-red-500">*</span>
      </Label>
      <Popover v-model:open="showProvince">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            class="w-full justify-start"
            :class="{ 'border-red-500': errorProvince }"
            @blur="touchedProvince = true"
          >
            <MapPin class="w-4 h-4 mr-2" />
            <span class="truncate">{{ labelProvince }}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-0 w-72" align="start">
          <Command>
            <CommandInput placeholder="ค้นหาจังหวัด..." />
            <CommandList>
              <CommandEmpty>ไม่พบจังหวัด</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  v-for="p in provinces"
                  :key="p.Value"
                  :value="p.Value"
                  @select="
                    selectedProvince = p.Value;
                    showProvince = false;
                    touchedProvince = true;
                  "
                >
                  {{ p.Label }}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div v-if="errorProvince" class="text-xs text-red-500 mt-1 absolute">
        กรุณาเลือกจังหวัด
      </div>
    </div>

    <!-- อำเภอ -->
    <div class="relative">
      <Label class="block text-sm font-medium">
        อำเภอ <span class="text-red-500">*</span>
      </Label>
      <Popover v-model:open="showDistrict">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            class="w-full justify-start"
            :disabled="districts.length === 0"
            :class="{ 'border-red-500': errorDistrict }"
            @blur="touchedDistrict = true"
          >
            <MapPin class="w-4 h-4 mr-2" />
            <span class="truncate">{{ labelDistrict }}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-0 w-72" align="start">
          <Command>
            <CommandInput placeholder="ค้นหาอำเภอ..." />
            <CommandList>
              <CommandEmpty>ไม่พบอำเภอ</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  v-for="d in districts"
                  :key="d.Value"
                  :value="d.Value"
                  @select="
                    selectedDistrict = d.Value;
                    showDistrict = false;
                    touchedDistrict = true;
                  "
                >
                  {{ d.Label }}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div v-if="errorDistrict" class="text-xs text-red-500 mt-1 absolute">
        กรุณาเลือกอำเภอ
      </div>
    </div>

    <!-- ตำบล -->
    <div class="relative">
      <Label class="block text-sm font-medium">
        ตำบล <span class="text-red-500">*</span>
      </Label>
      <Popover v-model:open="showSubdistrict">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            class="w-full justify-start"
            :disabled="subdistricts.length === 0"
            :class="{ 'border-red-500': errorSubdistrict }"
            @blur="touchedSubdistrict = true"
          >
            <MapPin class="w-4 h-4 mr-2" />
            <span class="truncate">{{ labelSubdistrict }}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent class="p-0 w-72" align="start">
          <Command>
            <CommandInput placeholder="ค้นหาตำบล..." />
            <CommandList>
              <CommandEmpty>ไม่พบตำบล</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  v-for="s in subdistricts"
                  :key="s.Value"
                  :value="s.Value"
                  @select="
                    selectedSubdistrict = s.Value;
                    showSubdistrict = false;
                    touchedSubdistrict = true;
                  "
                >
                  {{ s.Label }}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div v-if="errorSubdistrict" class="text-xs text-red-500 mt-1 absolute">
        กรุณาเลือกตำบล
      </div>
    </div>

    <!-- รหัสไปรษณีย์ -->
    <div>
      <Label class="block text-sm font-medium">รหัสไปรษณีย์</Label>
      <Input
        v-model="zipCode"
        placeholder="รหัสไปรษณีย์"
        class="w-full"
        readonly
      />
    </div>
  </div>
</template>
