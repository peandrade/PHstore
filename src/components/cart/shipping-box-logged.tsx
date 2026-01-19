import { getShippingInfo } from "@/actions/get-shipping-info";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { Address } from "@/types/address";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { AddressModal } from "./address-modal";
import { addUserAddress } from "@/actions/add-user-address";
import { getUserAddresses } from "@/actions";

export const ShippingBoxLogged = () => {
  const { token, hydrated } = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const loadAddresses = async () => {
    if (token && typeof token === "string") {
      const addressList = await getUserAddresses();
      setAddresses(addressList);
    }
  };

  useEffect(() => {
    if (hydrated && token && typeof token === "string") {
      startTransition(() => {
        loadAddresses();
      });
    }
  }, [token, hydrated]);

  const handleSelectAddress = (e: ChangeEvent<HTMLSelectElement>) => {
    cartStore.clearShipping();
    const id = parseInt(e.target.value);
    if (id) {
      const address = addresses.find((addr) => addr.id === id);
      if (address) {
        cartStore.setShippingZipcode(address.zipcode);
        cartStore.setSelectedAddressId(id);
      }
    }
  };

  const updateShippingInfo = async () => {
    if (cartStore.shippingZipcode.length > 4) {
      const shippingInfo = await getShippingInfo(cartStore.shippingZipcode);
      if (shippingInfo) {
        cartStore.setShippingCost(shippingInfo.cost);
        cartStore.setShippingDays(shippingInfo.days);
      }
    }
  };

  useEffect(() => {
    if (cartStore.selectedAddressId) {
      updateShippingInfo();
    }
  }, [cartStore.selectedAddressId]);

  const handleAddAddress = async (address: Address) => {
    if (!token || typeof token !== "string") return;

    setError(null);
    const response = await addUserAddress(address);

    if (response.success) {
      await loadAddresses();
      setModalOpened(false);
    } else {
      setError(response.error || "Erro ao adicionar endereço");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <select
        value={cartStore.selectedAddressId ?? ""}
        onChange={handleSelectAddress}
        className="flex-1 px-6 py-5 bg-white border border-gray-200 rounded-sm"
      >
        <option value="">
          {addresses.length === 0
            ? "Nenhum endereço cadastrado"
            : "Selecione um endereço"}
        </option>
        {addresses.map((item) => (
          <option key={item.id} value={item.id}>
            {item.street}, {item.number} - {item.city} ({item.zipcode})
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={() => setModalOpened(true)}
        className="cursor-pointer border-0 text-blue-600 hover:text-blue-700"
      >
        Adicionar um novo endereço
      </button>

      <AddressModal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
        onAdd={handleAddAddress}
      />
    </div>
  );
};