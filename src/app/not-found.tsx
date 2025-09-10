import Image from "next/image";
import { IMAGES } from "./lib/uilts";

export default function NotFound() {
  return (
    <div
      data-not-found
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6"
    >
      {/* Logo on top */}
      <Image
        src={IMAGES.LOGO1}
        alt="Bharat Bharati Logo"
        width={220}
        height={220}
        className="mb-4"
        priority
      />

      <div
        className="w-28 h-1 mb-6 rounded-full"
        style={{
          background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
        }}
      ></div>

      <h1 className="text-5xl md:text-4xl font-extrabold text-[#b22222] mb-4">
        This Page Does Not Exist
      </h1>
      <p className="text-base md:text-lg text-gray-700 mb-8 max-w-xl leading-relaxed">
        The page you are trying to reach is not available or may have been
        moved. Please check the URL or return to the official{" "}
        <span className="font-semibold">Bharat Bharati Trust</span> homepage.
      </p>

      {/* Action button */}
      <a
        href="/"
        className="px-8 py-3 bg-[#b22222] text-white font-semibold rounded-lg shadow-md hover:bg-[#8b1a1a] transition"
      >
        Back to Home
      </a>
    </div>
  );
}
