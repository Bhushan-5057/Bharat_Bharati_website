"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/redux/store";
import { fetchAllGalleryImages } from "@/store/redux/slices/gallerySlice";
import { X, ChevronLeft, ChevronRight, GalleryHorizontal } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const GalleryImagesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, loading, error } = useSelector((state: RootState) => state.gallery);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const getMimeType = (fileName: string) => {
    if (!fileName) return "image/jpeg";
    if (fileName.endsWith(".png")) return "image/png";
    if (fileName.endsWith(".gif")) return "image/gif";
    return "image/jpeg";
  };

  useEffect(() => {
    dispatch(fetchAllGalleryImages());
  }, [dispatch]);

  const handleImageClick = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const handleNext = () => {
    setPhotoIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setPhotoIndex((prev) => (prev + images.length - 1) % images.length);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
 <div className="bg-gray-100 p-8 font-sans text-center">
  <div className="container mx-auto max-w-6xl" data-aos="fade-up">
    <div className="flex items-center justify-center text-gray-400 mb-2">
      <span className="tracking-widest opacity-60">:::::</span>
      <GalleryHorizontal className="mx-3 w-5 h-5 text-gray-600" aria-hidden />
      <span className="tracking-widest opacity-60">:::::</span>
    </div>

    <h2 className="text-4xl text-[#222222] font-bold mb-3">
      Photo Gallery
    </h2>

    <div
      className="w-28 h-1 mx-auto rounded-full mb-8"
      style={{
        background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
      }}
    ></div>

    {/* Awesome Grid */}
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8"
      data-aos="fade-right"
    >
      {images.map((item, index) => (
        <div
          key={item.id}
          className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          onClick={() => handleImageClick(index)}
        >
          <img
            src={`data:${getMimeType(item.file_name)};base64,${item.data}`}
            alt={item.file_name || `Gallery image ${index + 1}`}
            className="w-full h-64 object-cover rounded-xl"
          />
          {/* Optional overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white text-lg font-semibold">
            View
          </div>
        </div>
      ))}
    </div>
  </div>

  {isOpen && images.length > 0 && (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-full max-h-full">
        <img
          src={`data:${getMimeType(images[photoIndex].file_name)};base64,${images[photoIndex].data}`}
          alt={images[photoIndex].file_name || "Gallery Image"}
          className="w-auto h-auto max-w-full max-h-screen rounded-lg shadow-2xl"
        />

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white shadow-lg hover:bg-black/80 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white shadow-lg hover:bg-black/80 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white shadow-lg hover:bg-black/80 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default GalleryImagesPage;
