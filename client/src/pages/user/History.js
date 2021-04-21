import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserOrders } from "../../functions/user";
import UserNav from "../../components/nav/UserNav";
import { Spin } from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const History = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const loadUserOrders = useCallback(() => {
        setLoading(true);
        getUserOrders(user.token).then((res) => {
            setLoading(false);
            setOrders(res.data);
        });
    }, [user.token]);

    useEffect(() => {
        loadUserOrders();
    }, [loadUserOrders]);

    const showOrdersInTable = (order) => <p>each order and its products</p>;

    const showEachOrders = () =>
        orders.map((order, i) => (
            <div key={i} className="mx-3 my-4 p-3 card">
                <p>show payment info</p>
                {showOrdersInTable(order)}
                <div className="row">
                    <div className="col">
                        <p>PDF DOWNLOAD</p>
                    </div>
                </div>
            </div>
        ));

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4>
                            <Spin
                                indicator={<LoadingOutlined />}
                                className="mr-2"
                            ></Spin>
                            ...Loading
                        </h4>
                    ) : (
                        <h4 className="text-center">
                            {orders.length > 0
                                ? "User purchase orders"
                                : "No purchase orders"}
                        </h4>
                    )}

                    {showEachOrders()}
                </div>
            </div>
        </div>
    );
};

export default History;
