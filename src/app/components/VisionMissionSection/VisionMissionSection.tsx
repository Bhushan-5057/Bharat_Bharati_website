"use client";

import { useEffect } from "react";
import Image from "next/image";
import { IMAGES } from "@/app/lib/uilts";
import { Check } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function VisionMissionSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <section
      className="w-full bg-[#e42d29] py-12 px-4 md:px-12 font-jost"
     
    >
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto"  data-aos="fade-left">
        <div className="flex justify-center" data-aos="fade-right">
          <Image
            src={IMAGES.VISION}
            alt="Our Vision"
            width={600}
            height={300}
            className="rounded-lg object-contain shadow-lg"
          />
        </div>
        <div
          className="text-center md:text-center"
          style={{ fontFamily: "var(--font-jost)" }}
           data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-[#34498c] mb-6">
            OUR VISION
          </h2>
          <p className="text-white text-start font-semibold mb-4 !text-[22px] !leading-[1.8]">
            Let Indian society blossom like a beautiful garden filled with
            diverse flowers, nurturing the distinct identities of caste, sect,
            region, and language, while maintaining harmony among all.
          </p>

          <p className="text-white text-start font-semibold mb-4 !text-[22px] !leading-[1.8]">
            Through festivals, celebrations, dances, art, and traditions, let
            every citizen experience the sacred stream of our cultural heritage.
          </p>
          <p className="text-white text-start font-semibold mb-4 !text-[22px] !leading-[1.8]">
            May the rich life of this land—lofty like the Himalayas and deep
            like the ocean—serve as an inspiration to the entire world.
          </p>
        </div>
      </div>

      <div className="bg-[#054281] mt-12 py-20 px-6 md:px-16 w-full font-jost"   >
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto" data-aos="fade-down">
          <div className="text-center md:text-left max-w-xl xl:px-14" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-[#e42d29] mb-6">
              OUR MISSION
            </h2>
            <ul className="text-white text-start  --font-jost text-[20px] leading-[1.8] space-y-4">
              {[
                "Let people from various regions and communities living in the same city come together to bring alive the vision of a Mini India.",
                "Let the light of mutual harmony dispel the fog of narrow regionalism.",
                "Let every person be connected to one another.",
                "Let every person be rooted in the soil of this nation.",
                "Let a deep devotion to India awaken in every heart.",
              ].map((text, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="inline-flex w-5 h-5 bg-[#27b737] rounded-full items-center justify-center flex-shrink-0 mt-3">
                    <Check className="w-3 h-3 text-[#16571e]" strokeWidth={2} />
                  </span>
                  <span className="inline">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center" data-aos="fade-left">
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
