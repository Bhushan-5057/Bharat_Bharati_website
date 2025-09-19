import { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailsBlog from "./DetailBlog";
import { getBlogBySlug, getAllBlogs } from "@/store/api/api";

type PageProps = {
  params: Promise<{ slug: any }>;
};


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const blog = await getBlogBySlug((await params).slug);

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
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "Blogs | Bharat Bharati Trust",
      description:
        "Explore insightful blogs on Indian history, culture, yoga, and festivals.",
    };
  }
}


export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs();
    return blogs.map((blog: { slug: string }) => ({ slug: blog.slug }));
  } catch (error) {
    console.error("Failed to fetch blogs at build time:", error);
    return [];
  }
}

export default async function Page(props: PageProps) {
  const { params } = props;

  try {
    const blog = await getBlogBySlug((await params).slug);

    if (!blog) return notFound();

    return <DetailsBlog blog={blog} />;
  } catch (error) {
    console.error("Blog fetch failed:", error);
    return notFound();
  }
}


