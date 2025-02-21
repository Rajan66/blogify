"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { handleFormSubmit } from "@/hooks/form-submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import signImage from "@/assets/sign.jpg";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Username and password are required.");
      return;
    } else {
      await handleFormSubmit(
        event,
        { usernameProps: username, passwordProps: password },
        router
      );
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side with illustration and diagonal gradient (top-left to bottom-right) */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white via-gray-700 to-black text-white">
        <div className="max-w-md mx-auto text-center space-y-6 flex flex-col">
          <Image
            src={signImage}
            alt="Signup Illustration"
            width={300}
            height={300}
            className="mx-auto rounded-xl shadow-lg"
          />
          <h2 className="text-3xl font-extrabold">Welcome Back, Blogger!</h2>
          <p className="text-lg text-white/80">
            Share your stories, inspire the world, and connect with passionate
            readers.
          </p>
          <Link href={"/"}>
            <Button className="bg-white text-black hover:bg-gray-300 transition duration-300">
              Explore Blogs
            </Button>
          </Link>
        </div>
      </div>

      {/* Right side with login form and white background */}
      <div className="flex flex-col items-center justify-center p-8 w-full bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">
              Sign In
            </h1>
            <p className="text-gray-500 text-md mt-2">
              Ready to write the next big story? Let’s get you logged in!
            </p>
          </div>

          <form
            className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <Input
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <Input
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800"
              value={password}
              id="password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />

            <div className="text-right">
              <Link
                href="#"
                className="text-sm text-gray-700 hover:text-black transition duration-300"
              >
                Forgot password?
              </Link>
            </div>

            <Button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 transition duration-300">
              Login
            </Button>

            <p className="text-center text-sm text-gray-600">
              New here?{" "}
              <Link
                href="/signup"
                className="text-black font-semibold hover:text-gray-800 transition duration-300"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
