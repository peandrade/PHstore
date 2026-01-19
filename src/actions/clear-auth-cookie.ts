"use server";

import { cookies } from "next/headers";

export const clearAuthCookie = async () => {
  const cookieStore = await cookies();
  
  cookieStore.delete("token");
  cookieStore.delete("refreshToken");
};