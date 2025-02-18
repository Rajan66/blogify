import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div
      className="w-full h-[200px] flex justify-center items-center mb-10"
      style={{
        backgroundImage:
          "url('/assets/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link href="/form">
        <Button>Add Blog</Button>
      </Link>
    </div>
  );
};

export default Hero;
