"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SignupForm from "@/components/auth/sign-up-form";
import Loading from "@/components/common/Loading";

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            router.push("/");
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) return <Loading />;
    return (
        <>
            <SignupForm />;
        </>
    );
}
