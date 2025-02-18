"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function SignupForm() {
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    setPasswordMatch(e.target.value === password);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-[#B5CCBE] text-white">
        <div className="max-w-md mx-auto text-center space-y-6">
          <Image
            src="/assets/sign.jpg"
            alt="Signup Illustration"
            width={300}
            height={300}
            className="mx-auto"
          />

          <h2 className="text-2xl font-medium">Join Our Community</h2>
          <p className="text-sm text-white/80">
            Create an account to start sharing your amazing blog posts
          </p>
        </div>
      </div>

      {/* Right side with signup form */}
      <div className="flex flex-col items-center justify-center p-8 w-full">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-script mb-4">Upload Your BLOG</h1>
            <h2 className="text-xl text-gray-600">Sign Up</h2>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input id="firstName" placeholder="First Name" required />
              <Input id="lastName" placeholder="Last Name" required />
            </div>

            <Input id="phone" type="tel" placeholder="Phone" required />
            <Input id="email" type="email" placeholder="Email" required />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
            />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handlePasswordConfirm}
              required
            />

            {!passwordMatch && (
              <p className="text-xs text-red-500">Passwords do not match</p>
            )}

            <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
              Create Account
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
              Sign up with Google
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-gray-600 hover:text-gray-800">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
