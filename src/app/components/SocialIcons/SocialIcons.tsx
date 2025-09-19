"use client";

import { FacebookIcon, InstagramIcon, XIcon } from "@/app/ui/SvgIcons/Icon";
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
            className={`fixed left-2 sm:left-4 top-1/3 flex flex-col gap-3 sm:gap-4 z-50 
        transform transition-all duration-700 ease-in-out
        ${showIcons ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
      `}
        >

            <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 
                   text-white p-2 sm:p-3 rounded-full shadow-lg 
                   hover:scale-110 hover:shadow-pink-500/50 transition-transform duration-300"
            >
                <InstagramIcon className="w-4 h-4 sm:w-6 sm:h-6" />
            </a>

            <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg 
                   hover:scale-110 hover:shadow-blue-400/60 transition-transform duration-300"
            >
                <FacebookIcon className="w-4 h-4 sm:w-7 sm:h-7" />
            </a>

            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white p-2 sm:p-3 rounded-full shadow-lg 
                   hover:scale-110 hover:shadow-gray-600/50 transition-transform duration-300"
            >
                <XIcon className="w-4 h-4 sm:w-6 sm:h-6" />
            </a>
        </div>
    );
}
