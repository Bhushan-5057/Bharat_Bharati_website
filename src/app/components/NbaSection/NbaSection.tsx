"use client";
import React, { useState, useEffect } from "react";
import { nbasectionimages } from "@/app/lib/uilts";
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import AOS from "aos";
import "aos/dist/aos.css";
const NbaSection = () => {
    const [shuffledImages, setShuffledImages] = useState<typeof nbasectionimages>(
        []
    );
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const shuffled = [...nbasectionimages].sort(() => Math.random() - 0.5);
        setShuffledImages(shuffled);
    }, []);

    const handleImageClick = (index: number) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const handleNext = () => {
        setPhotoIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);
    };

    const handlePrev = () => {
        setPhotoIndex(
            (prevIndex) => (prevIndex + shuffledImages.length - 1) % shuffledImages.length
        );
    };

      useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
        });
      }, []);

    return (
        <div className="bg-blue-100 p-8 font-sans text-center text-blue-400">
            <div className="container mx-auto max-w-6xl">
                <div className="text-2xl font-semibold text-blue-400 mb-2">NBA</div>

                <h1 className="relative text-3xl md:text-4xl font-bold text-red-500 mb-8">
                    National Board of Accreditation
                    <span
                        className="absolute left-1/2 block h-1 w-48 rounded-full -translate-x-1/2"
                        style={{
                            bottom: "-0.5rem",
                            background:
                                "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
                        }}
                    ></span>
                </h1>

                <h2 className="text-lg md:text-xl font-medium mb-8 text-blue-500">
                    A MEANINGFUL MEETING WITH DR. ANIL SAHASTRABUDHE, CHAIRMAN - NBA
                </h2>

                <div 
                    className="text-start text-lg md:text-xl leading-[1.8] space-y-4 mb-8 text-gray-600 font-semibold"
                    style={{ fontFamily: 'var(--font-jost)' }}
                   
                >
                    <p>
                        I express my sincere gratitude and humility for being honoured by Dr. Anil Sahastrabudhe
                        ji, Chairman, #NationalBoardofAccreditation (NBA) alongwith Dr. Anil Kumar Nassa,
                        Member Secretary, #NBA, who felicitated us with bouquets and shawls.
                    </p>
                    <p>
                        It was a meaningful, purposeful and enlightening meeting with Dr. Sahastrabudhe at his
                        office recently.
                    </p>
                    <p>
                        I, along with Dr. Vinay Patrale, All India President of #BharatBharti, and Dr. Jagannath
                        Soin visited his office to discuss about an ambitious plan to organise a Mega Conference
                        in Delhi on Aug 03, 2023, which will be called #BharatEkAtmtaSammelan.
                    </p>
                    <p>
                        This Conference is intended to bring all diverse linguistic communities of different
                        states and regions of #India living in #DelhiNCR together on one platform to create
                        #harmony & to symbolise #unityinthediversity.
                    </p>
                    <p>
                        Dr. Anil Sahastrabudhe, who is also the chairman of #NBTE and #NAAC assured his full
                        support for this Conference. AICTE NBA INDIAN OBSERVER POST
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" >
                    {shuffledImages.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-lg overflow-hidden cursor-pointer w-full h-64"
                            onClick={() => handleImageClick(index)}
                        >
                            <img
                                src={item.img}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>


            {isOpen && shuffledImages.length > 0 && (

                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-full max-h-full">
                        <img
                            src={shuffledImages[photoIndex].img}
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
};

export default NbaSection;
