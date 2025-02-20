import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";

const Hero = () => {
  return (
    <div
      className="w-full h-[500px] flex justify-center items-center mb-10"
      style={{
        backgroundImage: "url('/assets/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center w-full text-black gap-6 text-center px-6">
        <div className="flex flex-col justify-start items-center">
          <h1 className="text-[55px] sm:text-[60px] font-extrabold leading-tight text-gray-900 drop-shadow-lg tracking-wide">
            What’s on Your Mind Today?
          </h1>

          <h3 className="text-lg sm:text-xl font-medium text-gray-800 mt-3 max-w-3xl leading-relaxed">
            From daily musings to deep insights, express your thoughts and
            <br />
            engage with a like-minded audience.
          </h3>
        </div>

        <Link href="/form">
          <Button className="bg-black text-white text-lg font-semibold rounded-lg px-8 py-3 tracking-wide shadow-md transform transition-all duration-300 hover:scale-105 flex items-center gap-2 hover:bg-black hover:text-white">
            <NotebookPen className="w-5 h-5" /> Start Writing
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
