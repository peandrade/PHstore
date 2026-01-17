"use client";

import { Banner } from "@/types/banner";
import { TIMING } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  list: Banner[];
};

export const Banners = ({ list }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = useCallback(() => {
    setCurrentImage((current) => (current + 1) % list.length);
  }, [list.length]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(nextImage, TIMING.BANNER_ROTATION_INTERVAL);
  }, [nextImage]);

  const handleBannerClick = (index: number) => {
    setCurrentImage(index);
    stopTimer();
    startTimer();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleBannerClick(index);
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopTimer();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimer();
  };

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    }
    return () => stopTimer();
  }, [isPaused, startTimer, stopTimer]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Carrossel de banners promocionais"
    >
      <div className="relative aspect-3/1">
        {list.map((banner, index) => {
          const content = (
            <Image
              src={banner.img}
              alt={banner.alt}
              width={1200}
              height={400}
              className="rounded-sm"
              priority={index === 0}
            />
          );

          return banner.link ? (
            <Link
              key={banner.img}
              href={banner.link}
              className="transition-opacity duration-500 absolute inset-0"
              style={{ opacity: currentImage === index ? 1 : 0 }}
              aria-hidden={currentImage !== index}
              tabIndex={currentImage !== index ? -1 : 0}
            >
              {content}
            </Link>
          ) : (
            <div
              key={banner.img}
              className="transition-opacity duration-500 absolute inset-0"
              style={{ opacity: currentImage === index ? 1 : 0 }}
              aria-hidden={currentImage !== index}
            >
              {content}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center gap-4" role="tablist" aria-label="Navegação do carrossel">
        {list.map((banner, index) => (
          <button
            key={banner.img}
            className="size-4 bg-blue-600 rounded-full cursor-pointer transition-opacity"
            style={{ opacity: currentImage === index ? 1 : 0.3 }}
            onClick={() => handleBannerClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="tab"
            aria-selected={currentImage === index}
            aria-label={`Ir para ${banner.alt}`}
            aria-controls={`banner-${index}`}
          />
        ))}
      </div>
    </div>
  );
};
