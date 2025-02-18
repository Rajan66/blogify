"use client";
import Hero from "@/components/Hero";
import CardComponent from "@/components/common/CardComponent";
import { useGetPosts } from "@/hooks/postQueries";
import { Post } from "@/types";

const page = () => {
    // const { blogs } = useBlogContext();
    const { data: blogs, isLoading } = useGetPosts();

    if (isLoading) return <p>...Loading</p>;
    return (
        <div className="w-full">
            <Hero />
            <div className="flex items-center justify-center m-5 border-t-2 border-gray-200">
                <div className="grid grid-cols-3 gap-4 m-auto mt-5">
                    {blogs.map((item: Post, index: number) => (
                        <CardComponent key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;
