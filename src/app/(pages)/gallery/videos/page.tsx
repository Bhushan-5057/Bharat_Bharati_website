"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVideos } from "@/store/redux/slices/videoSlice";
import { RootState, AppDispatch } from "@/store/redux/store";
import { Videotape } from "lucide-react";

const VideosPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { videos, loading } = useSelector((state: RootState) => state.videos);

    useEffect(() => {
        dispatch(fetchAllVideos());
    }, [dispatch]);

    const getYouTubeThumbnail = (url: string) => {
        const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
        if (!match) return "";
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    };

    const renderSkeletons = () => {
        return Array.from({ length: 8 }).map((_, index) => (
            <div
                key={index}
                className="bg-white rounded-lg shadow overflow-hidden animate-pulse"
            >
                <div className="relative w-full h-48 bg-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                    </div>
                </div>
                <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>
        ));
    };

    return (
        <div className="relative min-h-screen p-8">
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


            <div className="absolute inset-0 bg-white/70 -z-5"></div>


            <div className="max-w-6xl mx-auto text-center mb-8">
                <div className="flex items-center justify-center text-gray-800 mb-2">
                    <span className="tracking-widest opacity-60">:::::</span>
                    <Videotape className="mx-3 w-5 h-5 text-gray-800" aria-hidden />
                    <span className="tracking-widest opacity-60">:::::</span>
                </div>
                <h2 className="text-4xl text-[#222222] font-bold mb-3">Video Gallery</h2>
                <div
                    className="w-28 h-1 mx-auto rounded-full mb-8"
                    style={{
                        background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
                    }}
                ></div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {loading
                    ? renderSkeletons()
                    : videos.map((video) => {
                        const videoIdMatch = video.youtube_url.match(
                            /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/
                        );
                        const videoId = videoIdMatch ? videoIdMatch[1] : null;

                        return (
                            <div
                                key={video.id}
                                className="bg-white rounded-lg shadow overflow-hidden group"
                            >
                                {videoId ? (
                                    <div className="relative w-full h-48">
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={video.description}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-48 bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-500">Video not available</span>
                                    </div>
                                )}
                                <div className="p-4">
                                    <p className="text-gray-800 font-medium">{video.description}</p>
                                    <p className="text-gray-500 text-sm mt-1">By {video.creator.name}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>

        </div>
    );
};

export default VideosPage;
