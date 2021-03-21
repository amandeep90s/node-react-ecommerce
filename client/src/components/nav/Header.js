import React, { useState } from "react";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
    AppstoreOutlined,
    LogoutOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Item, SubMenu } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");
    let history = useHistory();
    let disptach = useDispatch();

    const handleClick = (e) => {
        setCurrent(e.key);

        disptach({
            type: "LOGOUT",
            payload: null,
        });

        history.push("/login");
    };

    const logout = () => {
        firebase.auth().signOut();
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <Item
                key="register"
                icon={<UserAddOutlined />}
                className="float-right"
            >
                <Link to="/register">Register</Link>
            </Item>

            <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>

            <SubMenu
                key="SubMenu"
                icon={<SettingOutlined />}
                title="Username"
                className="float-right"
            >
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
                <Item icon={<LogoutOutlined />} onClick={logout}>
                    Logout
                </Item>
            </SubMenu>
        </Menu>
    );
};

export default Header;
