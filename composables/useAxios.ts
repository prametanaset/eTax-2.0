import axios from "axios";

export default function useAxios() {
  const config = useRuntimeConfig(); // ใช้ใน setup context

  // const token = localStorage.getItem("token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2FwaS5leGFtcGxlLmNvbSIsImV4cCI6MTc1MDg4MjQzOCwiaWF0IjoxNzUwODIyNDM4LCJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJqdGkiOiI2MGE0ZDA4NC01ZDJkLTRmNjMtYjY0NC0wMDg3MjVhZGU2NWUiLCJuYmYiOjE3NTA4MjI0MzgsInNjb3BlIjoidXNlciIsInN1YiI6ImY0MjljZWVhLTRjMTgtNDk4MS1iMzU2LTIxNWIwNTZjNDgwNyIsInRva2VuX3R5cGUiOiJhY2Nlc3MifQ.uAdwkA_v-9B-ZMXfpJC4HX1OMwnJLfTbx2779bd4Vcw";

  const $axios = axios.create({
    baseURL: config.public.$http, // ใช้ค่า baseURL จาก runtimeConfig
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return $axios;
}
