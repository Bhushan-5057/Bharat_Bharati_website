"use client";

import { fetchAllBlogsThunk } from "@/store/redux/slices/blogSlice";
import { AppDispatch, RootState } from "@/store/redux/store";
import { ChevronRight, GalleryHorizontal, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function BlogsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { blogs, loading } = useSelector((state: RootState) => state.blogs);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");


    const categories = useMemo(() => {
        const cats = blogs.map((b) => b.category || "Uncategorized");
        return ["All", ...new Set(cats)];
    }, [blogs]);


    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const matchesCategory =
                selectedCategory === "All" || blog.category === selectedCategory;
            const matchesSearch =
                blog.title.toLowerCase().includes(search.toLowerCase()) ||
                blog.category?.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [blogs, search, selectedCategory]);

    const getMimeType = (fileName: string) => {
        if (!fileName) return "image/jpeg";
        if (fileName.endsWith(".png")) return "image/png";
        if (fileName.endsWith(".gif")) return "image/gif";
        return "image/jpeg";
    };

    useEffect(() => {
        dispatch(fetchAllBlogsThunk());
    }, [dispatch]);

    return (
        <div className="bg-gray-50 p-6 sm:p-10 font-sans">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center text-gray-400 mb-2">
                        <span className="tracking-widest opacity-60">:::::</span>
                        <GalleryHorizontal
                            className="mx-3 w-5 h-5 text-gray-600"
                            aria-hidden
                        />
                        <span className="tracking-widest opacity-60">:::::</span>
                    </div>
                    <h2 className="text-xl sm:text-3xl text-[#222222] font-bold mb-3">
                        Explore Our Blogs & Insights
                    </h2>
                    <div
                        className="w-28 h-1 mx-auto rounded-full"
                        style={{
                            background:
                                "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
                        }}
                    ></div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ml-5">
                    <aside className="order-1 lg:order-2 lg:col-span-1 space-y-8 lg:sticky lg:top-24 self-start">
                        <div className="p-4 rounded-2xl">
                            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2">
                                <Search className="w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search blogs..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl shadow">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                Categories
                            </h4>
                            <ul className="space-y-2">
                                {categories.map((cat, idx) => (
                                    <li key={idx}>
                                        <button
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${selectedCategory === cat
                                                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <div
                        className=" order-2 lg:order-1 lg:col-span-3 space-y-6 overflow-y-auto pr-2"
                        style={{ maxHeight: "calc(100vh - 200px)" }}
                        data-aos="fade-up"
                    >
                        {loading ? (
                            <p className="text-center text-gray-500">Loading blogs...</p>
                        ) : filteredBlogs.length === 0 ? (
                            <p className="text-center text-gray-500">No blogs found.</p>
                        ) : (
                            <div className="grid gap-6">
                                {filteredBlogs.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col md:grid md:grid-cols-2"
                                    >

                                        <div className="relative h-52 md:h-auto order-1 md:order-2">
                                            <Image
                                                src={`data:${getMimeType(
                                                    item.file_name
                                                )};base64,${item.data}`}
                                                alt={item.title || "blog"}
                                                fill
                                                unoptimized
                                                className=" object-fit transform group-hover:scale-105 transition duration-500"
                                            />
                                        </div>


                                        <div className="p-6 flex flex-col justify-between order-2 md:order-1">
                                            <div>
                                                <span className="inline-block text-xs font-medium text-orange-600 uppercase tracking-wide mb-2">
                                                    {item?.category || "Uncategorized"}
                                                </span>

                                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                    {item.title}
                                                </h3>

                                                {item.meta_title && (
                                                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                                                        {item.meta_title}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <p className="text-sm text-gray-500">
                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleDateString("en-IN", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        router.push(`/blogs/${item?.slug}`)
                                                    }
                                                    className="flex text-sm items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow hover:from-orange-600 hover:to-orange-700 transition"
                                                >
                                                    Details
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogsPage;
