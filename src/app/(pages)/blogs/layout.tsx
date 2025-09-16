import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Bharat Bharati Trust",
  description: "भारत के इतिहास, संस्कृति, योग और त्योहारों पर रोचक ब्लॉग पढ़ें।",
  keywords: ["भारत", "इतिहास", "संस्कृति", "योग", "त्योहार", "परंपरा"],
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-gray-50 font-sans">{children}</div>;
}
