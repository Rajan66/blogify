"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import signup from "@/assets/sign.jpg";

export default function SignupForm() {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = formData.password;
    setPasswordMatch(e.target.value === password);
    setFormData({ ...formData, confirmPassword: e.target.value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear errors when the user starts typing
    if (errors[id]) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }

    // Real-time validation for password strength and email format
    if (id === "password") {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (value && !passwordRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            "Password must be at least 8 characters long and include a number and special character",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
      }
    }

    if (id === "email") {
      const emailRegex = /\S+@\S+\.\S+/;
      if (value && !emailRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!passwordMatch) newErrors.passwordMatch = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Stop submission if errors exist

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await fetch("http://localhost:8000/api/blog/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        router.push("/login"); // Redirect to login page after successful signup
      } else {
        // Handle backend validation errors
        if (data.username) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: data.username[0],
          }));
        }
        if (data.email) {
          setErrors((prevErrors) => ({ ...prevErrors, email: data.email[0] }));
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Error during signup: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white via-gray-700 to-black text-white">
        <div className="max-w-md mx-auto text-center space-y-6 flex flex-col">
          <Image
            src={signup}
            alt="Signup Illustration"
            width={300}
            height={300}
            className="mx-auto rounded-xl shadow-lg"
          />
          <h2 className="text-3xl font-extrabold">Become a Content Creator</h2>
          <p className="text-lg text-white/80">
            Share your ideas, inspire others, and grow your community with us.
          </p>
          <Link href={"/"}>
            <Button className="bg-white text-black hover:bg-gray-300 transition duration-300">
              Start Exploring Blogs
            </Button>
          </Link>
        </div>
      </div>

      {/* Right side with signup form */}
      <div className="flex flex-col items-center justify-center p-8 w-full bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">
              Sign Up
            </h1>
            <p className="text-gray-500 text-md mt-2">
              Ready to create your blog? Let’s get started!
            </p>
          </div>

          <form
            className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName}</p>
              )}
              <Input
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>

            <Input
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username}</p>
            )}

            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}

            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handlePasswordConfirm}
              required
            />

            {!passwordMatch && (
              <p className="text-xs text-red-500">Passwords do not match</p>
            )}
            {errors.passwordMatch && (
              <p className="text-xs text-red-500">{errors.passwordMatch}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-black font-semibold hover:text-gray-800 transition duration-300"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
