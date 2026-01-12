"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  error: string | null;
  token?: string;
  refreshToken?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
};

export const register = async ({
  name,
  email,
  password,
}: RegisterData): Promise<RegisterResponse> => {
  try {
    // 1. Primeiro faz o registro
    const registerResponse = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const registerData = await registerResponse.json();

    if (!registerResponse.ok) {
      if (registerData.error === "Email already exists" || registerData.message?.includes("email")) {
        return { error: "Este email já está cadastrado" };
      }
      if (registerData.error === "Invalid name" || registerData.message?.includes("name")) {
        return { error: "Nome deve ter pelo menos 2 caracteres" };
      }
      if (registerData.error === "Invalid password" || registerData.message?.includes("password")) {
        return { error: "Senha deve ter pelo menos 10 caracteres" };
      }
      return {
        error: registerData.error || registerData.message || "Erro ao criar conta",
      };
    }

    const loginResponse = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      return {
        error: null,
        user: registerData.user,
      };
    }

    return {
      error: null,
      token: loginData.accessToken || loginData.token,
      refreshToken: loginData.refreshToken,
      user: registerData.user,
    };
  } catch (error) {
    console.error("Erro no registro:", error);
    return {
      error: "Erro ao conectar com o servidor",
    };
  }
};