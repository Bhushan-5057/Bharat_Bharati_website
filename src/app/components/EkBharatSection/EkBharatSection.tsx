import { IMAGES } from "@/app/lib/uilts";
import Image from "next/image";

export default function EkBhartiSection() {
  return (
  <section
  className="bg-[linear-gradient(90deg,#ffffff_0%,#f5f9ff_50%,#e6f0ff_100%)] py-12 px-4 md:px-12"
  style={{ fontFamily: 'var(--font-jost)' }}
>
  <div className="max-w-7xl mx-auto">

    <div className="mb-6 text-center md:text-left">
      <h3 className="text-sm sm:text-base md:text-[1rem] font-semibold text-[#0040A0] uppercase tracking-wide mb-4">
        BHARAT BHARTI
      </h3>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-bold text-[#D62828]">
        EK BHARAT, SHRESHTHA BHARAT
      </h2>
      <div
        className="w-24 h-1 mt-2 mx-auto md:mx-0 rounded-full"
        style={{
          background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
        }}
      ></div>
    </div>

    <div className="grid md:grid-cols-[40%_60%] gap-6 items-start">

      <div className="flex justify-center md:justify-start">
        <Image
          src={IMAGES.Ek_Bharat}
          alt="Ek Bharat Shreshtha Bharat"
          width={370}
          height={247}
          className="rounded-lg shadow-md object-contain"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <p className="text-[20px] sm:text-[20px] text-[#5E6FA6] leading-[1.8]">
            The{" "}
            <span className="font-semibold text-[#004080]">Ek Bharat, Shreshtha Bharat</span>{" "}
            programme of the Government of India is making great efforts to
            strengthen the concept of{" "}
            <span className="text-red-600 font-semibold">Rashtriya Ekatmta</span>,
            which was started by{" "}
            <span className="font-bold text-[#1a1a1a]">Bharat Bharti</span> in 2005.
          </p>
          <p className="text-[20px] sm:text-[20px] text-[#5E6FA6] leading-[1.8]">
            To realize the{" "}
            <span className="font-bold text-[#1a1a1a]">‘New India One India’</span> vision of the{" "}
            <span className="font-bold text-[#1a1a1a]">Hon’ble PM Shri Narendra Modi</span>,
            a national-level mass movement is required.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-[20px] sm:text-[20px] text-[#5E6FA6] leading-[1.8]">
            <span className="font-bold text-[#1a1a1a]">Bharat Bharti</span> was started in 2005. Registered as a Trust in{" "}
            <span className="font-bold text-[#1a1a1a]">2010</span>.
          </p>
          <p className="text-[20px] sm:text-[20px] text-[#5E6FA6] leading-[1.8]">
            <span className="font-bold text-[#1a1a1a]">Hon’ble PM Shri Narendra Modi</span> blessed the Bharat Bharti program in{" "}
            <span className="font-bold text-[#1a1a1a]">2011</span> when he was the{" "}
            <span className="font-bold text-[#1a1a1a]">Chief Minister of Gujarat</span>.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}
