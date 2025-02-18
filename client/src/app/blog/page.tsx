"use client";
import { CardComponent } from "@/components/card-component";
import HeroSection from "@/components/hero-section";
import { useBlogContext } from "@/context/use-context";

import React from "react";

const page = () => {
  const { blogs } = useBlogContext();
  return (
    <div className="w-full">
      <HeroSection />
      <div className="flex items-center justify-center m-5 border-t-2 border-gray-200">
        <div className="grid grid-cols-3 gap-4 m-auto mt-5">
          {blogs.map((item, index) => (
            <CardComponent key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
