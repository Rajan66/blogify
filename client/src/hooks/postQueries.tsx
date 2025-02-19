import { getPosts, getPost } from "@/api/post";
import { useQuery } from "@tanstack/react-query";

export const useGetPosts = (search?: string) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["authors"],
        queryFn: () => getPosts(search),
    });
    return { data, isLoading, error, refetch };
};

export const useGetPost = (id: number) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["posts", id],
        queryFn: () => getPost(id),
    });
    return { data, isLoading, error };
};
