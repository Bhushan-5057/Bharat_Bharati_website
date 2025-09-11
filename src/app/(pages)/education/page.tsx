"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/redux/store";
import { fetchEducation } from "@/store/redux/slices/educationSlice";
import { fetchSchools } from "@/store/redux/slices/schoolSlice";
import { IMAGES } from "@/app/lib/uilts";

export default function EducationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { education, loading } = useSelector(
    (state: RootState) => state.education
  );
  const { schools } = useSelector((state: RootState) => state.schools);

  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEducation());
    dispatch(fetchSchools());
  }, [dispatch]);

  const images = education?.[0]?.images || [];
  const mainImage = images.find((img: any) => img.is_main) || images[0];
  const otherImages = images.filter((img: any) => img !== mainImage);

  const getMime = (fileName: string) =>
    fileName?.endsWith(".png") ? "image/png" : "image/jpeg";

  const title = education?.[0]?.title || "";
  const [subtitle, mainTitle] = title.split("\n");

  const handleImageClick = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const handleNext = () => {
    setPhotoIndex((prev) => (prev + 1) % otherImages.length);
  };

  const handlePrev = () => {
    setPhotoIndex((prev) => (prev + otherImages.length - 1) % otherImages.length);
  };

  return (
    <div
      className="min-h-screen bg-[linear-gradient(90deg,#ffffff_0%,#f5f9ff_50%,#e6f0ff_100%)] text-gray-800"
      style={{ fontFamily: 'var(--font-jost)' }}
    >

      <header className="max-w-7xl mx-auto px-4 pt-12 pb-8" data-aos="fade-down">
        <div className="flex items-center justify-center text-gray-400 mb-4">
          <span className="tracking-widest opacity-60">:::::</span>
          <BookOpen className="mx-3 w-6 h-6 text-gray-700" aria-hidden />
          <span className="tracking-widest opacity-60">:::::</span>
        </div>

        {loading ? (
          <>
            <div className="h-5 w-40 mx-auto bg-gray-200 rounded-full animate-pulse mb-2"></div>
            <div className="h-8 w-72 mx-auto bg-gray-300 rounded-md animate-pulse"></div>
          </>
        ) : (
          <>
            <p className="text-center italic text-sm text-gray-600 mb-3">{subtitle}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight text-[#D62828]">
              {mainTitle}
            </h1>
            <div
              className="w-28 h-1 mt-4 mx-auto rounded-full"
              style={{
                background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
              }}
            ></div>
          </>
        )}
      </header>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center" data-aos="fade-right">
            {loading ? (
              <div className="w-[573px] h-[322px] bg-gray-200 rounded-lg animate-pulse"></div>
            ) : !mainImage ? (
              <div className="w-64 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            ) : (
              <>
                {!loaded && !imgError && (
                  <div className="w-[573px] h-[322px] bg-gray-200 rounded-lg animate-pulse"></div>
                )}
                {imgError ? (
                  <div className="w-[573px] h-[322px] bg-red-100 text-red-500 flex items-center justify-center rounded-lg">
                    Failed to load image
                  </div>
                ) : (
                  <img
                    src={`data:${getMime(mainImage.file_name)};base64,${mainImage.data}`}
                    alt={mainImage.file_name}
                    className={`w-[573px] h-[322px] object-contain rounded-lg shadow-md transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setLoaded(true)}
                    onError={() => setImgError(true)}
                  />
                )}
              </>
            )}
          </div>
          <div className="max-w-xl mx-auto md:mx-0 space-y-4" data-aos="fade-left">
            {loading ? (
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
            ) : (
              <p className="text-[18px] text-[#5E6FA6] leading-[1.8] text-justify">
                {education?.[0]?.description
                  ?.split("BHARAT BHARATI")
                  .map((part: string, i: number, arr: string[]) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <strong className="text-[#004080]">BHARAT BHARATI</strong>
                      )}
                    </span>
                  ))}
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="flex justify-center md:justify-start" data-aos="fade-right">
            {loading ? (
              <div className="w-[520px] h-[360px] bg-gray-200 rounded-lg animate-pulse"></div>
            ) : (
              <Image
                src={IMAGES.Ek_Bharat}
                alt="Stack of books and education"
                width={520}
                height={360}
                className="rounded-lg shadow-md object-contain"
              />
            )}
          </div>

          <div className="md:pl-0" data-aos="fade-left">
            {loading ? (
              <div className="space-y-4">
                {Array(4)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="h-4 bg-gray-200 rounded w-full animate-pulse"
                    ></div>
                  ))}
              </div>
            ) : schools && schools.length > 0 ? (
              <ul className="space-y-4 mb-6">
                {schools.map((s: { id: string | number; title: string }) => (
                  <li key={s.id} className="flex items-start">
                    <span className="text-orange-500 mr-3 mt-0">◎</span>
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

            {!loading && (
              <>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  We are committed to change not only the infrastructure of the
                  above four institutions but their academic quality, too.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  True education is not only loading students with data, facts and
                  informations, it is incomplete without the education of culture
                  and civilisation. <strong>BHARAT BHARATI</strong> ensures that the
                  children of these schools also get complete knowledge and training
                  about their rich culture and heritage.
                </p>
              </>
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
