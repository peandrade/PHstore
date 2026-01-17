"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
};

export const ImageSlider = ({ images }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedImageIndex(index);
    }
  };

  return (
    <div className="max-w-sm mx-auto md:mx-0">
      <div className="border border-gray-300 bg-white p-14">
        <Image
          src={images[selectedImageIndex]}
          alt={`Product image ${selectedImageIndex + 1}`}
          width={380}
          height={380}
          className="max-w-full"
        />
      </div>
      <div className="mt-8 grid grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => handleThumbnailClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
            role="button"
            aria-label={`View image ${index + 1}`}
            aria-pressed={index === selectedImageIndex}
            className={`bg-white p-2 cursor-pointer border-2 ${index === selectedImageIndex ? "border-blue-500" : "border-gray-300"}`}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              width={50}
              height={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
