"use client";
 
import { useEffect } from "react";
import Image from "next/image";
import { IMAGES } from "@/app/lib/uilts";
import { Check } from "lucide-react";
 
export default function VisionMissionSection() {
  return (
 
 
    <section className="w-full bg-gradient-to-r from-[#fdfdfd] via-[#f9fafb] to-[#eef2f7] py-16 px-6 md:px-12 font-jost">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
        <div className="flex justify-center">
          <Image
            src={IMAGES.VISION}
            alt="Our Vision"
            width={600}
            height={300}
            className="rounded-lg object-contain shadow-lg"
          />
        </div>
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#e42d29] mb-6">
            OUR VISION
          </h2>
          <p className="text-[#444] text-lg leading-relaxed mb-4">
            Let Indian society blossom like a beautiful garden filled with
            diverse flowers, nurturing the distinct identities of caste, sect,
            region, and language, while maintaining harmony among all.
          </p>
          <p className="text-[#444] text-lg leading-relaxed mb-4">
            Through festivals, celebrations, dances, art, and traditions, let
            every citizen experience the sacred stream of our cultural heritage.
          </p>
          <p className="text-[#444] text-lg leading-relaxed">
            May the rich life of this land—lofty like the Himalayas and deep
            like the ocean— serve as an inspiration to the entire world.
          </p>
        </div>
      </div>
 
      {/* MISSION */}
      <div className="bg-gradient-to-r from-[#eef2f7] via-[#e6ecf5] to-[#fdfdfd] mt-16 py-16 px-8 md:px-16 w-full rounded-2xl shadow-inner">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          <div className="text-left max-w-xl xl:px-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#e26a2c] mb-6">
              OUR MISSION
            </h2>
            <ul className="text-[#333] text-lg leading-relaxed space-y-5">
              {[
                "Let people from various regions and communities living in the same city come together to bring alive the vision of a Mini India.",
                "Let the light of mutual harmony dispel the fog of narrow regionalism.",
                "Let every person be connected to one another.",
                "Let every person be rooted in the soil of this nation.",
                "Let a deep devotion to India awaken in every heart.",
              ].map((text, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="inline-flex w-6 h-6 bg-[#2b9348] rounded-full items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 text-white" strokeWidth={2} />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src={IMAGES.MISSION}
              alt="Our Mission"
              width={700}
              height={400}
              className="rounded-lg object-contain shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
 
 