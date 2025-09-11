"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/redux/store";
import { fetchActivityById } from "@/store/redux/slices/activitySlice";
import Image from "next/image";

export default function ActivityDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { selectedActivity, loading, error } = useSelector(
        (state: RootState) => state.activities
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchActivityById(Number(id)));
        }
    }, [dispatch, id]);
    if (loading)
        return (
            <div
                className="min-h-screen bg-white px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 flex justify-center"
                style={{ fontFamily: "var(--font-jost)" }}
            >
                <div className="w-full max-w-7xl animate-pulse space-y-6">
                    <div className="h-6 w-3/4 bg-gray-300 rounded mx-auto" />
                    <div className="h-10 w-1/2 bg-gray-300 rounded mx-auto" />
                    <div className="flex flex-col lg:flex-row gap-10 mt-6">
                        <div className="w-full lg:w-1/2 h-64 bg-gray-300 rounded-2xl" />
                        <div className="w-full lg:w-1/2 space-y-4">
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-4 bg-gray-300 rounded w-5/6" />
                            <div className="h-4 bg-gray-300 rounded w-3/4" />
                        </div>
                    </div>
                </div>
            </div>
        );

    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!selectedActivity) return <div className="p-6">No activity found.</div>;

    const descriptionLines = [
        ...new Set(
            selectedActivity.description
                .split(/\r?\n/)
                .map((line) => line.trim())
                .filter((line) => line.length > 0)
        ),
    ];

    return (
        <div
            className="relative min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 flex justify-center"
            style={{ fontFamily: "var(--font-jost)" }}
        >
            <svg
                className="absolute top-0 left-0 w-full h-full -z-10"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="#FF9933"
                    fillOpacity="0.4"
                    d="M0,96L60,90.7C120,85,240,75,360,106.7C480,139,600,213,720,213.3C840,213,960,139,1080,106.7C1200,75,1320,85,1380,90.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
                <path
                    fill="#FFFFFF"
                    fillOpacity="0.3"
                    d="M0,192L60,186.7C120,181,240,171,360,170.7C480,171,600,181,720,181.3C840,181,960,171,1080,144C1200,117,1320,75,1380,58.7L1440,43.3L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
                <path
                    fill="#138808"
                    fillOpacity="0.4"
                    d="M0,288L60,266.7C120,245,240,203,360,186.7C480,171,600,181,720,181.3C840,181,960,171,1080,149.3C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
            </svg>

            <div className="w-full max-w-7xl relative z-10">
                <h1 className="text-black text-center mt-2 text-base sm:text-lg md:text-xl font-semibold opacity-70">
                    Activity Details
                    <div className="w-26 h-1 mt-2 mb-4 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mx-auto"></div>
                </h1>

                <h1 className="text-black text-center font-bold mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    {selectedActivity.title}
                </h1>

                <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-10 mt-10">
                    <div className="w-full lg:w-1/2 flex justify-center">
                        {selectedActivity.data ? (
                            <div className="w-full max-w-[650px] rounded-2xl overflow-hidden  bg-white/0 flex justify-center items-center p-2">
                                <Image
                                    src={`data:image/png;base64,${selectedActivity.data}`}
                                    alt={selectedActivity.title}
                                    width={650}
                                    height={400}
                                    className="object-contain rounded-2xl "
                                    style={{ background: "transparent" }}
                                />
                            </div>
                        ) : (
                            <div className="text-gray-500">No image available</div>
                        )}
                    </div>

                    <div className="lg:w-1/2 w-full flex flex-col gap-5">
                        {descriptionLines.map((line, idx) => (
                            <p
                                key={idx}
                                className="text-gray-600 text-sm sm:text-base md:text-lg leading-loose max-w-[120ch] mb-4"
                            >
                                {line}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
