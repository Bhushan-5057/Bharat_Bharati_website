"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/app/lib/uilts";
import { AppDispatch, RootState } from "@/store/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCertificateById,
  fetchCertificates,
} from "@/store/redux/slices/certificateSlice ";
import { getCertificateById } from "@/store/api/api";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { data: certificates } = useSelector(
    (state: RootState) => state.certificate
  );

  useEffect(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

  const handleOpenPublication = async (id: number) => {
    if (!id) return;


    const { pdfData, fileName } = await getCertificateById(id);

    const blob = new Blob([pdfData], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.title = fileName;
      newWindow.document.write(`
      <head><title>${fileName}</title></head>
      <body style="margin:0">
        <iframe src="${url}" width="100%" height="100%" style="border:none;"></iframe>
      </body>
    `);
    }
  };


  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Publications",
      dropdown: certificates.map((cert) => ({
        name: cert.file_name,
        id: cert.id,
      })),
    },
    { name: "National Integration", href: "/national-integration" },
    { name: "Education", href: "/education" },
    {
      name: "Activities",
      dropdown: [
        { name: "Women Empowerments", href: "/activities/women-empowerments" },
        { name: "Other Cultures", href: "/activities/other-cultures" },
      ],
    },
    {
      name: "Cities",
      dropdown: [
        { name: "Delhi", href: "/cities/delhi" },
        { name: "Maharashtra", href: "/cities/maharashtra" },
        { name: "Gujarat", href: "/cities/gujarat" },
        { name: "Rajasthan", href: "/cities/rajasthan" },
        { name: "Uttar Pradesh", href: "/cities/uttar-pradesh" },
        { name: "Tamil Nadu", href: "/cities/tamil-nadu" },
        { name: "Karnataka", href: "/cities/karnataka" },
        { name: "Punjab", href: "/cities/punjab" },
      ],
    },
    { name: "Blogs", href: "/blogs" },
    {
      name: "Gallery",
      dropdown: [
        { name: "Images", href: "/gallery/images" },
        { name: "Videos", href: "/gallery/videos" },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  return (
   <header
  className="w-full sticky top-0 bg-white shadow-sm z-50"
  style={{ fontFamily: 'var(--font-jost)' }}
>
  <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-[auto_1fr_auto] items-center px-4 py-3 gap-4 md:gap-6">
    <div className="flex items-center">
      <Image
        src={IMAGES.LOGO}
        alt="Bharat Bharati Logo"
        width={200}
        height={70}
        className="cursor-pointer h-auto w-[180px] md:w-[220px] lg:w-[250px]"
        priority
      />
    </div>

    <nav className="hidden md:flex items-center justify-end gap-6 lg:gap-6 text-[15px] font-semibold text-gray-900 pl-4">
      {navItems.map((item, idx) =>
        item.dropdown ? (
          <div key={idx} className="relative group py-2">
            <button className="hover:text-red-600 flex items-center gap-1 transition-colors text-black">
              {item.name}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-2 
                  max-h-60 min-w-[180px] w-max overflow-y-auto overflow-x-hidden dropdown-scroll"
            >
              <ul className="flex flex-col text-sm font-normal">
                {item.dropdown.map((drop: any, i: number) => (
                  <li key={i}>
                    <button
                      onClick={() => handleOpenPublication(drop.id)}
                      className="flex items-center px-6 py-2 hover:bg-[#e7470c]/80 hover:text-white transition-colors w-full text-left"
                    >
                      {drop.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <Link
            key={idx}
            href={item.href}
            className="hover:text-red-600 transition-colors"
          >
            {item.name}
          </Link>
        )
      )}
    </nav>

    <div className="justify-self-end md:hidden">
      {!menuOpen && (
        <button
          className="p-2 rounded-md focus:outline-none"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </div>
  </div>

  <div
    className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 ${
      menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
    }`}
    onClick={() => setMenuOpen(false)}
  />

  <div
    className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
      menuOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/">
        <Image
          src={IMAGES.LOGO}
          alt="Bharat Bharati Logo"
          width={160}
          height={55}
        />
      </Link>
      <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <nav className="flex flex-col px-6 py-4 text-sm font-medium h-full overflow-y-auto">
      {navItems.map((item, idx) => (
        <div key={idx} className="border-b py-2">
          {item.dropdown ? (
            <div>
              <button
                onClick={() => toggleDropdown(item.name)}
                className="w-full flex justify-between items-center hover:text-red-600"
              >
                {item.name}
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    openDropdown === item.name ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openDropdown === item.name && (
                <ul className="pl-4 mt-2 space-y-1 text-sm font-normal">
                  {item.dropdown.map((drop: any, i: number) => (
                    <li key={i}>
                      <button
                        onClick={() => {
                          handleOpenPublication(drop.id);
                          setMenuOpen(false);
                        }}
                        className="block py-1 w-full text-left hover:text-red-600"
                      >
                        {drop.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link
              href={item.href}
              className="block hover:text-red-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  </div>
</header>

  );
}
