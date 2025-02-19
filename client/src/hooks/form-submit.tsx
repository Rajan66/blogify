import { FormEvent, useState } from "react";
import { fetchData } from "./auth-functions";
interface FormInterface {
  usernameProps: string;
  passwordProps: string;
}
export const handleFormSubmit = async (
  event: FormEvent<HTMLFormElement>,
  { usernameProps, passwordProps }: FormInterface,
  router: any
) => {
  event.preventDefault();
  const username: string = usernameProps;
  const password: string = passwordProps;

  const response = await fetchData(
    {
      usernameProps: username,
      passwordProps: password,
    },
    false,
    router
  );
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.access);
    router.push("/");
  } else {
    alert("Wrong Response in form submission");
    console.log(response);
  }
};
