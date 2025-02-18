
export const getCategories = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/blog/category/`, {
            method: "GET",
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getCategory = async (id: number) => {
    try {
        // const response = await fetch(`${api}/blog/post/${id}/`);
        const response = await fetch(`http://localhost:8000/api/blog/category/${id}/`, {
            method: "GET",
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};