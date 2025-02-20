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
  const [token, setToken] = useState<string>();
  const [userName, setUserName] = useState<string>("");

  const handleLogout = () => {
    if (token !== "" && token !== null) {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      router.push("/login");
    }
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const foundToken = localStorage.getItem("token") || "";
    const storedUser = localStorage.getItem("user");

    setToken(foundToken);

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.username); // assuming user has a 'username' property
    }
  }, [router]);

  if (!token) {
    return (
      <div className="flex gap-4">
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
        <Link href={"/signup"}>
          <Button>Signup</Button>
        </Link>
      </div>
    );
  }

  // Extract the first letter of the username
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          {/* Use first letter of the user's name as avatar */}
          <AvatarImage>
            <span className="text-xl font-semibold">{avatarLetter}</span>
          </AvatarImage>
          <AvatarFallback>{avatarLetter}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
