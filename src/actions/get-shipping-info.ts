"use server";

import { API_URL } from "@/config/api";

type ShippingInfoResponse = {
  zipcode: string;
  cost: number;
  days: number;
};

export const getShippingInfo = async (
  zipcode: string
): Promise<ShippingInfoResponse | false> => {
  if (!zipcode || zipcode.length < 8) {
    return false;
  }

  const cleanZipcode = zipcode.replace(/\D/g, "");

  try {
    const response = await fetch(
      `${API_URL}/cart/shipping?zipcode=${cleanZipcode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Erro ao calcular frete:", response.status);
      return false;
    }

    const data = await response.json();

    return {
      zipcode: data.zipcode || cleanZipcode,
      cost: data.cost ?? 0,
      days: data.days ?? 5,
    };
  } catch (error) {
    console.error("Erro ao calcular frete:", error);
    return false;
  }
};