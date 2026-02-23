import { createBrowserRouter, Route } from "react-router-dom";
import RootLayout from "./pages/Landingpage/RootLayout";
import LandingPage from "./pages/Landingpage/Landingpage";
import AboutUs from "./pages/Landingpage/Aboutus";
import Services from "./pages/Landingpage/Services";


import Register from "./pages/Auth/Register";
import Unauthorized from "./pages/Unauthorized";


import DashboardHome from "./pages/Dashboard/DashboardHome";
import Products from "./pages/Dashboard/Products";
import Orders from "./pages/Dashboard/Orders";
import Payments from "./pages/Dashboard/Payment";
import Users from "./pages/Dashboard/Users";
import Settings from "./pages/Dashboard/Settings";
import ProtectedRoute from "./components/ProtectRoutes";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import ProductDetails from "./pages/Dashboard/ProductDetails";
import OrderDetails from "./pages/Dashboard/OrderDetails";
import PaymentDetails from "./pages/Dashboard/PaymentDetails";
import UserDetails from "./pages/Dashboard/UserDetails";
import StaffLayout from "./pages/Staff/StaffLayout";
import StaffDashboardHome from "./pages/Staff/StaffDashboardHome";
import StaffProduct from "./pages/Staff/StaffProduct";
import StaffPayment from "./pages/Staff/StaffPayment";
import StaffOrder from "./pages/Staff/StaffOrder";
import StaffSetting from "./pages/Staff/StaffSettings";
import StaffProductDetails from "./pages/Staff/StaffProductDetails";
import StaffOrderDetails from "./pages/Staff/StaffOrderDetails";
import StaffPaymentDetails from "./pages/Staff/StaffPaymentDetails";
import UserLayout from "./pages/User/UserLayout";
import UserHome from "./pages/User/UserHome";
import Shop from "./pages/User/Shop";
import UserCart from "./pages/User/UserCart";
import UserOrders from "./pages/User/UserOrder";
import UserPayments from "./pages/User/UserPayments";
import UserSettings from "./pages/User/UserSettings";
import Profile from "./pages/User/Profile";
import UserProductDetails from "./pages/User/UserProductDetails";
import Checkout from "./pages/User/Checkout";
import Login from "./pages/Auth/Login";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "services", element: <Services /> },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <Profile />
      </ProtectedRoute>
    ),
  },

  // ✅ Protected Dashboard (admin & staff only)
  {
  path: "/dashboard",
  element: <ProtectedRoute allowedRoles={["admin"]} />,
  children: [
    {
      element: <DashboardLayout />,  // ⬅️ Layout goes here
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <ProductDetails /> },
        { path: "orders", element: <Orders /> },
        {path: "orders/:id", element: <OrderDetails /> },
        { path: "payments", element: <Payments /> },
        {path: "payments/:id", element: <PaymentDetails />},
        { path: "users", element: <Users /> },
        { path: "users/:id", element: <UserDetails />},
        { path: "settings", element: <Settings /> },
      ],
    },
  ],
},


{
  path: "/staff",
  element: <ProtectedRoute allowedRoles={["staff"]} />,
  children: [
    {
      element: <StaffLayout />,
      children: [
        {index: true, element: <StaffDashboardHome />},
        {path: "products", element: <StaffProduct />},
        {path: "products/:id", element: <StaffProductDetails />},
        {path: "payments", element: <StaffPayment />},
        {path: "payments/:id", element: <StaffPaymentDetails />},
        {path: "orders", element: <StaffOrder />},
        {path: "orders/:id", element: <StaffOrderDetails />},
        {path: "settings", element: <StaffSetting />},
      ]
    }
  ]
},

{
    path: "/user",
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { index: true, element: <UserHome /> },
          {path: "shop", element: <Shop />},
          {path: "cart", element: <UserCart />},
          {path: "orders", element: <UserOrders />},
          {path: "payments", element: <UserPayments />},
          {path: "settings", element: <UserSettings />},
          {path: "profile", element: <Profile />},
          {path: "products/:id", element: <UserProductDetails />},
          {path: "checkout", element: <Checkout />},
        ],
      },
    ],
  },

]);
