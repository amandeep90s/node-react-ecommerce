import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../components/nav/AdminNav";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { getOrders, orderStatus } from "../../functions/admin";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    const loadOrders = useCallback(() => {
        setLoading(true);
        getOrders(user.token).then((res) => {
            setOrders(res.data);
            setLoading(false);
        });
    }, [user.token]);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    const handleStatusChange = (orderId, orderStatus) => {
        setLoading(true);
        orderStatus(orderId, orderStatus, user.token).then((res) => {
            toast.success("Status updated");
            loadOrders();
        });
    };

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading ? (
                        <h4>
                            <Spin
                                indicator={<LoadingOutlined />}
                                className="mr-2"
                            ></Spin>
                            ...Loading
                        </h4>
                    ) : (
                        <h4>
                            {orders.length > 0
                                ? "Admin Dashboard"
                                : "No purchase orders"}
                        </h4>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
