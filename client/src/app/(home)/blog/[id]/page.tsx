"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ImageComponent from "@/components/common/image-component";
import { useGetPost } from "@/hooks/postQueries";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";

const DetailPage = () => {
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const { id: id } = useParams();
  const { data: post, isLoading: isPending } = useGetPost(Number(id));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    if (post && post.user) {
      const isAuthorCheck = user.id === post.user.id;
      setIsAuthor(isAuthorCheck);
    }
  }, [post]);

  if (isPending) return <Loading />;

  return (
    <div className="flex items-center justify-center w-full flex-col">
      {isAuthor && (
        <div className="flex gap-4 mt-4">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      )}
      <Card className="w-[60%] m-5">
        <CardHeader>
          <CardTitle className="mb-5">
            <div className="min-h-[300px] w-full flex-1 flex justify-center items-center">
              <ImageComponent
                imgUrl={
                  post?.image ??
                  "/assets/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg"
                }
                imgHeight={200}
                imgWidth={900}
              />
            </div>
          </CardTitle>
          <CardTitle>{post?.title}</CardTitle>
          <CardDescription>Author - {post?.user.username}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="post-description">
            <div className=" flex-1">
              <p className="py-5 tracking-wide">{post?.content}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default DetailPage;
