import React, { useState, useEffect } from "react";
import Image from "next/image";

const Dokumentasi = () => {
  // Daftar gambar dari folder dokumentasi
  const images = [
    "/dokumentasi/WhatsApp Image 2025-10-29 at 12.26.17.jpeg",
    "/dokumentasi/WhatsApp Image 2025-10-29 at 12.26.18.jpeg",
    "/dokumentasi/WhatsApp Image 2025-10-29 at 12.30.22.jpeg",
    "/dokumentasi/WhatsApp Image 2025-10-29 at 12.30.23.jpeg",
    "/dokumentasi/WhatsApp Image 2025-10-29 at 12.30.24.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi untuk slide berikutnya
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fungsi untuk slide sebelumnya
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Fungsi untuk langsung ke slide tertentu
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play carousel (opsional)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Ganti slide setiap 5 detik

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-slate-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Dokumentasi TilangExpert
        </h1>

        <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Carousel Container */}
          <div className="relative h-[600px] w-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image}
                  alt={`Dokumentasi ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === currentIndex}
                />
              </div>
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300 z-10"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300 z-10"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm z-10">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 p-4 bg-gray-100">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-500 w-8"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Semua Dokumentasi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-32 w-full rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dokumentasi;

