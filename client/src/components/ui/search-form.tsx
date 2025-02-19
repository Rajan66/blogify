import { useState, useEffect } from "react";

import { Search } from "lucide-react";

import { useGetPosts } from "@/hooks/postQueries";
import { Label } from "@/components/ui/label";
import { SidebarGroup, SidebarGroupContent, SidebarInput } from "@/components/ui/sidebar";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: posts, isLoading, error, refetch } = useGetPosts(searchTerm);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value); 
    };

    useEffect(() => {
        if (searchTerm) {
            refetch();
        }
        if(searchTerm ===""){
          refetch()
        }
    }, [searchTerm]);

    return (
        <form {...props}>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <SidebarInput
                        id="search"
                        placeholder="Search for blogs..."
                        className="pl-8 w-[400px] h-[40px]"
                        onChange={handleChange}
                    />
                    <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    );
}
