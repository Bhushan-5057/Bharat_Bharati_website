"use client";

import { FacebookIcon, InstagramIcon, XIcon } from "@/app/ui/SvgIcons/Icon";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SocialIcons() {
    const [showIcons, setShowIcons] = useState(false);

    useEffect(() => {
        const banner = document.getElementById("banner-section");
        if (!banner) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setShowIcons(!entry.isIntersecting);
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(banner);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`hidden lg:flex fixed left-4 top-1/3 flex-col gap-4 z-50 
        transform transition-all duration-700 ease-in-out
        ${showIcons ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
      `}
        >

            <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 
                   text-white p-3 rounded-full shadow-lg 
                   hover:scale-110 hover:shadow-pink-500/50 transition-transform duration-300"
            >
                <InstagramIcon className="w-6 h-6" />
            </Link>


            <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg 
                   hover:scale-110 hover:shadow-blue-400/60 transition-transform duration-300"
            >
                <FacebookIcon className="w-7 h-7" />
            </Link>

            <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white p-3 rounded-full shadow-lg 
                   hover:scale-110 hover:shadow-gray-600/50 transition-transform duration-300"
            >
                <XIcon className="w-6 h-6" />
            </Link>
        </div>
    );
}
