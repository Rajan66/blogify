export interface PropInterface {
    id: string;
    imgUrl: string;
    title: string;
    author: string;
    description: string;
}

export interface BlogContextInterface {
    blogs: PropInterface[]; // Array of blog objects
    setBlogs: React.Dispatch<React.SetStateAction<PropInterface[]>>; // Function to update the blogs
}
