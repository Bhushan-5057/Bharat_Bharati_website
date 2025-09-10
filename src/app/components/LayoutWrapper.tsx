"use client";

import { useEffect, useState } from "react";
import Header from "./header/Header";
import Footer from "./Footer/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const notFoundElement = document.querySelector("[data-not-found]");
    setIsNotFound(!!notFoundElement);
  }, [children]);

  if (isNotFound) {
    return <>{children}</>; 
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
