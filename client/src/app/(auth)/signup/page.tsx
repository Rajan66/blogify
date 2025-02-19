"use client";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/sign-up-form";

export default function Page() {
    const router = useRouter();
    const token = localStorage.getItem("token");
    if (token) router.push("/");
    return (
        <>
            <SignupForm />;
        </>
    );
}
