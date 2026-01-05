"use server"

import { data } from "@/data"
import { Address } from "@/types/address"

export const addUserAddress = async (token: string, address: Address) => {
    const newId = data.addresses.length > 0
        ? Math.max(...data.addresses.map(a => a.id || 0)) + 1
        : 1;

    const newAddress = { ...address, id: newId };
    data.addresses.push(newAddress);

    return data.addresses;
}