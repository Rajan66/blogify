export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
};

export type Post = {
    id: number;
    category: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: User;
};

export type Category = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};
