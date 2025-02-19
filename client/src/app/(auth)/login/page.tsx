"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "@/components/auth/login-form";
import Loading from "@/components/common/Loading";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) router.push("/");
    }, []);

    if (isLoading) return <Loading />;

    return (
        <>
            <LoginForm />
        </>
    );
}
