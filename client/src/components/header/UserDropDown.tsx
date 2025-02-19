"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

const UserDropDown = () => {
    const router = useRouter();
    const [token, setToken] = useState<String>();

    const handleLogout = () => {
        if (token != "" || null) {
            localStorage.setItem("token", "");
            router.push("/login");
        }
        toast.success("Logged out successfully")
    };

    useEffect(() => {
        const foundToken = localStorage.getItem("token") || "";
        setToken(foundToken);
    }, [router]);

    if (!token)
        return (
            // TODO change the color of buttons
            <div className="flex gap-4">
                <Link href={"/login"}>
                    <Button>Login</Button>
                </Link>
                <Link href={"/signup"}>
                    <Button>Signup</Button>
                </Link>
            </div>
        );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropDown;
