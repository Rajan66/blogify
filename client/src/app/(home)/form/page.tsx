"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetCategories } from "@/hooks/categoryQueries";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/Loading";

export default function page() {
    const { data: categories, isLoading: isPending } = useGetCategories();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        image: null as File | null,
        content: "",
        imgUrl: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please log in to create a blog post.");
          router.push("/login");
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) return <Loading />;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, image: null }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please log in to create a blog post.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("content", formData.content);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            const response = await fetch("http://localhost:8000/api/blog/post/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                alert("Blog created successfully!");
            } else if(response.status === 401){
                localStorage.setItem("token","") 
                router.push('/login')
                toast.error("Unauthorized access. Please log in.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="flex justify-center mt-10">
                <Card className="w-full max-w-2xl bg-card shadow-lg rounded-lg p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
                        Create a New Blog
                    </h1>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2 text-muted-foreground font-medium">
                                Title*:
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
                                required
                                placeholder="Enter blog title..."
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-muted-foreground font-medium">
                                Category*:
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
                                required
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                {isPending ? (
                                    <option disabled>Loading categories...</option>
                                ) : (
                                    categories?.map(
                                        (category: { id: number; title: string }) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        )
                                    )
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-muted-foreground font-medium">
                                Image:
                            </label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-muted-foreground font-medium">
                                Content*:
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={4}
                                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
                                required
                                placeholder="Tell us about your blog..."
                            ></textarea>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition duration-300"
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
