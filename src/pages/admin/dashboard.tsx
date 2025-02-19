import { useLocation } from "react-router-dom";

const DashBoardPage = () => {
  const location = useLocation();

  const getRole = () => {
    if (location.pathname.startsWith("/admin")) return "ADMIN";
    if (location.pathname.startsWith("/doctor")) return "DOCTOR";
    return "USER";
  };

  return <div>Chào mừng bạn đến trang quản lý của {getRole()}</div>;
};

export default DashBoardPage;
