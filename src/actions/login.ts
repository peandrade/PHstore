"use server"

type LoginData = {
    email: string;
    password: string;
}

export const login = async ({ email, password }: LoginData): Promise<{ error: string | null, token?: string }> => {
    return { error: null, token: '123' }
}