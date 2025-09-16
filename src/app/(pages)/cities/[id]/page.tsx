"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/store/redux/store";
import { Landmark, X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCityById } from "@/store/redux/slices/cityDetailSlice";


export default function CityDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { cityDetail, loading } = useSelector(
    (state: RootState) => state.cityDetail
  );

  const params = useParams();
  const id = params?.id;

  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchCityById(Number(id)));
    }
  }, [id, dispatch]);

  const images = cityDetail?.images || [];
  const mainImage = images.find((img: any) => img.is_main) || images[0];
  const otherImages = images.filter((img: any) => img !== mainImage);

  const getMime = (fileName: string) =>
    fileName?.endsWith(".png") ? "image/png" : "image/jpeg";

  const handleImageClick = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const handleNext = () => {
    setPhotoIndex((prev) => (prev + 1) % otherImages.length);
  };

  const handlePrev = () => {
    setPhotoIndex(
      (prev) => (prev + otherImages.length - 1) % otherImages.length
    );
  };

  return (
    <div
      className="min-h-screen bg-white text-gray-800"
      style={{ fontFamily: "var(--font-jost)" }}
    >
      <header className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="flex items-center justify-center text-gray-400 mb-3">
          <span className="tracking-widest opacity-60">:::::</span>
          <Landmark className="mx-3 w-6 h-6 text-gray-600" aria-hidden />
          <span className="tracking-widest opacity-60">:::::</span>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-8 w-60 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
          </div>
        ) : (
          <h1 className="text-4xl md:text-5xl text-[#222222] font-extrabold text-center tracking-wide">
            {cityDetail?.title}
          </h1>
        )}
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-start">
        <div className="flex justify-center">
          {loading ? (
            <div className="w-[1036px] h-[500px] bg-gray-200 rounded-xl animate-pulse"></div>
          ) : !mainImage ? (
            <div className="w-64 h-48 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
              No Image
            </div>
          ) : (
            <>
              {!loaded && !imgError && (
                <div className="w-[1036px] h-[500px] bg-gray-200 rounded-xl animate-pulse"></div>
              )}
              {imgError && (
                <div className="w-[1036px] h-[500px] bg-red-100 text-red-500 flex items-center justify-center rounded-xl">
                  Failed to load image
                </div>
              )}
              {!imgError && (
                <img
                  src={`data:${getMime(mainImage.file_name)};base64,${mainImage.data}`}
                  alt={mainImage.file_name}
                  className={`w-[1036px] max-h-[500px] object-contain rounded-xl shadow-md transition-opacity ${loaded ? "opacity-100" : "opacity-0"
                    }`}
                  onLoad={() => setLoaded(true)}
                  onError={() => setImgError(true)}
                />
              )}
            </>
          )}
        </div>

        <div>
          {loading ? (
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            </div>
          ) : (
            <p className="text-base md:text-lg text-gray-700 leading-relaxed text-justify mb-6">
              {cityDetail?.description}
            </p>
          )}
        </div>
      </section>
      {otherImages.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherImages.map((img: any, idx: number) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition transform hover:scale-[1.02]"
                onClick={() => handleImageClick(idx)}
              >
                <img
                  src={`data:${getMime(img.file_name)};base64,${img.data}`}
                  alt={img.file_name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {isOpen && otherImages.length > 0 && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-full max-h-full">
            <img
              src={`data:${getMime(otherImages[photoIndex].file_name)};base64,${otherImages[photoIndex].data}`}
              alt={otherImages[photoIndex].file_name}
              className="w-auto h-auto max-w-full max-h-screen rounded-lg shadow-lg"
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
}
