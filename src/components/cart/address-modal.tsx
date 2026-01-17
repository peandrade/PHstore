import { Address } from "@/types/address";
import { ADDRESS } from "@/config/constants";
import { Spinner } from "@/components/ui/spinner";
import {
  ChangeEvent,
  FormEvent,
  startTransition,
  useState,
  useTransition,
  useEffect,
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
    country: "Brasil",
    complement: "",
  };

  const [form, setForm] = useState<Address>(emptyAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setTransition] = useTransition();
  const [loadingCep, setLoadingCep] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animação de entrada
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleCepChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > ADDRESS.CEP_LENGTH) value = value.slice(0, ADDRESS.CEP_LENGTH);
    if (value.length > ADDRESS.CEP_HYPHEN_POSITION) {
      value = value.slice(0, ADDRESS.CEP_HYPHEN_POSITION) + "-" + value.slice(ADDRESS.CEP_HYPHEN_POSITION);
    }

    setForm({ ...form, zipcode: value });

    if (errors.zipcode) {
      setErrors({ ...errors, zipcode: "" });
    }

    // Busca automática quando CEP estiver completo
    if (value.replace(/\D/g, "").length === ADDRESS.CEP_LENGTH) {
      setLoadingCep(true);
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${value.replace(/\D/g, "")}/json/`
        );
        const data = await response.json();
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            street: data.logradouro || prev.street,
            city: data.localidade || prev.city,
            state: data.uf || prev.state,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setLoadingCep(false);
      }
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
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro ao salvar o endereço";
        setErrors({ submit: message });
      }
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const inputBaseClass =
    "w-full px-4 py-3 border rounded-lg outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50 disabled:cursor-not-allowed";

  const getInputClass = (fieldName: string, extraClass?: string) =>
    `${inputBaseClass} ${errors[fieldName] ? "border-red-300" : "border-gray-200"} ${extraClass || ""}`;

  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center z-50 p-4
        transition-all duration-300
        ${isVisible ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"}
      `}
      onClick={handleClose}
    >
      <div
        className={`
          relative bg-white rounded-2xl w-full max-w-lg shadow-2xl
          max-h-[90vh] overflow-y-auto
          transition-all duration-300 ease-out
          ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Novo Endereço</h2>
              <p className="text-sm text-gray-500">
                Preencha os dados de entrega
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={pending}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Erro geral */}
          {errors.submit && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{errors.submit}</span>
            </div>
          )}

          <div className="space-y-5">
            {/* CEP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                CEP
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="zipcode"
                  placeholder="00000-000"
                  value={form.zipcode}
                  onChange={handleCepChange}
                  disabled={pending}
                  className={`${getInputClass("zipcode")} pl-10 pr-10`}
                />
                {loadingCep && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Spinner className="text-blue-500" />
                  </div>
                )}
              </div>
              {errors.zipcode ? (
                <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>
              ) : (
                <p className="text-xs text-gray-400 mt-1">
                  Digite o CEP para preencher automaticamente
                </p>
              )}
            </div>

            {/* Endereço + Número */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Endereço
                </label>
                <input
                  type="text"
                  name="street"
                  placeholder="Rua, Avenida..."
                  value={form.street}
                  onChange={handleChange}
                  disabled={pending || loadingCep}
                  className={getInputClass(
                    "street",
                    loadingCep ? "bg-gray-50" : ""
                  )}
                />
                {errors.street && (
                  <p className="text-red-500 text-xs mt-1">{errors.street}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Número
                </label>
                <input
                  type="text"
                  name="number"
                  placeholder="123"
                  value={form.number}
                  onChange={handleChange}
                  disabled={pending}
                  className={getInputClass("number")}
                />
                {errors.number && (
                  <p className="text-red-500 text-xs mt-1">{errors.number}</p>
                )}
              </div>
            </div>

            {/* Complemento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Complemento{" "}
                <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <input
                type="text"
                name="complement"
                placeholder="Apartamento, bloco, referência..."
                value={form.complement}
                onChange={handleChange}
                disabled={pending}
                className={getInputClass("complement")}
              />
            </div>

            {/* Cidade + Estado */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Cidade
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="São Paulo"
                  value={form.city}
                  onChange={handleChange}
                  disabled={pending || loadingCep}
                  className={getInputClass(
                    "city",
                    loadingCep ? "bg-gray-50" : ""
                  )}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Estado
                </label>
                <input
                  type="text"
                  name="state"
                  placeholder="SP"
                  value={form.state}
                  onChange={handleChange}
                  disabled={pending || loadingCep}
                  className={getInputClass(
                    "state",
                    loadingCep ? "bg-gray-50" : ""
                  )}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            {/* País */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                País
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-lg">🇧🇷</span>
                </div>
                <input
                  type="text"
                  name="country"
                  placeholder="Brasil"
                  value={form.country}
                  onChange={handleChange}
                  disabled={pending}
                  className={`${getInputClass("country")} pl-10`}
                />
              </div>
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={handleClose}
              disabled={pending}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={pending}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {pending ? (
                <Spinner className="text-white" />
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Salvar Endereço
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};