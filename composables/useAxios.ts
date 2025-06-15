import axios from "axios";

export default function useAxios() {
  const config = useRuntimeConfig(); // ใช้ใน setup context

  // const token = localStorage.getItem("token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaS5leGFtcGxlLmNvbSIsImV4cCI6MTc1MDAzMDQwNywiaWF0IjoxNzQ5OTcwNDA3LCJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJqdGkiOiI5ZTY0YWU5ZS0xNWI4LTRmYjUtOTJhYS05NjljMTc4MTMyOTEiLCJuYmYiOjE3NDk5NzA0MDcsInNjb3BlIjoidXNlciIsInN1YiI6IjYiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIn0.RTXkuW9yjOW9gE9oYhwEwdeD65e5Dg1AQ_BiH6F1iz0";

  const $axios = axios.create({
    baseURL: config.public.$http, // ใช้ค่า baseURL จาก runtimeConfig
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return $axios;
}
