export interface PropInterface {
  id: string;
  imgUrl: string;
  title: string;
  author: string;
  description: string;
}

export interface BlogContextInterface {
  blogs: PropInterface[];
  setBlogs: React.Dispatch<React.SetStateAction<PropInterface[]>>;
}

export interface formInterface {
  usernameProps: string;
  passwordProps: string;
}
