"use server"

import { data } from "@/data"

export const getProductsFromList = async (ids: (string | number)[]) => {
    return data.products;
}