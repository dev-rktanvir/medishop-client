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
import ManageCat from "../Pages/Dashboard/ManageCat/ManageCat";
import Medicine from "../Pages/Dashboard/Medicine/Medicine";
import ShopPage from "../Pages/ShopPage/ShopPage";
import CatsDetails from "../Pages/CategoryDetails/CatsDetails";
import Cart from "../Pages/Cart/Cart";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import InvoicePage from "../Pages/InvoicePage/InvoicePage";
import ManagePayments from "../Pages/Dashboard/ManagePayments/ManagePayments";
import SellerPayment from "../Pages/Dashboard/SellerPayment/SellerPayment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import SalesReport from "../Pages/Dashboard/SalesReport/SalesReport";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Forbidden from "../Pages/Forbidden/Forbidden";
import NotFound from "../Pages/NotFound/NotFound";
import AdminRoute from "../route/AdminRoute/AdminRoute";
import SellerRoute from "../route/SellerRoute/SellerRoute";
import UserRoute from "../route/UserRoute/UserRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'shop',
                Component: ShopPage
            },
            {
                path: 'category/:name',
                Component: CatsDetails
            },
            {
                path: 'cart',
                Component: Cart
            },
            {
                path: 'checkout',
                element: <PrivateRoute><CheckoutPage></CheckoutPage></PrivateRoute>
            },
            {
                path: 'payment/:id',
                element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
            },
            {
                path: 'invoice/:id',
                element: <PrivateRoute><InvoicePage></InvoicePage></PrivateRoute>
            },
            {
                path: 'forbidden',
                Component: Forbidden
            },
            {
                path: '/*',
                Component: NotFound
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
                index: true,
                Component: DashboardHome
            },

            // Admin Route

            {
                path: 'manage-user',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'manage-cat',
                element: <AdminRoute><ManageCat></ManageCat></AdminRoute>
            },
            {
                path: 'manage-pay',
                element: <AdminRoute><ManagePayments></ManagePayments></AdminRoute>
            },
            {
                path: 'sales-report',
                element: <AdminRoute><SalesReport></SalesReport></AdminRoute>
            },
            {
                path: 'manage-ads',
                element: <AdminRoute><ManageAds></ManageAds></AdminRoute>
            },

            // Seller Route

            {
                path: 'medicine',
                element: <SellerRoute><Medicine></Medicine></SellerRoute>
            },
            {
                path: 'seller-pay',
                element: <SellerRoute><SellerPayment></SellerPayment></SellerRoute>
            },
            {
                path: 'advertisement',
                element: <SellerRoute><Advertisement></Advertisement></SellerRoute>
            },

            // User Route
            
            {
                path: 'payment-history',
                element: <UserRoute><PaymentHistory></PaymentHistory></UserRoute>
            }
        ]
    }
]);