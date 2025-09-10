"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { IMAGES } from "@/app/lib/uilts";

export default function RememberSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
<section
  className="py-12 px-4 md:px-16 bg-white"
  data-aos="fade-left"
  style={{ fontFamily: 'var(--font-jost)' }}
>
  <div className="max-w-7xl mx-auto">
    <div className="text-center md:text-left mb-8">
      <p className="text-sm font-semibold text-black mb-5">
        Remembering Sardar Patel
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D62828] inline-block relative">
        THE UNIFIER OF INDIA
        <span
          className="absolute left-0 -bottom-1 block h-1 w-24 rounded-full"
          style={{
            background:
              "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
          }}
        ></span>
      </h2>
    </div>

    <div className="flex flex-col md:flex-row items-start justify-center gap-8">

      <div className="md:w-1/3 flex justify-center">
        <Image
          src={IMAGES.SardaPatel}
          alt="Sardar Patel"
          className="rounded-lg shadow-lg"
          width={400}
          height={300}
        />
      </div>

      
      <div className="md:w-1/3 bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <p className="text-[20px] text-gray-700 leading-[1.8] mb-4 font-semibold">
          Vallabhbhai Jhaverbhai Patel, commonly known as Sardar Patel, who
          served as the first Deputy Prime Minister and Home Minister of India
          from 1947 to 1950, was also known as the "unifier and the principal
          architect of modern India".
        </p>
        <p className="text-[20px] text-gray-700 leading-[1.8] font-semibold">
          The 565 self-governing princely states under direct British rule had
          been released from British suzerainty under his leadership by the
          Indian Independence Act 1947.
        </p>
      </div>

      <div className="md:w-1/3 bg-white shadow-lg rounded-lg p-6 flex flex-col">
        <p className="text-[20px] text-gray-700 leading-[1.8] mb-4 font-semibold">
          He used his skills to consolidate India, which lay in a fragmented
          and fluid state at the time of independence in 1947. With his
          commitment to national integration, Patel persuaded almost every
          princely state to accede to India, earning him the nickname "Iron
          Man of India".
        </p>
        <p className="text-[20px] text-gray-700 leading-[1.8] font-semibold">
          He is indeed the epitome of national unity and integrity.
          Participated in several movements against Britishers, Vallabhbhai
          Patel was born on October 31, 1875, in Nadiad city of Kheda
          district, Gujarat.
        </p>
      </div>

    </div>
  </div>
</section>


  );
}
