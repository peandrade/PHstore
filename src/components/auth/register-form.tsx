"use client";

import { register } from "@/actions/register";
import { setAuthCookie } from "@/actions/set-auth-cookie";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useState,
  useTransition,
} from "react";
import { z } from "zod";

const schema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
    email: z.email({ message: "E-mail inválido" }),
    password: z.string().min(10, { message: "Senha deve ter pelo menos 10 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ErrorStructure = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

export const RegisterForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorStructure>({});
  const [isPending, startTransition] = useTransition();
  const authStore = useAuthStore((state) => state);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    setErrors((errors) => ({
      ...errors,
      [e.target.name]: undefined,
      form: undefined,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<ErrorStructure> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ErrorStructure] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    startTransition(async () => {
      const res = await register(form);
      if (res.error) {
        setErrors({ form: res.error });
      } else if (res.token) {
        await setAuthCookie(res.token);
        authStore.setToken(res.token);
        router.push("/");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 p-8 rounded-sm"
    >
      <h2 className="text-xl font-bold mb-4">Cadastro</h2>
      <div className="mb-4">
        <label className="mb-1">Nome</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-sm px-3 py-2"
          disabled={isPending}
        />
        {errors?.name && (
          <div className="text-red-500 text-sm mt-1">{errors?.name}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1">E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-sm px-3 py-2"
          disabled={isPending}
        />
        {errors?.email && (
          <div className="text-red-500 text-sm mt-1">{errors?.email}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1">Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-sm px-3 py-2"
          disabled={isPending}
        />
        {errors?.password && (
          <div className="text-red-500 text-sm mt-1">{errors?.password}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1">Confirme a senha</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-sm px-3 py-2"
          disabled={isPending}
        />
        {errors?.confirmPassword && (
          <div className="text-red-500 text-sm mt-1">
            {errors?.confirmPassword}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? "Cadastrando..." : "Cadastrar"}
      </button>
      {errors?.form && (
        <div className="text-red-500 text-sm mt-1">{errors?.form}</div>
      )}

      <div className="text-center mt-4">
        <Link href={"/login"} className="text-gray-500 text-sm">
          Já tem conta? Faça Login!
        </Link>
      </div>
    </form>
  );
};
