"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { propInterface } from "../../../interface";
import { useBlogContext } from "@/context/use-context";
import { useParams } from "next/navigation";
import ImageComponent from "@/components/common/ImageComponent";
const DetailPage = (props: propInterface) => {
  const { id } = useParams();
  const { blogs } = useBlogContext();
  const blog = blogs.find((post) => post.id === id);

  if (!blog) return <p>Blog not found</p>;
  return (
    <div className="flex items-center justify-center w-full flex-col">
      <Card className="w-[60%] m-5">
        <CardHeader>
          <CardTitle className="mb-5">
            <div className="min-h-[300px] w-full flex-1 flex justify-center items-center">
              <ImageComponent
                imgUrl={blog.imgUrl}
                imgHeight={200}
                imgWidth={900}
              />
            </div>
          </CardTitle>
          <CardTitle>{blog.title}</CardTitle>
          <CardDescription>Author - {blog.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="blog-description">
            <div className=" w-full flex-1">
              <p className="py-5 tracking-wide">{blog.description}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default DetailPage;
