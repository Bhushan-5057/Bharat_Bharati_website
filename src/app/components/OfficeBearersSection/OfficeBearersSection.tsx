"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/redux/store";
import { fetchTestimonials } from "@/store/redux/slices/testimonialSlice";
import { AnimatedTestimonials, Testimonial } from "./AnimatedTestimonials";

export default function OfficeBearersSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { testimonials, loading, error } = useSelector(
    (state: RootState) => state.testimonials
  );

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);
  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }
  if (loading) {
    return (
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6 relative inline-block">
          Office Bearers
          <span
            className="absolute left-1/2 top-full mt-2 block h-1 w-24 rounded-full -translate-x-1/2"
            style={{
              background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
            }}
          ></span>
        </h2>
        <div className="mx-auto max-w-sm px-4 py-10 md:max-w-4xl lg:px-12">
          <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
            <div className="h-80 w-full rounded-3xl bg-gray-200 animate-pulse" />
            <div className="flex flex-col justify-center items-center text-center space-y-6">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-4 pt-6">
                <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (!testimonials.length) return null;
  const mappedTestimonials: Testimonial[] = testimonials.map((t) => ({
    name: t.title,
    designation: t.designation,
    quote: t.quotes || "No quote available",
    src: `data:image/jpeg;base64,${t.data}`,
    twitter: t.twitter,
    facebook: t.facebook,
    gmail: t.gmail,
  }));

  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-bold mb-6 relative inline-block">
        Office Bearers
        <span
          className="absolute left-1/2 top-full mt-2 block h-1 w-24 rounded-full -translate-x-1/2"
          style={{
            background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
          }}
        ></span>
      </h2>
      <AnimatedTestimonials testimonials={mappedTestimonials} autoplay={true} />
    </section>
  );
}
