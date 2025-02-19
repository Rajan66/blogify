"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
        console.error("Signup failed:", data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Error during signup: " + error);
    } finally {
      setIsLoading(false);
    }
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

          <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Create Account"}
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
