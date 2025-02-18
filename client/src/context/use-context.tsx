"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { blogContextInterface } from "../../Interface/interface";

// Define the context
const BlogContext = createContext<blogContextInterface | undefined>(undefined);

// Custom hook to access the BlogContext
export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};

// Define the BlogProvider component
interface BlogProviderProps {
  children: ReactNode; // Define the children prop as ReactNode
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const blogData = [
    {
      id: "1",
      imgUrl: "/assets/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg",
      title: "Optimizing React Performance",
      author: "John Doe",
      description:
        "In this post, we’ll explore various techniques to optimize React app performance. From using memoization to React.lazy for code splitting, and the use of the React Profiler, we’ll dive deep into the tools and strategies that can make your React applications faster and more efficient. Learn how to prevent unnecessary re-renders, reduce the bundle size, and improve loading times for users on all devices.",
    },
    {
      id: "2",
      imgUrl: "/assets/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg",
      title: "Mastering JavaScript Closures",
      author: "Alice Johnson",
      description:
        "JavaScript closures are one of the most powerful and tricky concepts in programming. In this article, we’ll break down what closures are, how they work, and how they can be leveraged in your code to create private variables, handle asynchronous tasks, and avoid memory leaks. Whether you're a beginner or an experienced JavaScript developer, this post will help clarify the concept and provide practical use cases.",
    },
    {
      id: "3",
      imgUrl: "/assets/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg",
      title: "Exploring MongoDB Aggregations",
      author: "James Smith",
      description:
        "MongoDB’s aggregation framework allows you to perform complex queries and transformations on your data. In this post, we'll walk through various aggregation stages like `$group`, `$match`, `$sort`, and `$lookup`. You'll learn how to use MongoDB’s aggregation pipelines to process large datasets, create reports, and extract valuable insights that go beyond basic queries.",
    },
    {
      id: "4",
      imgUrl: "/assets/lautaro-andreani-xkBaqlcqeb4-unsplash.jpg",
      title: "Building a Real-Time Chat App with Node.js and Socket.IO",
      author: "Emily Carter",
      description:
        "In this step-by-step tutorial, we’ll build a real-time chat application using Node.js and Socket.IO. This guide covers everything from setting up the server to creating user interfaces that enable instant messaging between users. Along the way, you'll learn how to manage WebSocket connections, emit and listen for events, and implement basic features like message history, user notifications, and private chats.",
    },
  ];

  const [blogs, setBlogs] = useState(blogData);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};
