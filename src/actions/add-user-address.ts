"use server";

import { authenticatedFetch } from "@/libs/authenticated-fetch";
import { Address } from "@/types/address";

type AddAddressResponse = {
  success: boolean;
  error?: string;
  address?: Address;
  addresses?: Address[];
};

type ApiAddAddressResponse = {
  address?: Address;
};

export const addUserAddress = async (
  address: Omit<Address, "id">
): Promise<AddAddressResponse> => {
  const result = await authenticatedFetch<ApiAddAddressResponse>("/user/addresses", {
    method: "POST",
    body: address,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error || "Erro ao adicionar endereço",
    };
  }

  return {
    success: true,
    address: result.data.address,
  };
};
