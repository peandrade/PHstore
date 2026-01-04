import { CartItem } from "@/types/cart-item";
import { cookies } from "next/headers";

export const getServerAuthToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get('auth_token')?.value || null;
}

export const setServerAuthToken = async (token: string) => {
    const cookieStore = await cookies();
    return cookieStore.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });
}

export const clearServerAuthToken = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
} 

export const getServerCart = async (): Promise<CartItem[]> => {
    const cookieStore = await cookies();
    const value = cookieStore.get('cart')?.value;
    if(!value) return [];
    try {
        return JSON.parse(value);
    } catch {
        return [];
    }
}

export const setServerCart = async (cart: CartItem[]) => {
    const cookieStore = await cookies();
    cookieStore.set('cart', JSON.stringify(cart), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
    });
}

export const clearServerCart = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('cart');
}