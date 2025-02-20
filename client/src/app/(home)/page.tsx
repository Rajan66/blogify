"use client";
import Hero from "@/components/Hero";
import Loading from "@/components/common/Loading";
import CardComponent from "@/components/common/card-component";
import { useGetPosts } from "@/hooks/postQueries";
import { Post } from "@/types";
import { toast } from "react-toastify";

const page = () => {
  const { data: blogs, isLoading, error } = useGetPosts();

  if (isLoading) return <Loading />;
  if (error) return toast.error("Something went wrong");

  return (
    <div className="w-full">
      <Hero />
      <div className="flex items-center justify-center m-5 border-gray-200">
        <div className="grid grid-cols-3 gap-7   m-auto mt-5">
          {blogs.map((item: Post, index: number) => (
            <CardComponent key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
