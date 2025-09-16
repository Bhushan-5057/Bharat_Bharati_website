"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Tag, User2, Folder, GalleryHorizontal } from "lucide-react";

type DetailBlogProps = {
    blog?: any;
};

function DetailsBlog({ blog }: DetailBlogProps) {
    if (!blog) return <p className="text-center py-20">No blog found.</p>;

    const getMimeType = (fileName: string) => {
        if (!fileName) return "image/jpeg";
        if (fileName.endsWith(".png")) return "image/png";
        if (fileName.endsWith(".gif")) return "image/gif";
        return "image/jpeg";
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("hi-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-10 font-sans">

            <div className="flex items-center justify-center text-gray-400 mb-2">
                <span className="tracking-widest opacity-60">:::::</span>
                <GalleryHorizontal
                    className="mx-3 w-5 h-5 text-gray-600"
                    aria-hidden
                />
                <span className="tracking-widest opacity-60">:::::</span>
            </div>
            <motion.h1
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900 leading-snug mb-6"
            >
                {blog?.title}
            </motion.h1>

            <div
                className="w-28 h-1 mx-auto rounded-full mb-10"
                style={{
                    background: "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
                }}
            ></div>


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 mb-10"
            >
                <span className="flex items-center gap-1">
                    <Folder className="w-4 h-4 text-indigo-500" />
                    {blog?.category}
                </span>
                <span className="flex items-center gap-1">
                    <User2 className="w-4 h-4 text-indigo-500" />
                    {blog?.creator?.name || "Admin"}
                </span>
                <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    {formatDate(blog?.createdAt)}
                </span>
            </motion.div>


            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative w-full max-w-5xl mx-auto h-72 sm:h-[450px] rounded-2xl overflow-hidden shadow-lg mb-10"
            >
                <Image
                    src={`data:${getMimeType(blog.file_name)};base64,${blog.data}`}
                    alt={blog?.title}
                    fill
                    unoptimized
                    className="object-fit"
                />
            </motion.div>

            <motion.article
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-md leading-relaxed text-gray-800 text-lg space-y-6"
            >

                <p className="text-xl text-gray-900 font-medium border-l-4 border-indigo-500 pl-4 italic">
                    {blog?.meta_description}
                </p>


                <div className="prose prose-lg max-w-none prose-indigo">
                    {blog?.content?.split("\n").map((para: string, idx: number) => (
                        <p key={idx} className="leading-relaxed text-gray-700">
                            {para}
                        </p>
                    ))}
                </div>

                {blog?.creator?.name && (
                    <div className=" bottom-4 right-6 text-sm text-gray-600 italic flex flex-col items-end justify-end gap-2">
                        <p>Author</p>
                        <span>{blog.creator.name}</span>
                    </div>
                )}
            </motion.article>

            {blog?.tags && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-4xl mx-auto mt-8 flex flex-wrap gap-2"
                >
                    {blog.tags.split(",").map((tag: string, idx: number) => (
                        <span
                            key={idx}
                            className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200"
                        >
                            <Tag className="w-3 h-3" /> {tag.trim()}
                        </span>
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export default DetailsBlog;
