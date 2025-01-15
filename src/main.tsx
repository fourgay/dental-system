import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App, ConfigProvider } from "antd";
import Layout from "@/layout";
import "styles/global.scss";
import { RegisterPage } from "pages/client/auth/register";
import { LoginPage } from "pages/client/auth/login";
import { HomePage } from "pages/client/home";
import { AboutUsPage } from "@/pages/client/about.us";
import { AppFooter } from "components/layout/app.footer";
import { AppProvider } from "components/context/app.context";
import { BlogsPage } from "pages/client/blogs";
import { Booking } from "pages/client/booking";
import enUS from "antd/locale/en_US";
import { ProtectedRoute } from "components/auth";
import { LayoutAdmin } from "components/layout/layout.admin";
import DashBoardPage from "./pages/admin/dashboard";
import { ManageUserPage } from "./pages/admin/manage.user";
import { ManageBookingPage } from "./pages/admin/manage.booking";
import { ServicesPage } from "./pages/client/services";

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
        path: "services",
        element: (
          <>
            <ServicesPage />
            <AppFooter />
          </>
        ),
      },
      {
        path: "aboutus",
        element: (
          <>
            <AboutUsPage />
            <AppFooter />
          </>
        ),
      },
      {
        path: "blogs",
        element: (
          <>
            <BlogsPage />
            <AppFooter />
          </>
        ),
      },
      {
        path: "booking",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <ManageUserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "booking",
        element: (
          <ProtectedRoute>
            <ManageBookingPage />
          </ProtectedRoute>
        ),
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
