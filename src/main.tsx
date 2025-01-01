import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App, ConfigProvider } from "antd";
import Layout from "@/layout";
import "styles/global.scss";
import { RegisterPage } from "pages/client/auth/register";
import { LoginPage } from "pages/client/auth/login";
import { HomePage } from "pages/client/home";
import { AboutUs } from "@/pages/client/about.us";
import { AppFooter } from "components/layout/app.footer";
import { AppProvider } from "components/context/app.context";
import { Blogs } from "pages/client/blogs";
import { Booking } from "pages/client/booking";
import enUS from "antd/locale/en_US";
import { ProtectedRoute } from "./components/auth";

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
        path: "/aboutus",
        element: (
          <>
            <AboutUs />
            <AppFooter />
          </>
        ),
      },
      {
        path: "/blogs",
        element: (
          <>
            <Blogs />
            <AppFooter />
          </>
        ),
      },
      {
        path: "/booking",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
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
      <AppProvider>
        <ConfigProvider locale={enUS}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </AppProvider>
    </App>
  </StrictMode>
);
