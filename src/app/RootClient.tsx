"use client";
import { useEffect, useState } from "react";
import IndianFlagLoader from "./components/Loader/IndianFlagLoader";

export default function RootClient({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <IndianFlagLoader />;

  return <>{children}</>;
}
