import axios from "axios";

export default function useAxios() {
  const config = useRuntimeConfig(); // ใช้ใน setup context

  const $axios = axios.create({
    baseURL: config.public.$http, // ใช้ค่า baseURL จาก runtimeConfig
  });

  return $axios;
}
