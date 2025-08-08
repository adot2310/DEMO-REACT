import ProductList from "./components/ProductList";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import ProductDetail from "./components/ProductDetail";
import UserList from "./components/UserList";
import ProductCreate from "./components/ProductCreate";
import "@ant-design/v5-patch-for-react-19";
import RegisterPage from "./components/Register";
import LoginPage from "./components/Login";
import Homepage from "./components/HomePage.tsx";
import ProductUpdate from "./components/ProductUpdate.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import type { Children } from "react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/products",
      element: <ProductList />,
    },
    {
      path: "/products",
      element: <PrivateRoute />,
      children: [
        {
          path: "create",
          element: <ProductCreate />,
        },
      ],
    },
    {
      path: "/product/detail/:productId",
      element: <ProductDetail />,
    },
    {
      path: "/product/update/:id",
      element: <ProductUpdate />,
    },
    {
      path: "/categories",
      element: <CategoryList />,
    },
    {
      path: "/orders",
      element: <CategoryList />,
    },
    {
      path: "/users",
      element: <UserList />,
    },
    {
      path: "/brands",
      element: <CategoryList />,
    },
  ]);
  return (
    <div className="max-w-[1200px] mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;