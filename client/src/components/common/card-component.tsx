import * as React from "react";
import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { User } from "@/types";
import { Button } from "../ui/button";
import ImageComponent from "./image-component";

type PostProps = {
    id: number;
    title: string;
    content: string;
    user: User;
    createdAt: string;
};

export default function CardComponent(post: PostProps) {
    const trimmedDescription =
        post.content.length > 180 ? post.content.slice(0, 180) + "..." : post.content;

    return (
        <Card className="w-[400px] m-5">
            <CardHeader className="p-0">
                <CardTitle className="">
                    <div className="min-h-[200px] w-full flex flex-1 items-center justify-center bg-muted/90 rounded-xl">
                        <ImageComponent
                            imgUrl={"/assets/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"}
                            imgWidth={600}
                            imgHeight={100}
                        />
                    </div>
                </CardTitle>
                <div className="p-6 flex flex-col gap-2">
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>Author - {post.user.username}</CardDescription>
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
            </CardFooter>
        </Card>
    );
}
