import { defineStore } from "pinia";

export const useLocationStore = defineStore("locationStore", () => {
  const locationService = useLocationService();

  interface Dropdown {
    value: number;
    label: string;
  }

  const provincesList = ref<Array<Dropdown>>([]);
  const districtList = ref<Array<Dropdown>>([]);
  const subDistrictList = ref<Array<Dropdown>>([]);

  // โหลด provinces ทั้งหมด (load ครั้งเดียว)
  const fetchProvinces = async () => {
    if (provincesList.value.length === 0) {
      provincesList.value = await locationService.getProvinces();
    }
  };
  // โหลด Districts  ทั้งหมด (load ครั้งเดียว)
  const fetchDistricts = async (provinceId: number) => {
    if (provincesList.value.length === 0) {
      provincesList.value = await locationService.getDistrictsByProvinceId(
        provinceId
      );
    }
  };
  // โหลด SubDistricts ทั้งหมด (load ครั้งเดียว)
  const fetchSubDistricts = async (districtId: number) => {
    if (provincesList.value.length === 0) {
      provincesList.value = await locationService.getSubDistrictsByDistrictId(
        districtId
      );
    }
  };

  return {
    provincesList,
    districtList,
    subDistrictList,
    fetchProvinces,
    fetchDistricts,
    fetchSubDistricts,
  };
});
