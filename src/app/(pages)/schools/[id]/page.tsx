"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/store/redux/store";
import { BookOpen, X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchSchoolById, fetchSchools } from "@/store/redux/slices/schoolSlice";

export default function SchoolDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { schoolDetail, schools, loading } = useSelector(
    (state: RootState) => state.schools
  );

  const params = useParams();
  const id = params?.id;

  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchSchoolById(Number(id)));
    }
    dispatch(fetchSchools());
  }, [id, dispatch]);

  const images = schoolDetail?.images || [];
  const mainImage = images.find((img: any) => img.is_main) || images[0];
  const otherImages = images.filter((img: any) => img !== mainImage);

  const getMime = (fileName: string) =>
    fileName?.endsWith(".png") ? "image/png" : "image/jpeg";

  const title = schoolDetail?.title || "";
  const match = title.match(/^(.*?)\s*\((.*)\)$/);
  const mainTitle = match ? match[1] : title;
  const subTitle = match ? match[2] : "";

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
    <div className="min-h-screen bg-white text-gray-800">

      <header className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center justify-center text-gray-400 mb-2">
          <span className="tracking-widest opacity-60">:::::</span>
          <BookOpen className="mx-3 w-5 h-5 text-gray-600" aria-hidden />
          <span className="tracking-widest opacity-60">:::::</span>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-8 w-60 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
            <div className="h-6 w-40 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl text-[#222222] font-bold text-center">
              {mainTitle}
            </h1>
            {subTitle && (
              <h2 className="text-2xl text-gray-700 font-semibold text-center mt-1">
                ({subTitle})
              </h2>
            )}
          </>
        )}

        {loading ? (
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto mt-2 animate-pulse"></div>
        ) : (
          <p className="text-center italic text-sm text-gray-600 mb-3">
            {schoolDetail?.school_address}
          </p>
        )}
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-start">
        <div className="flex justify-center">
          {loading ? (
            <div className="w-[1036px] h-[500px] bg-gray-200 rounded-lg animate-pulse"></div>
          ) : !mainImage ? (
            <div className="w-64 h-48 bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          ) : (
            <>
              {!loaded && !imgError && (
                <div className="w-[1036px] h-[500px] bg-gray-200 rounded-lg animate-pulse"></div>
              )}
              {imgError && (
                <div className="w-[1036px] h-[500px] bg-red-100 text-red-500 flex items-center justify-center">
                  Failed to load image
                </div>
              )}
              {!imgError && (
                <img
                  src={`data:${getMime(mainImage.file_name)};base64,${mainImage.data}`}
                  alt={mainImage.file_name}
                  className={`w-[1036px] max-h-[500px] object-contain rounded-lg  ${
                    loaded ? "block" : "hidden"
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
            <p className="text-sm text-gray-700 leading-relaxed text-justify mb-6">
              {schoolDetail?.description
                ?.split("BHARAT BHARATI")
                .map((part: string, i: number, arr: string[]) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <strong>BHARAT BHARATI</strong>}
                  </span>
                ))}
            </p>
          )}
          <div className="mt-6">
            {loading ? (
              <div className="space-y-2">
                {Array(4)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="h-4 w-48 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
              </div>
            ) : schools && schools.length > 0 ? (
              <ul className="space-y-3">
                {schools
                  .filter((s: any) => s.id !== Number(id))
                  .map((s: any) => (
                    <li key={s.id} className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-0">◎</span>
                      <a
                        href={`/schools/${s.id}`}
                        className="text-orange-600 hover:text-blue-700 transition-colors text-[16px] mt-0.5 font-[500]"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No schools found.</p>
            )}
          </div>
        </div>
      </section>
      {otherImages.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {otherImages.map((img: any, idx: number) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden cursor-pointer w-full h-40"
                onClick={() => handleImageClick(idx)}
              >
                <img
                  src={`data:${getMime(img.file_name)};base64,${img.data}`}
                  alt={img.file_name}
                  className="w-full h-full object-cover"
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
              alt={`Gallery image ${photoIndex + 1}`}
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
