"use client"
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  const router = useRouter()
  const token = localStorage.getItem("token")
  if(token) router.push('/')
  
  return (
    <>
      <LoginForm />
    </>
  );
}
