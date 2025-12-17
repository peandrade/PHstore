"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  text: string;
};

export const ProductDescription = ({ text }: Props) => {
  const [opened, setOpened] = useState(true);

  return (
    <div className="bg-white border border-gray-200 px-7 mt-20">
      <div
        className={`flex justify-between items-center py-7 ${opened ? "border-b" : "border-0"} border-gray-200`}
      >
        <div className="text-2xl">Informações do Produto</div>
        <button
          onClick={() => setOpened(!opened)}
          aria-expanded={opened}
          aria-label={opened ? "Fechar informações do produto" : "Abrir informações do produto"}
          className="cursor-pointer size-14 border border-gray-200 flex justify-center items-center rounded-sm bg-white hover:bg-gray-50"
        >
          <Image
            src={"/assets/ui/arrow-left-s-line.png"}
            alt=""
            width={24}
            height={24}
            className={`transition-all ${opened ? "rotate-0" : "rotate-180"}`}
          />
        </button>
      </div>
      {opened && <div className="text-gray-500 my-12">{text}</div>}
    </div>
  );
};
