import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faHandsClapping,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { User } from "@/types";
import { formatDate } from "@/lib/data-format";

import defaultImage from "@/assets/default.jpg"

type PostProps = {
  id: number;
  title: string;
  content: string;
  user: User;
  category: number;
  created_at: string;
  image?: string;
};

export default function CardComponent(post: PostProps) {
  //   const { data: category, isLoading } = useGetCategory(post.category);

  const formatPostDate = formatDate(post.created_at);
  const trimmedDescription =
    post.content.length > 180
      ? post.content.slice(0, 50) + "..."
      : post.content;

  return (
    <Link href={`blog/${post.id}`}>
      <Card className="w-[380px] m-5">
        <CardHeader className="p-0">
          <CardTitle>
            <div className="min-h-[250px] w-full flex flex-1 items-center justify-center">
              <Image
                src={post?.image ?? defaultImage}
                width={600}
                height={100}
                className="h-[200px]"
                alt="Blog image"
              />
            </div>
          </CardTitle>

          <CardDescription className="text-xs font-thin">
            <FontAwesomeIcon
              icon={faUser}
              size="1x"
              className="mr-5 text-gray-500"
            />
            {post.user.username}
          </CardDescription>

          <CardTitle className="text-base mt-5 h-10">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="mb-2">
          <div className="blog-description h-10 text-gray-500 text-sm">
            <div className=" w-full flex-1">
              <p className="opacity-80 text-sm">{trimmedDescription}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="post-details text-xs text-gray-500">
            <div className="inline">
              <FontAwesomeIcon
                icon={faCalendar}
                size="1x"
                className="mr-3 text-gray-500"
              />
              {formatPostDate}
            </div>
            <div className="inline">
              <FontAwesomeIcon
                icon={faHandsClapping}
                size="1x"
                className="ml-5 mr-1 text-gray-500"
              />
              20
            </div>
          </div>
          <div className="save-icon">
            <FontAwesomeIcon
              icon={faBookmark}
              size="1x"
              className="mr-3 text-gray-500 font-thin"
            />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
