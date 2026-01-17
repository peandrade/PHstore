"use client";

import { TIMING } from "@/config/constants";
import { useState, useEffect, useCallback } from "react";

type PromoMessage = {
  id: number;
  icon: React.ReactNode;
  text: React.ReactNode;
  highlight?: string;
};

const promoMessages: PromoMessage[] = [
  {
    id: 1,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    text: (
      <>
        <strong>FRETE GRÁTIS</strong> para todo o Nordeste nas compras acima de R$ 199,00
      </>
    ),
    highlight: "APROVEITE!",
  },
  {
    id: 2,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    text: (
      <>
        <strong>PARCELE EM ATÉ 12X</strong> sem juros no cartão de crédito
      </>
    ),
    highlight: "SEM JUROS!",
  },
  {
    id: 3,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    text: (
      <>
        <strong>GANHE 10% OFF</strong> na primeira compra com o cupom
      </>
    ),
    highlight: "BEMVINDO10",
  },
  {
    id: 4,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    text: (
      <>
        <strong>ENTREGA EXPRESSA</strong> para todas as capitais do Brasil
      </>
    ),
    highlight: "RÁPIDO!",
  },
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const nextMessage = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % promoMessages.length);
      setIsAnimating(false);
    }, TIMING.PROMO_BANNER_ANIMATION);
  }, []);

  const goToMessage = (index: number) => {
    if (index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, TIMING.PROMO_BANNER_ANIMATION);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextMessage, TIMING.PROMO_BANNER_ROTATION);
    return () => clearInterval(interval);
  }, [isPaused, nextMessage]);

  const currentMessage = promoMessages[currentIndex];

  return (
    <div
      className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative flex items-center justify-center py-3 px-4">
        <button
          onClick={() => goToMessage((currentIndex - 1 + promoMessages.length) % promoMessages.length)}
          className="absolute left-2 md:left-4 p-1 text-white/60 hover:text-white transition-colors"
          aria-label="Mensagem anterior"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          className={`
            flex items-center justify-center gap-2 text-sm md:text-base text-center
            transition-all duration-300 ease-in-out
            ${isAnimating ? "opacity-0 transform -translate-y-2" : "opacity-100 transform translate-y-0"}
          `}
        >
          <span className="hidden sm:inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10">
            {currentMessage.icon}
          </span>
          <span className="max-w-xl">
            {currentMessage.text}
            {currentMessage.highlight && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-400 text-black animate-pulse">
                {currentMessage.highlight}
              </span>
            )}
          </span>
        </div>

        <button
          onClick={() => goToMessage((currentIndex + 1) % promoMessages.length)}
          className="absolute right-2 md:right-4 p-1 text-white/60 hover:text-white transition-colors"
          aria-label="Próxima mensagem"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {promoMessages.map((message, index) => (
          <button
            key={message.id}
            onClick={() => goToMessage(index)}
            className={`
              h-1 rounded-full transition-all duration-300
              ${index === currentIndex ? "w-4 bg-yellow-400" : "w-1.5 bg-white/40 hover:bg-white/60"}
            `}
            aria-label={`Ir para mensagem ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 bg-yellow-400/80 transition-all duration-100"
        style={{
          width: isPaused ? `${((currentIndex + 1) / promoMessages.length) * 100}%` : undefined,
          animation: isPaused ? "none" : "progress 4s linear infinite",
        }}
      />

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
