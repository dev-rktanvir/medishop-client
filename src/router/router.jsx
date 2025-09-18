import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Pages/Auth/Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: 'register',
                Component: Register
            }
        ]
    }
]);