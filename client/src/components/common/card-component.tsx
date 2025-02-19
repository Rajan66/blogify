import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetCategory } from "@/hooks/categoryQueries";
import {  User } from "@/types";
import { Button } from "../ui/button";

type PostProps = {
    id: number;
    title: string;
    content: string;
    user: User;
    category: number;
    createdAt: string;
    image?: string;
};

export default function CardComponent(post: PostProps) {
    const { data: category, isLoading } = useGetCategory(post.category);

    const trimmedDescription =
        post.content.length > 180 ? post.content.slice(0, 180) + "..." : post.content;

    return (
        <Card className="w-[400px] m-5">
            <CardHeader className="p-0">
                <CardTitle className="">
                    <div className="min-h-[200px] w-full flex flex-1 items-center justify-center bg-muted/90 rounded-xl">
                        <Image
                            src={
                                post?.image ??
                                "/assets/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
                            }
                            width={600}
                            height={100}
                            className="rounded-t-xl"
                            alt="Blog image"
                        />
                    </div>
                </CardTitle>
                <div className="p-6 flex flex-col gap-2">
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>By {post.user.username}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="blog-description">
                    <div className=" w-full flex-1">
                        <p className="text-base opacity-80">{trimmedDescription}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link href={`blog/${post.id}`}>
                    <Button>Read Blog</Button>
                </Link>
                {isLoading ? (
                    <h2 className="w-10 bg-gray-500"></h2>
                ) : (
                    <h2 className="text-sm opacity-80">Topic: {category.title}</h2>
                )}
            </CardFooter>
        </Card>
    );
}
