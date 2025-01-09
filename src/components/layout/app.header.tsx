import { Link, useLocation, useNavigate } from "react-router-dom";
import "./app.header.scss";
import { FaFoursquare } from "react-icons/fa";
import { Affix, Button, Dropdown, Space } from "antd";
import { userCurrentApp } from "../context/app.context";

export const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    userCurrentApp();

  const itemsDropdown = [
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => alert("chưa phát triển")}
        >
          Quản lý tài khoản
        </label>
      ),
      key: "account",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
  if (user?.role === "ADMIN") {
    itemsDropdown.push({
      label: <Link to={"/admin"}>Quản lý hệ thống</Link>,
      key: "admin",
    });
  }

  //tạm logout
  const handleLogout = async () => {
    //todo
    // const res = await logoutAPI();
    // if (res.data) {
    //   setUser(null);
    //   setCarts([]);
    //   setIsAuthenticated(false);
    //   localStorage.removeItem("access_token");
    //   localStorage.removeItem("carts");
    // }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
  };

  return (
    <>
      <Affix offsetTop={0}>
        <div className="header-container">
          <header className="page-header">
            <div className="page-header__logo" onClick={() => navigate("/")}>
              <FaFoursquare className="logo" />
              <span>ThreeGay</span>
            </div>
            <div className="page-header__detail">
              <div
                className={location.pathname == "/" ? "home bold" : "home"}
                onClick={() => navigate("/")}
              >
                Trang Chủ
              </div>
              <div
                className={
                  location.pathname == "/services"
                    ? "services bold"
                    : "services"
                }
                onClick={() => navigate("/services")}
              >
                Dịch Vụ
              </div>
              <div className="blogs">Blogs</div>
              <div
                className={
                  location.pathname == "/aboutus" ? "aboutus bold" : "aboutus"
                }
                onClick={() => navigate("/aboutus")}
              >
                Giới Thiệu
              </div>
              <div className="contact">Liên Hệ</div>
            </div>
            <div className="page-header__auth">
              {!isAuthenticated ? (
                <div>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate("/login")}
                  >
                    Đăng Nhập
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate("/register")}
                  >
                    Đăng Ký
                  </Button>
                </div>
              ) : (
                <div>
                  <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
                    <Space style={{ cursor: "pointer" }}>
                      {/* <Avatar src={urlAvatar} />
                {user?.fullName} */}
                      <Button type="primary" size="large">
                        {user?.fullname}
                      </Button>
                    </Space>
                  </Dropdown>
                </div>
              )}
            </div>
          </header>
        </div>
      </Affix>
    </>
  );
};
