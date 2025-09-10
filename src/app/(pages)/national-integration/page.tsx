"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/redux/store";
import { CircleStop } from "lucide-react";
import { fetchIntegrations } from "@/store/redux/slices/eventSlice";

const Skeleton = () => (
  <div className="animate-pulse flex flex-col gap-4 w-full mt-10">
    <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
    <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
    <div className="h-80 bg-gray-300 rounded w-full"></div>
    <div className="h-6 bg-gray-300 rounded w-full"></div>
    <div className="h-6 bg-gray-300 rounded w-5/6"></div>
    <div className="h-6 bg-gray-300 rounded w-4/6"></div>
  </div>
);

const NationalIntegration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { integrations, loading, error } = useSelector(
    (state: RootState) => state.integrations
  );

  useEffect(() => {
    dispatch(fetchIntegrations());
  }, [dispatch]);

  if (loading) return <Skeleton />;

  if (error)
    return <div className="text-center text-xl text-red-500 mt-10">{error}</div>;

  if (!integrations || integrations.length === 0)
    return (
      <div className="text-center text-gray-500 mt-10">No data available</div>
    );

  const firstIntegration = integrations[0];
  const otherIntegrations = integrations.slice(1);

  return (
    <div
      className="min-h-screen bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 flex justify-center"
      style={{ fontFamily: "var(--font-jost)" }}
    >
      <div className="w-full max-w-7xl">
        <h1 className="text-black text-center mt-2 text-base sm:text-lg md:text-xl font-semibold opacity-70">
          We Respect Nation Integration
          <div className="w-26 h-1 mt-2 mb-4 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mx-auto"></div>
        </h1>

        <h1 className="text-black text-center font-bold mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {firstIntegration.title}
        </h1>

        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-10 mt-10">
          <div className="w-full lg:w-1/2 flex justify-center">
            {firstIntegration.data ? (
              <img
                src={`data:image/jpeg;base64,${firstIntegration.data}`}
                alt={firstIntegration.title}
                className="w-full max-w-[650px] rounded-2xl object-cover"
              />
            ) : (
              <div className="text-gray-500">No image available</div>
            )}
          </div>

          <div className="lg:w-1/2 w-full flex flex-col gap-5">
            {[
              ...new Set(
                firstIntegration.description
                  .split(/\r?\n/)
                  .map((line) => line.trim())
                  .filter((line) => line.length > 0)
              ),
            ].map((line, idx) => (
              <p
                key={idx}
                className="text-gray-600 text-sm sm:text-base md:text-lg leading-loose max-w-[120ch] mb-4"
              >
                {line}
              </p>
            ))}

            <div className="mt-5">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Celebrate National Integrations:
              </h3>
              <div className="flex flex-col gap-3">
                {otherIntegrations.map((integration: any) => (
                  <Link
                    key={integration.id}
                    href={`/national-integration/${integration.id}`}
                    className="flex items-center gap-3 text-orange-500 hover:text-blue-600 text-base sm:text-lg font-semibold transition duration-300"
                  >
                    <span className="p-2 rounded-full hover:bg-blue-100 transition duration-300">
                      <CircleStop
                        size={20}
                        className="hover:text-blue-600"
                      />
                    </span>
                    {integration.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalIntegration;
