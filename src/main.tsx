import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "antd";
import Layout from "./layout";
import "./styles/global.scss";
import { RegisterPage } from "./pages/client/auth/register";
import { LoginPage } from "./pages/client/auth/login";
import { HomePage } from "./pages/client/home";
import { AppFooter } from "./components/layout/app.footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <>
            <HomePage />
            <AppFooter />
          </>
        ),
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>
);
