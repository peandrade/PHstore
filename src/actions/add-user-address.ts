"use server";

import { Address } from "@/types/address";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type AddAddressResponse = {
  success: boolean;
  error?: string;
  address?: Address;
  addresses?: Address[];
};

export const addUserAddress = async (
  token: string,
  address: Omit<Address, "id">
): Promise<AddAddressResponse> => {
  if (!token) {
    return { success: false, error: "Usuário não autenticado" };
  }

  try {
    const response = await fetch(`${API_URL}/user/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || "Erro ao adicionar endereço",
      };
    }

    return {
      success: true,
      address: data.address,
    };
  } catch (error) {
    console.error("Erro ao adicionar endereço:", error);
    return {
      success: false,
      error: "Erro ao conectar com o servidor",
    };
  }
};