import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const UserRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));

    return user && user.token ? (
        <Route {...rest} render={() => children} />
    ) : (
        <h4 className="text-danger text-center mt-5">
            <Spin indicator={<LoadingOutlined />} className="mr-2" />
            Loading...
        </h4>
    );
};

export default UserRoute;
