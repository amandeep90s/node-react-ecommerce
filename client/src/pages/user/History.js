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

    const showOrdersInTable = (order) => (
        <table className="table table-bordered text-center">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p, i) => (
                    <tr key={i}>
                        <td>
                            <strong>{p.product.title}</strong>
                        </td>
                        <td>${p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.product.color}</td>
                        <td>{p.count}</td>
                        <td>
                            {p.product.shipping === "Yes" ? (
                                <CheckCircleOutlined className="text-success" />
                            ) : (
                                <CloseCircleOutlined className="text-danger" />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

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
