import React, { useState } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Menu } from "antd";
import {
    AppstoreOutlined,
    LogoutOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

const { Item, SubMenu } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");
    let history = useHistory();
    let { user, cart } = useSelector((state) => ({ ...state }));
    let disptach = useDispatch();

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut();

        disptach({
            type: "LOGOUT",
            payload: null,
        });

        history.push("/login");
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                        Cart
                    </Badge>
                </Link>
            </Item>

            {!user && (
                <Item
                    key="register"
                    icon={<UserAddOutlined />}
                    className="float-right"
                >
                    <Link to="/register">Register</Link>
                </Item>
            )}

            {!user && (
                <Item
                    key="login"
                    icon={<UserOutlined />}
                    className="float-right"
                >
                    <Link to="/login">Login</Link>
                </Item>
            )}

            {user && (
                <SubMenu
                    key="SubMenu"
                    icon={<SettingOutlined />}
                    title={user.email && user.email.split("@")[0]}
                    className="float-right text-capitalize"
                >
                    {user && user.role === "subscriber" && (
                        <Item>
                            <Link to="/user/history">Dashboard</Link>
                        </Item>
                    )}

                    {user && user.role === "admin" && (
                        <Item>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Item>
                    )}

                    <Item icon={<LogoutOutlined />} onClick={logout}>
                        Logout
                    </Item>
                </SubMenu>
            )}

            <span className="float-right p-1">
                <Search />
            </span>
        </Menu>
    );
};

export default Header;
