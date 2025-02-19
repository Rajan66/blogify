"use client";
import Hero from "@/components/Hero";
import CardComponent from "@/components/common/card-component";
import { useGetPosts } from "@/hooks/postQueries";
import { Post } from "@/types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "@/hooks/auth-functions";
const page = () => {
  // const { blogs } = useBlogContext();
  const { data: blogs, isLoading } = useGetPosts();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      router.push("/login");
    }
  }, [router]);
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
