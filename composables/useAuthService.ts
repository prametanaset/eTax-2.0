import axios from "axios";
import type { LoginResponse } from "~/types/auth";

export const useAuthService = () => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.public.apiUrl,
    headers: {
      "x-api-key": config.public.apiKey,
    },
  });

  const login = async (credentials: any) => {
    const response = await api.post("/auth/token/login", {
      username: credentials.username,
      password: credentials.password,
    });
    return response.data;
  };

  const getAccessToken = async (token: string) => {
    // const response = await api.post("/auth/token/refresh", {
    //   token: token,
    // });
    // return response.data;
    return "iokjlsdhjfuishoikajf;ish;jsklf";
  };

  const getMe = async (token: string) => {
    const response = await api.get("user/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data;
  };

  // const logout = async (token: string | undefined) => {
  //   return await api.delete("/auth/token/revoke", {
  //     data: {
  //       token: token,
  //     },
  //   });
  // };

  return {
    login,
    getAccessToken,
    getMe,
    // logout,
  };
};
