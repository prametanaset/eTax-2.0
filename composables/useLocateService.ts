export const useLocateService = () => {
  const { apiClient } = useApiClient();

  async function fetchProvinces(id?: string) {
    const url = id ? `/locations/province/${id}` : "/locations/province";
    const response = await apiClient.get(url);
    return response.data;
  }

  async function fetchDistricts(id?: string) {
    const url = id ? `/locations/province/${id}/districts` : "/locations/district";
    const response = await apiClient.get(url);
    return response.data;
  }
  
  async function fetchSubdistricts(id?: string) {
    const url = id ? `/locations/districts/${id}/subdistricts` : "/locations/subdistrict";
    const response = await apiClient.get(url);
    return response.data;
  }

  // fetchZipcode
  async function fetchZipcode(id?: string) {
    const url = id ? `/locations/subdistrict/${id}/zip_code` : "/locations/subdistrict";
    const response = await apiClient.get(url);
    return response.data;
  }

  async function getProvinceById(id?: string) {
    const response = await apiClient.get(`/locations/province/${id}`);
    return response.data;
  }

  async function getDistrictById(id?: string) {
    const response = await apiClient.get(`/locations/district/${id}`);
    return response.data;
  }

  async function getSubdistrictById(id?: string) {
    const response = await apiClient.get(`/locations/subdistrict/${id}`);
    return response.data;
  }

  return {
    fetchProvinces,
    fetchDistricts,
    fetchSubdistricts,
    fetchZipcode,
    getProvinceById,
    getDistrictById,
    getSubdistrictById
  };
}
