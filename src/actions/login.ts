"use server";

import { API_URL } from "@/config/api";

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  error: string | null;
  token?: string;
  refreshToken?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
};

export const login = async ({
  email,
  password,
}: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || data.message || "Email ou senha inválidos",
      };
    }

    return {
      error: null,
      token: data.accessToken || data.token,
      refreshToken: data.refreshToken,
      user: data.user,
    };
  } catch (error) {
    console.error("Erro no login:", error);
    return {
      error: "Erro ao conectar com o servidor",
    };
  }
};