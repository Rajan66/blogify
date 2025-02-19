//const api = process.env.API_URL;
// const api = "http://localhost:8000/api/blog/signup/";
export const getPosts = async (search?: string) => {
    try {
        if (search) {
            const response = await fetch(
                `http://localhost:8000/api/blog/post/?search=${search}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();

            return data;
        }

        const response = await fetch(
            `http://localhost:8000/api/blog/post/`,
            {
                method: "GET",
            }
        );

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        throw error;
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

// export const createPost = async (post: any) => {
//   try {
//     const response = await fetch(`http://localhost:8000/api/blog/post/`, {
//       method: "POST",
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(post),
//     });

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };
