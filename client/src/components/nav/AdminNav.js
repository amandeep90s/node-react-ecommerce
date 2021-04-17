import React from "react";
import { Link } from "react-router-dom";
import {
    CarryOutOutlined,
    ContainerOutlined,
    CopyOutlined,
    DashboardOutlined,
    DiffOutlined,
    DollarOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const AdminNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin/dashboard" className="nav-link">
                        <DashboardOutlined className="mr-1" />
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/product" className="nav-link">
                        <CarryOutOutlined className="mr-1" />
                        Product
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/products" className="nav-link">
                        <ContainerOutlined className="mr-1" />
                        Products
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/category" className="nav-link">
                        <CopyOutlined className="mr-1" />
                        Category
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/sub-category" className="nav-link">
                        <DiffOutlined className="mr-1" />
                        Sub Category
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/coupons" className="nav-link">
                        <DollarOutlined className="mr-1" />
                        Coupon
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/user/password" className="nav-link">
                        <SettingOutlined className="mr-1" />
                        Password
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNav;
