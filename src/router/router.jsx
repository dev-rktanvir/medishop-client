import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import PrivateRoute from "../route/PrivateRoute/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Advertisement from "../Pages/Dashboard/Advertisement/Advertisement";
import ManageAds from "../Pages/Dashboard/ManageAds/ManageAds";

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
            },
            {
                path: 'login',
                Component: Login
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'advertisement',
                Component: Advertisement
            },
            {
                path: 'manage-ads',
                Component: ManageAds
            }

        ]
    }
]);