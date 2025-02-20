"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
const DetailPage = () => {
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const { id: id } = useParams();
  const { data: post, isLoading: isPending } = useGetPost(Number(id));
  const router = useRouter();

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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to delete the post.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/blog/post/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Post deleted successfully!");
        router.push("/");
      } else {
        toast.error("Failed to delete the post.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the post.");
    }
  };

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
              {isAuthor && (
                <div className="flex gap-4 mt-4">
                  <center>
                    <FontAwesomeIcon
                      icon={faPen}
                      size="1x"
                      className="mr-3 text-blue-500"
                      onClick={() => router.push(`/form/${id}`)}
                    />
                  </center>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        className="mr-3 text-red-600"
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Yes, Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="post-description">
            <div className=" w-full flex-1">
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
