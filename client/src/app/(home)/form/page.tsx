"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null as File | null,
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files && e.target.files.length > 0) {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
      }
    } else {
      setFormData((prev) => ({ ...prev, image: null }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
    // console.log(token);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);

    const categoryMapping: Record<string, number> = {
      technology: 1,
      sports: 2,
      music: 3,
      lifestyle: 4,
      food: 5,
    };
    const categoryId = categoryMapping[formData.category] || 1;
    console.log(typeof categoryId)
    formDataToSend.append("category", categoryId.toString());

    formDataToSend.append("content", formData.content);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    console.log("Form Date: ", formData)

    try {
      const response = await fetch("http://localhost:8000/api/blog/post/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend, // Using FormData for image upload
      });

      if (response.ok) {
        alert("Blog created successfully!");
      } else {
        alert("Failed to create blog.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Form Container */}
      <div className="flex justify-center mt-10">
        <Card className="w-full max-w-2xl bg-card shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
            Create a New Blog
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-muted-foreground font-medium">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-muted-foreground font-medium">
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
              >
                <option value="technology">Technology</option>
                <option value="sports">Sports</option>

                <option value="music">Music</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="food">Food</option>
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
                Content:
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
                required
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
