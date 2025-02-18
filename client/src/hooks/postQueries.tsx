import { getPosts, getPost } from "@/api/post";
import { useQuery } from "@tanstack/react-query";

export const useGetPosts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["authors"],
        queryFn: getPosts,
    });
    return { data, isLoading };
};

export const useGetPost = (id: number) => {
    const { data, isLoading } = useQuery({
        queryKey: ["posts", id],
        queryFn: () => getPost(id),
    });
    return { data, isLoading };
};