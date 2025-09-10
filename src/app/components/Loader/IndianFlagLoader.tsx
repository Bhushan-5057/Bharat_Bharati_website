"use client";
import Image from "next/image";

export default function IndianFlagLoader() {
  return (
    <div className="loader-wrapper">
      <Image
        src="https://cdn.pixabay.com/photo/2023/04/06/16/29/ashoka-chakra-7904695_1280.png"
        alt="Ashoka Chakra"
        width={200}
        height={200}
        className="chakra-img"
      />
    </div>
  );
}
