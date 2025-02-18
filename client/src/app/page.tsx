"use client";
import { useBlogContext } from "@/context/use-context";

import Hero from "@/components/Hero";
import CardComponent from "@/components/common/CardComponent";

const page = () => {
    const { blogs } = useBlogContext();
    return (
        <div className="w-full">
            <Hero />
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
