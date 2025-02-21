import { useState, useEffect } from "react";

export const useIsAuthor = (post: any) => {
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || !post?.user) return;

    const user = JSON.parse(storedUser);
    setIsAuthor(user.id === post.user.id);
  }, [post]);

  return isAuthor;
};

export default useIsAuthor;
