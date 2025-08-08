import React, { useState } from "react";
import {
  HomeOutlined,
  ShopFilled,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const onClick = (e: any) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const items = [
    {
      label: "Homepage",
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "Products",
      key: "/products",
      icon: <ShopFilled />,
    },
    {
      label: "Create Product",
      key: "/products/create",
      icon: <ShopFilled />,
    },
    {
      label: "Users",
      key: "/users",
      icon: <UserOutlined />,
    },
    {
      label: "Categories",
      key: "/categories",
      icon: <UnorderedListOutlined />,
    },
  ];

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div>
        {token ? (
          <Button onClick={handleLogout}>Đăng xuất</Button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 10 }}>
              <Button>Đăng nhập</Button>
            </Link>
            <Link to="/register">
              <Button>Đăng ký</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
