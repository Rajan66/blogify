import { formInterface } from "@/interface";
export const fetchData = async (data: formInterface) => {
  const response = await fetch("http://localhost:8000/api/blog/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.usernameProps,
      password: data.passwordProps,
    }),
  });
  return response; // Return the response
};
