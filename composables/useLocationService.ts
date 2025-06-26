import useAxios from "@/composables/useAxios";
interface Dropdown {
  dvalue: number;
  dlabel: string;
}

export const useLocationService = () => {
  const $axios = useAxios();

  const mapToDropdown = (items: any[]): Dropdown[] => {
    return items.map((item) => ({
      dvalue: item.Value,
      dlabel: item.Label,
    }));
  };

  const getProvinces = async (): Promise<Dropdown[]> => {
    const res = await $axios.get("/locations/province");
    return mapToDropdown(res.data);
  };

  const getProvinceById = async (id: number) => {
    const response = await $axios.get(`/locations/province/${id}`);
    return response.data;
  };

  const getDistrictById = async (id: number) => {
    const response = await $axios.get(`/locations/district/${id}`);
    return response.data;
  };

  const getDistrictsByProvinceId = async (
    provinceId: number
  ): Promise<Dropdown[]> => {
    const res = await $axios.get(`/locations/province/${provinceId}/districts`);
    return mapToDropdown(res.data);
  };

  const getSubDistrictById = async (id: number) => {
    const response = await $axios.get(`/locations/subdistrict/${id}`);
    return response.data;
  };

  const getZipCode = async (id: number) => {
    const response = await $axios.get(`/locations/subdistrict/${id}`);
    return response.data.zip_code;
  };

  const getSubDistrictsByDistrictId = async (
    districtId: number
  ): Promise<Dropdown[]> => {
    const res = await $axios.get(
      `/locations/districts/${districtId}/subdistricts`
    );
    return mapToDropdown(res.data);
  };

  return {
    getProvinces,
    getProvinceById,
    getDistrictById,
    getDistrictsByProvinceId,
    getSubDistrictById,
    getSubDistrictsByDistrictId,
    getZipCode,
  };
};
