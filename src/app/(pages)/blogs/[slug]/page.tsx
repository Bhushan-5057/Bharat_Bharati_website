import { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailsBlog from "./DetailBlog";
import { getBlogBySlug, getAllBlogs } from "@/store/api/api";


interface BlogPageProps {
   params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
   const resolvedParams = await params;
   const slug = resolvedParams.slug;

   const blog = await getBlogBySlug(slug);

   if (!blog) {
      return {
         title: "Blog Not Found | Bharat Bharati Trust",
         description: "The requested blog could not be found.",
      };
   }

   return {
      title: blog.meta_title ?? blog.title,
      description: blog.meta_description ?? "",
      openGraph: {
         title: blog.meta_title ?? blog.title,
         description: blog.meta_description ?? "",
         images: blog.file_name ? [blog.file_name] : [],
      },
   };
}


export async function generateStaticParams() {
   const blogs = await getAllBlogs();
   return blogs.map((blog: { slug: string }) => ({ slug: blog.slug }));
}

export default async function Page({ params }: BlogPageProps) {
   const resolvedParams = await params;
   const slug = resolvedParams.slug;

   const blog = await getBlogBySlug(slug);
   if (!blog) return notFound();

   return <DetailsBlog blog={blog} />;
}
