import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserOrders } from "../../functions/user";
import UserNav from "../../components/nav/UserNav";
import ShowPaymentInfo from "../../components/order/ShowPaymentInfo";
import { Spin } from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

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

    const showDownloadLink = (order) => (
        <PDFDownloadLink
            document={<Invoice order={order} />}
            fileName="invoice.pdf"
            className="btn btn-sm btn-block btn-outline-primary"
        >
            Download PDF
        </PDFDownloadLink>
    );

    const showEachOrders = () =>
        orders.map((order, i) => (
            <div key={i} className="mx-3 my-4 p-3 card">
                <ShowPaymentInfo order={order} />
                {showOrdersInTable(order)}
                <div className="row">
                    <div className="col">{showDownloadLink(order)}</div>
                </div>
            </div>
        ));

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
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
