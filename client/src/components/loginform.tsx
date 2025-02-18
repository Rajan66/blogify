"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import signImage from "../../assets/sign.jpg"; // Adjust based on your folder structure

export default function LoginForm() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-[#B5CCBE] text-white">
        <div className="max-w-md mx-auto text-center space-y-6">
          ]
          <Image
            src={signImage}
            alt="Signup Illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h2 className="text-2xl font-medium">Welcome back</h2>
          <p className="text-sm text-white/80">
            Create an account to start sharing your amazing blog posts
          </p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex flex-col items-center justify-center p-8 w-full">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-script mb-4">Upload Your BLOG</h1>
            <h2 className="text-xl text-gray-600">Login</h2>
          </div>

          <form className="space-y-4">
            <Input id="email" placeholder="Email or Username" />
            <Input id="password" type="password" placeholder="Password" />

            <div className="text-right">
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Forgot password?
              </Link>
            </div>

            <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
              Sign in
            </Button>

            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>

            <Button variant="outline" className="w-full border-gray-300">
              <Image
                src="/placeholder.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Sign in with Google
            </Button>

            <p className="text-center text-sm text-gray-500">
              Dont have an account?{" "}
              <Link
                href="/signup"
                className="text-gray-600 hover:text-gray-800"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
