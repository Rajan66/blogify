import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Hero = () => {
    //TODO add content and fix height
    return (
        <div
            className="w-full h-[500px] flex justify-center items-center mb-10"
            style={{
                backgroundImage: "url('/assets/hero.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="flex flex-col  items-center w-full text-black gap-4">
                <div className="flex flex-col justify-start items-center" >
                     {/* TODO change the texts xd */}
                    <h1 className="text-[50px]">Main catch phrase</h1>
                    <h3 className="text-xl">A place to read, write and eat</h3>
                </div>
                <Link href="/form">
                    <Button className="bg-black hover:bg-gray-900 text-white text-lg rounded-xl w-fit px-10 h-10 tracking-wider">Start writing</Button>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
