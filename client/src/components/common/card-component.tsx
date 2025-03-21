import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHandsClapping,
  faPen,
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
import { formatDate } from "@/lib/date-format";

import defaultImage from "@/assets/default.jpg";

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
  const formatPostDate = formatDate(post.created_at);

   return (
    <Link href={`blog/${post.id}`}>
      <Card className="w-[380px] flex flex-col h-full">
        <CardHeader className="p-0">
          <CardTitle>
            <div className="min-h-[200px] w-full flex flex-1 items-center justify-center">
              <Image
                src={post?.image ?? defaultImage}
                width={600}
                height={100}
                className="h-[200px]"
                alt="Blog image"
              />
            </div>
          </CardTitle>

          <CardDescription className="text-xs font-thin text-gray-500">
            <FontAwesomeIcon icon={faPen} className="mr-1 text-gray-500" />
            {post.user.username}
          </CardDescription>

          <CardTitle className="text-xl tracking-tight">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="mb-2 flex-grow">
          <div className="blog-description text-gray-500 text-sm">
            <div className="w-full flex-1">
              <p className="opacity-80 text-sm truncate">{post.content}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center w-full mt-auto">
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
                className="ml-5 mr-3 text-gray-500"
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
