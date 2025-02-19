import React from "react";
// import NavBar from "@/components/header/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      {/* <div className="flex justify-center p-4 border-b bg-card shadow-md">
        <NavBar />
      </div> */}

      {/* Form Container */}
      <div className="flex justify-center mt-10">
        <Card className="w-full max-w-2xl bg-card shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
            Create a New Blog
          </h1>

          <form className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block mb-2 text-muted-foreground font-medium">
                Title:
              </label>
              <input
                type="text"
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block mb-2 text-muted-foreground font-medium">
                Category:
              </label>
              <select
                name="category"
                className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
              >
                <option value="sports">Sports</option>
                <option value="technology" selected>Technology</option>
                <option value="music">Music</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="food">Food</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-2 text-muted-foreground font-medium">
                Image:
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block mb-2 text-muted-foreground font-medium">
                Content:
              </label>
              <textarea
                rows={4}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
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
