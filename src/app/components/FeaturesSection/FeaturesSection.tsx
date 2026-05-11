"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/redux/store";
import { fetchFeatures } from "@/store/redux/slices/featuresSlice";

export default function FeaturesSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { features, loading, error } = useSelector(
    (state: RootState) => state.features
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);

  const skeletonArray = Array(4).fill(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      className="py-12 px-4 max-w-7xl mx-auto"
      style={{ fontFamily: "var(--font-jost)" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 relative text-black">
        Serving the Nation with Pride
        <span
          className="absolute left-1/2 block h-1 w-48 rounded-full -translate-x-1/2"
          style={{
            bottom: "-0.5rem",
            background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
          }}
        ></span>
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skeletonArray.map((_, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg shadow-sm animate-pulse bg-white"
            >
              <div className="mb-4 w-16 h-16 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center py-10 text-red-500">{error}</p>
      ) : features.length <= 4 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
            >
              <div
                className="mb-4 w-16 h-16"
                dangerouslySetInnerHTML={{ __html: atob(feature.data) }}
              ></div>
              <h3 className="font-semibold text-lg mb-2 text-black">{feature.title}</h3>
              <p className="text-black">{feature.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="snap-center flex-shrink-0 w-full md:w-[48%] max-w-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
            >
              <div
                className="mb-4 w-16 h-16"
                dangerouslySetInnerHTML={{ __html: atob(feature.data) }}
              ></div>
              <h3 className="font-semibold text-lg mb-2 text-black">{feature.title}</h3>
              <p className="text-black">{feature.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
