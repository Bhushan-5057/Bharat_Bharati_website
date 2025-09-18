
import { IMAGES } from "@/app/lib/uilts";
import Image from "next/image";

export default function UnifierSection() {
  return (
   <section
  className="bg-[linear-gradient(90deg,#ffffff_0%,#f5f9ff_50%,#e6f0ff_100%)] py-12 px-4 md:px-12"
  style={{ fontFamily: 'var(--font-jost)' }}
>
  <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
    
    <div className="flex justify-center">
      <Image
        src={IMAGES.MODIJI}
        alt="Unifier of India"
        width={400}
        height={400}
        className="rounded-lg object-contain"
      />
    </div>
    <div >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-bold text-[#004080] mb-4 leading-snug">
        THE UNIFIER OF INDIA
      </h2>
      <p className="text-[18px] sm:text-[18px] md:text-[18px] text-[#5E6FA6] leading-[1.8]">
        On <span className="font-semibold">31st October, 2015</span>, while celebrating{" "}
        <span className="text-[#d63384] font-semibold">Rashtriya Ekta Divas</span> to commemorate the birth anniversary of{" "}
        <span className="font-extrabold">Sardar Vallabhbhai Patel</span>, Hon’ble{" "}
        <span className="font-extrabold">Prime Minister Shri Narendra Modi</span> stated that{" "}
        <span className="text-[#0056b3]">cultural diversity is a joy</span> that ought to be celebrated through mutual interaction and
        reciprocity between people of different States and UTs so that a{" "}
        <span className="font-semibold">common spirit of understanding</span> resonates throughout the country.
      </p>
    </div>
  </div>
</section>

  );
}

