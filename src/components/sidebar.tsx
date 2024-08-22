import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const currentPath = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string>();

  function handleNavigate(param: string) {
    navigate(param);
  }

  const items: ItemType<MenuItemType>[] = [
    {
      label: "Product Details",
      key: "1",
      onClick: () => handleNavigate("/"),
    },
    {
      label: "Compare Products",
      key: "2",
      onClick: () => handleNavigate("/compare"),
    },
  ];

  useEffect(() => {
    if (currentPath.pathname === "/compare") {
      setSelectedKeys("2");
    } else {
      setSelectedKeys("1");
    }
  });

  return (
    <Menu
      selectedKeys={[selectedKeys!]}
      style={{ width: 256, height: "100vh" }}
      mode="vertical"
      items={items}
    />
  );
};

export default Sidebar;
