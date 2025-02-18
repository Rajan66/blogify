"use client";
import * as React from "react";
import { useParams } from "next/navigation";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import ImageComponent from "@/components/common/ImageComponent";
import { useGetPost } from "@/hooks/postQueries";

const DetailPage = () => {
    const { id: id } = useParams();
    console.log(id)
    const { data: post, isLoading } = useGetPost(Number(id));

    if (isLoading) return <p>....Loading</p>;
    return (
        <div className="flex items-center justify-center w-full flex-col">
            <Card className="w-[60%] m-5">
                <CardHeader>
                    <CardTitle className="mb-5">
                        <div className="min-h-[300px] w-full flex-1 flex justify-center items-center">
                            <ImageComponent
                                imgUrl={
                                    "/assets/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
                                }
                                imgHeight={200}
                                imgWidth={900}
                            />
                        </div>
                    </CardTitle>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>Author - {post.user.username}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="post-description">
                        <div className=" w-full flex-1">
                            <p className="py-5 tracking-wide">{post.content}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
            </Card>
        </div>
    );
};

export default DetailPage;
