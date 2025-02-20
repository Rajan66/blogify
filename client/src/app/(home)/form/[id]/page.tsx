"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { toast } from "react-toastify";

import { useGetPost } from "@/hooks/postQueries";
import { useGetCategories, useGetCategory } from "@/hooks/categoryQueries";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";

import defaultImage from "@/assets/default.jpg"

export default function page() {

  const { id } = useParams();
  const { data: post } = useGetPost(Number(id));
  const { data: cat } = useGetCategory(post?.category);
  const { data: categories, isLoading: isPending } = useGetCategories();

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<number | "">("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(cat?.id || "");
      setContent(post.content);
      setImageUrl(post.image);
    }
  }, [post, cat]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category.toString());
    formData.append("content", content);

    if (newImage) {
      formData.append("image", newImage); 
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/blog/post/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData, 
        }
      );

      if (response.ok) {
        toast.success("Post updated successfully!");
        router.push(`/blog/${id}`);
      } else {
        toast.error("Failed to update the post.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the post.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0])); // show new image
    }
  };

  return (
    <>
      <h1>edit page</h1>

      <div className="min-h-screen bg-background">
        <div className="flex justify-center mt-10">
          <Card className="w-full max-w-2xl bg-card shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
              Edit the blog
            </h1>

            <form className="space-y-6" onSubmit={handleEdit}>
              <div>
                <label className="block mb-2 text-muted-foreground font-medium">
                  Title*:
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
                  required
                  value={category}
                  onChange={(e) => setCategory(Number(e.target.value))}
                >
                  {isPending ? (
                    <option disabled>Loading categories...</option>
                  ) : (
                    categories?.map((catItem: Category) => (
                      <option key={catItem.id} value={catItem.id}>
                        {catItem.title}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-muted-foreground font-medium">
                  Image:
                </label>
                <Image
                  src={imageUrl || defaultImage}
                  alt="Blog Image"
                  width={500}
                  height={160}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <label className="block mb-2 text-muted-foreground font-medium">
                  Content*:
                </label>
                <textarea
                  name="content"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
                  required
                  placeholder="Tell us about your blog..."
                ></textarea>
              </div>

              <div className="flex gap-4 mt-6">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Edit
                </Button>
                <Button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600"
                  onClick={() => router.push(`/blog/`)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
