"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/redux/store";
import { fetchBanners } from "@/store/redux/slices/bannerSlice";

export default function BannerSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { banners, loading, error } = useSelector(
    (state: RootState) => state.banners
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const [errorImages, setErrorImages] = useState<{ [key: number]: boolean }>({});


  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);


  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setErrorImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div id="banner-section" className="relative w-full max-h-[750px] sm:h-[400px] md:h-[600px] overflow-hidden hidden sm:block">
      {(loading || banners.length === 0) && (
        <div className="w-full h-full animate-pulse bg-slate-300 flex flex-col items-center justify-center gap-4">
          <div className="w-3/4 h-10 bg-slate-400 rounded-lg"></div>
          <div className="w-1/2 h-4 bg-slate-400 rounded"></div>
        </div>
      )}

      {banners.map((banner: any, index: number) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
            } flex items-center justify-center`}
        >
          {!loadedImages[index] && !errorImages[index] && (
            <div className="w-full h-full animate-pulse bg-slate-300 flex items-center justify-center">
              <div className="w-3/4 h-10 bg-slate-400 rounded-lg"></div>
            </div>
          )}

          {errorImages[index] && (
            <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-500">
              Failed to load image
            </div>
          )}

          {!errorImages[index] && (
            <img
              src={`data:image/png;base64,${banner.data}`}
              alt={banner.title}
              className={`w-full h-full object-cover ${loadedImages[index] ? "block" : "hidden"
                }`}
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
            />
          )}
        </div>
      ))}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-500 text-lg font-semibold">
          {error}
        </div>
      )}

      <div className="custom-shape-divider-bottom-1756811065 z-20 pointer-events-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>

  );
}
