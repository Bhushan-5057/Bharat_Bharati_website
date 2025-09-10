"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/redux/store";
import { fetchFeatures } from "@/store/redux/slices/featuresSlice";

export default function FeaturesSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { features, loading, error } = useSelector(
    (state: RootState) => state.features
  );

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);

  const skeletonArray = Array(4).fill(0);

  return (
    <section
      className="py-12 px-4 max-w-7xl mx-auto"
      style={{ fontFamily: 'var(--font-jost)' }}
    >
      <h2
        className="text-3xl md:text-4xl font-bold text-center mb-10 relative"
        style={{ fontFamily: 'var(--font-jost)' }}
      >
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
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              <div className="mb-4 w-16 h-16 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center py-10 text-red-500" style={{ fontFamily: 'var(--font-jost)' }}>
          {error}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              <div
                className="mb-4 w-16 h-16"
                dangerouslySetInnerHTML={{ __html: atob(feature.data) }}
              ></div>
              <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'var(--font-jost)' }}>
                {feature.title}
              </h3>
              <p className="text-gray-700" style={{ fontFamily: 'var(--font-jost)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>

  );
}
