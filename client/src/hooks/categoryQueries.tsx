import { getCategories, getCategory } from "@/api/category";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
    return { data, isLoading };
};

export const useGetCategory = (id?: number) => {
    const { data, isLoading } = useQuery({
        queryKey: ["categories", id],
        queryFn: () => getCategory(id),
    });
    return { data, isLoading };
};