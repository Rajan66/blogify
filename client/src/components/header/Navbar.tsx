"use client";

import * as React from "react";
import Image from "next/image";

import { SearchForm } from "@/components/ui/search-form";
import logo from "@/app/favicon.ico";
import Link from "next/link";
import NavItems from "./NavItems";
import ThemeDropDown from "./ThemeDropDown";
import UserDropDown from "./UserDropDown";

export default function NavBar() {
    return (
        <div className="flex w-full justify-around items-center mx-auto">
            <Link
                href="/"
                className="flex gap-4 justify-center items-center cursor-pointer"
            >
                <Image src={logo} width={60} height={60} alt="Blogify Logo" />
                <h2 className="text-xl font-bold">Blogify</h2>
            </Link>

            <div>
                <SearchForm />
            </div>

            <div className="flex items-center space-x-4">
                <UserDropDown />
                <ThemeDropDown />
            </div>
        </div>
    );
}
