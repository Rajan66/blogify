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
import Image from "next/image";
import { propInterface } from "../interface/interface";
import Link from "next/link";
import { Button } from "./ui/button";
import ImageComponent from "./image-component";

export function CardComponent(props: propInterface) {
  const [data, setdata] = React.useState<propInterface>(props);
  const trimmedDescription =
    data.description.length > 180
      ? data.description.slice(0, 180) + "..."
      : data.description;

  return (
    <Card className="w-[400px] m-5">
      <CardHeader>
        <CardTitle className="mb-5">
          <div className="min-h-[200px] w-full flex flex-1 items-center justify-center bg-muted/90">
            <ImageComponent
              imgUrl={data.imgUrl}
              imgWidth={600}
              imgHeight={100}
            />
          </div>
        </CardTitle>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>Author - {data.author}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="blog-description">
          <div className=" w-full flex-1">
            <p className="text-xs">{trimmedDescription}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/blog/${props.id}`}>
          <Button>Read Blog</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
