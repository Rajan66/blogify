import { formInterface } from "@/interface";

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
  const expirationTime = payload.exp * 1000; // Convert exp to milliseconds
  return Date.now() > expirationTime; // Check if token is expired
};

export const fetchData = async (
  data: formInterface,
  isAuthenticated: boolean,
  router: any
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (isAuthenticated) {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      router.push("/login");
    }
    // if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch("http://localhost:8000/api/blog/login/", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      username: data.usernameProps,
      password: data.passwordProps,
    }),
  });
  return response; // Return the response
};
