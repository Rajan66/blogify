export interface propInterface {
  id: string;
  imgUrl: string;
  title: string;
  author: string;
  description: string;
}

export interface blogContextInterface {
  blogs: propInterface[]; // Array of blog objects
  setBlogs: React.Dispatch<React.SetStateAction<propInterface[]>>; // Function to update the blogs
}
