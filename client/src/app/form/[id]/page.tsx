import React from "react";

import NavBar from "@/components/header/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <>
      <h1>edit page</h1>

      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <div className="flex justify-center p-4 border-b bg-white shadow-md">
          <NavBar />
        </div>

        {/* Form Container */}
        <div className="flex justify-center mt-10">
          <Card className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
              Edit the Blog
            </h1>

            <form className="space-y-6">
              {/* Title Field */}
              <div>
                <label className="block mb-2 text-gray-600 font-medium">
                  Title:
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block mb-2 text-gray-600 font-medium">
                  Category:
                </label>
                <select
                  name="category"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="sports">Sports</option>
                  <option value="technology">Technology</option>
                  <option value="music">Music</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="food">Food</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-2 text-gray-600 font-medium">
                  Image:
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block mb-2 text-gray-600 font-medium">
                  Description:
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Create
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
