"use client";
import { useParams, useRouter } from "next/navigation";
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
import defaultImage from "@/assets/default.jpg";
import useIsAuthor from "@/hooks/custom-hook";
import AlertComponent from "@/components/common/delete-alert";

const DetailPage = () => {
  const { id: id } = useParams();
  const { data: post, isLoading: isPending } = useGetPost(Number(id));
  const router = useRouter();

  const isAuthor = useIsAuthor(post);
  if (isPending) return <Loading />;

  return (
    <div className="flex items-center justify-center w-full flex-col">
      <Card className="w-[60%] m-5">
        <CardHeader>
          <CardTitle className="mb-5">
            <div className="min-h-[300px] w-full flex-1 flex justify-center items-center">
              <ImageComponent
                imgUrl={post?.image ?? defaultImage}
                imgHeight={200}
                imgWidth={900}
              />
            </div>
          </CardTitle>
          <CardTitle>{post?.title}</CardTitle>
          <CardDescription className="flex justify-between items-center">
            <div className="author">Author - {post?.user.username}</div>
            <div className="edit-div">
              {isAuthor && <AlertComponent id={id} router={router} />}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription className="overflow-hidden py-5 tracking-wide text-justify text-base break-words">
            {post?.content}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default DetailPage;
