import { FormEvent } from "react";
import { toast } from "react-toastify";

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
        console.log(data.user);
        toast.success(`Welcome, ${data.user}`);
        router.push("/");
    } else {
        const data = await response.json();
        toast.error(data.detail);
    }
};
