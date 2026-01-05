import { getShippingInfo } from "@/actions/get-shipping-info";
import { getUserAddresses } from "@/actions/get-user-addresses.user";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { Address } from "@/types/address";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { AddressModal } from "./address-modal";
import { addUserAddress } from "@/actions/add-user-address";

export const ShippingBoxLogged = () => {
  const { token, hydrated } = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (hydrated && token) {
      startTransition(() => {
        getUserAddresses(token).then(setAddresses);
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
    if(!token) return;
    const newAddresses = await addUserAddress(token, address);
    setAddresses(newAddresses);
    setModalOpened(false);
  }

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
      <button
        onClick={() => setModalOpened(true)}
        className="cursor-pointer border-0"
      >
        Adicionar um novo endereço
      </button>
      <AddressModal open={modalOpened} onClose={() => setModalOpened(false)} onAdd={handleAddAddress} />
    </div>
  );
};
