//const api = process.env.API_URL;
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5OTg0Nzc1LCJpYXQiOjE3Mzk4OTgzNzUsImp0aSI6IjVjMjU4YWRlMWI4MDQ0MDA5MmFlMWNmOTRmNTAxODk0IiwidXNlcl9pZCI6MX0.TZEH9RomoJ19sNIbT-Y9Y943gVgofyjjs-eSkIfkOp8";
export const getPosts = async () => {
    try {
        const response = await fetch(`http://localhost:8000/api/blog/post/`, {
            method: "GET",
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getPost = async (id: number) => {
    try {
        // const response = await fetch(`${api}/blog/post/${id}/`);
        const response = await fetch(`http://localhost:8000/api/blog/post/${id}/`, {
            method: "GET",
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const createPost = async (post: any) => {
    try {
        const response = await fetch(`http://localhost:8000/api/blog/post/`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(post),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};
