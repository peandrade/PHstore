import { Address } from "@/types/address";
import {
  ChangeEvent,
  FormEvent,
  startTransition,
  useState,
  useTransition,
} from "react";
import z from "zod";

const schema = z.object({
  zipcode: z.string().min(1, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
  country: z.string().min(1, "País é obrigatório"),
  complement: z.string().optional(),
});

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (address: Address) => Promise<void>;
};

export const AddressModal = ({ open, onClose, onAdd }: Props) => {
  const emptyAddress: Address = {
    zipcode: "",
    street: "",
    number: "",
    city: "",
    state: "",
    country: "",
    complement: "",
  };
  const [form, setForm] = useState<Address>(emptyAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setTransition] = useTransition();

  if (!open) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    startTransition(async () => {
      try {
        await onAdd(form);
        setForm(emptyAddress);
      } catch (err: any) {
        setErrors({ submit: err?.message || "Erro ao salvar o endereço" });
      }
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/90 z-50">
      <button
        disabled={pending}
        className="cursor-pointer absolute top-2 right-4 text-4xl text-white border-0 bg-transparent"
        onClick={onClose}
      >
        ×
      </button>
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Adicionar Endereço</h2>
        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <input
              type="text"
              name="zipcode"
              placeholder="Digite seu CEP"
              value={form.zipcode}
              onChange={handleChange}
              disabled={pending}
              className={`w-full border px-3 py-2 rounded outline-0 ${
                errors.zipcode ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.zipcode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="street"
              placeholder="Digite seu endereço"
              value={form.street}
              onChange={handleChange}
              disabled={pending}
              className={`w-full border px-3 py-2 rounded outline-0 ${
                errors.street ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="number"
              placeholder="Digite seu numero"
              value={form.number}
              onChange={handleChange}
              disabled={pending}
              className={`w-full border px-3 py-2 rounded outline-0 ${
                errors.number ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder="Digite sua cidade"
              value={form.city}
              onChange={handleChange}
              disabled={pending}
              className={`w-full border px-3 py-2 rounded outline-0 ${
                errors.city ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="state"
              placeholder="Digite seu Estado"
              value={form.state}
              onChange={handleChange}
              disabled={pending}
              className={`w-full border px-3 py-2 rounded outline-0 ${
                errors.state ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="country"
              placeholder="Digite seu País"
              value={form.country}
              onChange={handleChange}
              disabled={pending}
              className={`w-full border px-3 py-2 rounded outline-0 ${
                errors.country ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="complement"
              placeholder="Digite o Complemento"
              value={form.complement}
              onChange={handleChange}
              disabled={pending}
              className={`w-full border px-3 py-2 rounded outline-0 ${
                errors.complement ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.complement && (
              <p className="text-red-500 text-sm mt-1">{errors.complement}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-4 rounded-sm mt-2"
            disabled={pending}
          >
            {pending ? "Salvando..." : "Adicionar"}
          </button>
        </form>
      </div>
    </div>
  );
};
