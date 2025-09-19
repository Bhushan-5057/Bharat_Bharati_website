"use client";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { IMAGES } from "@/app/lib/uilts";
import { nationalExecutiveBody } from "@/app/lib/uilts";
import { nationalCommitteeMembers } from "@/app/lib/uilts";

export default function Footer() {
  return (
    <footer style={{ fontFamily: 'var(--font-jost)' }}>
      <div
        className="w-full text-white bg-cover bg-center relative "
        style={{ backgroundImage: `url(${IMAGES.Footer})` }}
      >
        <div className="absolute inset-0 bg-black/80 z-0"></div>

        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 text-center"
          style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '20px',
            letterSpacing: '0.1em',
            margin: '20px auto',
          }}
        >

          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 inline-block border-b-2 border-[#ffc107] pb-1">
              National Executive Body
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center text-left">
              <ul className="space-y-2 break-words">
                {nationalExecutiveBody
                  .slice(0, Math.ceil(nationalExecutiveBody.length / 2))
                  .map((item) => (
                    <li key={item.id} className="mb-5 text-[20px] font-semibold break-words">
                      <span className="text-[#ffc107]">▶</span> {item.name}
                      {item.designation && (
                        <span className="text-[#ffc107]"> — {item.designation}</span>
                      )}
                    </li>
                  ))}
              </ul>

              <ul className="space-y-2 break-words">
                {nationalExecutiveBody
                  .slice(Math.ceil(nationalExecutiveBody.length / 2))
                  .map((item) => (
                    <li key={item.id} className="mb-5 text-[20px] font-semibold break-words">
                      <span className="text-[#ffc107]">▶</span> {item.name}
                      {item.designation && (
                        <span className="text-[#ffc107]"> — {item.designation}</span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>


          <div className="mb-16">
            <h3 className="text-xl md:text-4xl font-bold text-yellow-400 mb-6 inline-block border-b-2 border-[#ffc107] pb-1">
              National Committee Members
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center text-left">
              <ul className="space-y-2 break-words">
                {nationalCommitteeMembers
                  .slice(0, Math.ceil(nationalCommitteeMembers.length / 2))
                  .map((item) => (
                    <li key={item.id} className="mb-5 text-[20px] font-semibold break-words">
                      <span className="text-[#ffc107]">▶</span> {item.name}
                    </li>
                  ))}
              </ul>
              <ul className="space-y-2 break-words">
                {nationalCommitteeMembers
                  .slice(Math.ceil(nationalCommitteeMembers.length / 2))
                  .map((item) => (
                    <li key={item.id} className="mb-5 mt-4 text-[20px] font-semibold break-words">
                      <span className="text-[#ffc107]">▶</span> {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div
        className="text-center py-16 border-t border-white/20"
        style={{ background: "linear-gradient(135deg, #063a75, #032047)" }}
      >
        <img
          src={IMAGES.THK}
          alt="Thank You"
          className="w-full max-w-md mx-auto object-contain"
        />

        <h4
          className="text-lg font-extrabold tracking-widest mb-6 mt-4 opacity-80"
          style={{ color: '#34498c' }}
        >
          N a m a s t e
        </h4>

        <div className="mb-10">
          <Image
            src={IMAGES.LOGO1}
            alt="Bharat Bharati Logo"
            width={300}
            height={80}
            className="mx-auto bg-white p-2"
          />
        </div>

        <div className="mb-10">
          <Link
            href="/donation"
            className="inline-block bg-[#ffc107] text-[#032047] font-bold px-8 py-3 rounded-full text-lg shadow-md hover:bg-yellow-500 hover:scale-105 transition-transform duration-300"
          >
            Donate Now
          </Link>
        </div>

        <div className="flex gap-8 justify-center text-white">
          <Link href="https://www.facebook.com/story.php?story_fbid=570215739440242&id=100093554624944&mibextid=wwXIfr&rdid=94mYTmXOvooaQYwS" target="_blank" className="hover:text-blue-400 transition">
            <Facebook size={28} />
          </Link>
          <Link href="https://www.instagram.com/reel/DJMGl1HsIed/?igsh=MTdkYzVnZmRwbW1kcA%3D%3D" target="_blank" className="hover:text-pink-400 transition">
            <Instagram size={28} />
          </Link>
          <Link href="https://www.youtube.com/channel/UCarpJaJuz_c7pDGJFkZx_9Q" target="_blank" className="hover:text-red-500 transition">
            <Youtube size={28} />
          </Link>
          <Link href="https://x.com/bharat_bha92619" target="_blank" className="hover:text-sky-400 transition">
            <Twitter size={28} />
          </Link>
        </div>
      </div>

      <div className="bg-[#012146] py-4 text-xs lg:text-sm md:text-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 px-6">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Bharat Bharti. All Rights Reserved.{" "}
            <Link href="/" className="underline hover:text-white">
              Home
            </Link>
          </p>
          <p className="text-gray-400 text-center md:text-right">
            Designed & Developed by{" "}
            <a
              href="https://koliinfotech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white font-medium"
            >
              Koliinfotech
            </a>
          </p>
        </div>
      </div>
    </footer>

  );
}
