import { Layout, Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

const items: ItemType<MenuItemType>[] = [
  {
    label: "Home",
    key: "1",
  },
  {
    label: "Profile",
    key: "2",
  },
];

const Navbar = () => {
  return (
    <Layout.Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Layout.Header>
  );
};

export default Navbar;
