import { toast } from "react-toastify";
interface PropsInterface {
  id: string | string[] | undefined;
  router: any;
}

const checkToken = async (token: string | null) => {
  if (!token) {
    toast.error("Please log in to delete the post!");
    return;
  }
};

const handleFetch = async (
  { id, router }: PropsInterface,
  token: string | null
) => {
  const response = await fetch(`http://localhost:8000/api/blog/post/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    toast.success("Post deleted successfully!");
    router.push("/");
  } else {
    toast.error("Failed to delete the post.");
  }
};

export const handleDelete = async ({ id, router }: PropsInterface) => {
  const token = localStorage.getItem("token");
  checkToken(token);
  try {
    await handleFetch(
      {
        id: id,
        router: router,
      },
      token
    );
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred while deleting the post.");
  }
};
