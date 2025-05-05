"use client";
import { useState } from "react";
import Image from "next/image";

const images = [
  { src: "/ipl1.png", alt: "IPL Image 1" },
  { src: "/ipl2.png", alt: "IPL Image 2" },
  { src: "/ipl3.png", alt: "IPL Image 3" },
  { src: "/ipl4.png", alt: "IPL Image 4" },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative  max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Latest IPL Images</h2>
      <div className="relative overflow-hidden rounded-lg">
        <div className="w-full relative">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            width={800}
            height={1000}
            objectFit="contain"
            className="rounded-lg"
          />
        </div>

        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          &#8594;
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
