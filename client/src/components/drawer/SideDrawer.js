import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import Laptop from "../../images/laptop.png";

const SideDrawer = ({ children }) => {
    const dispatch = useDispatch();
    const { cart, drawer } = useSelector((state) => ({ ...state }));

    return <Drawer visible={true}>{JSON.stringify(cart)}</Drawer>;
};

export default SideDrawer;
