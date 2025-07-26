import ProductList from "./components/ProductList";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import ProductDetail from "./components/ProductDetail";
import UserList from "./components/UserList";
import ProductCreate from "./components/ProductCreate";
import "@ant-design/v5-patch-for-react-19";
import Homepage from "./components/HomePage";
import ProductUpdate from "./components/ProductUpdate";
import CategoryUpdate from "./components/CategoryUpdate";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/products",
      element: <ProductList />,
    },
    {
      path: "/products/create",
      element: <ProductCreate />,
    },
    {
      path: "/products/update/:productId",
      element: <ProductUpdate />,
    },
    {
      path: "/product/detail/:productId",
      element: <ProductDetail />,
    },
    {
      path: "/categories",
      element: <CategoryList />,
    },
    {
      path: "/categories/update/:categoryId",
      element: <CategoryUpdate />,
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
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;