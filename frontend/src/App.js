import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./components/ErrorPage";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <PrivateRoute />,
          children: [
            { index: "/", element: <Product /> },
            { path: "/add_product", element: <AddProduct /> },
            { path: "/product/:id", element: <UpdateProduct /> },
          ],
        },
        { path: "/signup", element: <Signup /> },
        {path: "/login", element: <Login/>}
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
