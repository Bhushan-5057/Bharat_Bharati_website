"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisisbility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisisbility);
        return () => window.removeEventListener("event", toggleVisisbility);

    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <>
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-tr from-blue-500 to-purple-700 text-white shadow-lg hover:scale-110 hover:shadow-purple-500/50 transition-transform duration-300"
            >
                <ArrowUp className="w-5 h-5" />
            </button>

        </>
    );
}

export default ScrollToTop;