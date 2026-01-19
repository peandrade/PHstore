"use server";

import { authenticatedFetch } from "@/libs/authenticated-fetch";
import { Address } from "@/types/address";

type AddressesResponse = {
  addresses: Address[];
};

export const getUserAddresses = async (): Promise<Address[]> => {
  const result = await authenticatedFetch<AddressesResponse>("/user/addresses", {
    fallbackValue: { addresses: [] },
  });

  if (!result.success) {
    console.error("Erro ao buscar endereços:", result.error);
    return [];
  }

  if (Array.isArray(result.data.addresses)) {
    return result.data.addresses;
  }

  if (Array.isArray(result.data)) {
    return result.data as unknown as Address[];
  }

  console.error("Resposta inesperada do servidor:", result.data);
  return [];
};
