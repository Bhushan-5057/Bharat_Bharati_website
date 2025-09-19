"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Twitter,
  Facebook,
  Mail,
} from "lucide-react";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  twitter?: string;
  facebook?: string;
  gmail?: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  const [rotations] = useState(
    testimonials.map(() => Math.floor(Math.random() * 21) - 10)
  );

  const handleNext = () => setActive((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      setLoading(false);
    }
  }, [testimonials]);

  const isActive = (index: number) => index === active;

  if (loading) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20 md:max-w-4xl lg:px-12">
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
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div className="relative w-full h-85 md:h-[28rem] lg:h-[25rem] z-20">
          <AnimatePresence>
            {testimonials.map((t, i) =>
              i === active ||
              i === (active - 1 + testimonials.length) % testimonials.length ||
              i === (active + 1) % testimonials.length ? (
                <motion.div
                  key={t.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    rotateY: rotations[i],
                    zIndex: 10,
                  }}
                  animate={{
                    opacity: isActive(i) ? 1 : 0.7,
                    scale: isActive(i) ? 1 : 0.95,
                    rotateY: isActive(i) ? 0 : rotations[i],
                    zIndex: isActive(i) ? 50 : 10,
                    y: isActive(i) ? [0, -20, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    rotateY: rotations[i],
                    zIndex: 10,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={t.src}
                    alt={t.name}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col justify-center items-center py-4 text-center space-y-6 z-30 relative">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>

            {testimonials[active].quote && (
              <motion.p className="mt-4 text-lg text-gray-500 dark:text-neutral-300">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            )}
            <div className="flex gap-4 mt-4 justify-center">
              {testimonials[active].twitter && (
                <a
                  href={testimonials[active].twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-6 w-6 text-blue-500 hover:scale-110 transition-transform" />
                </a>
              )}
              {testimonials[active].facebook && (
                <a
                  href={testimonials[active].facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-6 w-6 text-blue-700 hover:scale-110 transition-transform" />
                </a>
              )}
              {testimonials[active].gmail && (
                <a href={`mailto:${testimonials[active].gmail}`}>
                  <Mail className="h-6 w-6 text-red-500 hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
          </motion.div>

          <div className="flex gap-4 justify-center pt-6">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <ChevronLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <ChevronRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
