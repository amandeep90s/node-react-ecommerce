import React from "react";
import ShowPaymentInfo from "./ShowPaymentInfo";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import slugify from "slugify";

const Orders = ({ orders, handleStatusChange }) => (
    <>
        {orders.map((order) => {
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

            return (
                <div key={order._id}>
                    <div
                        className={`mb-4 p-3 card card bg-light p-4 mb-3 ${slugify(
                            order.orderStatus.toLowerCase()
                        )}`}
                    >
                        <ShowPaymentInfo order={order} showStatus={false} />

                        <div className="row">
                            <div className="col-md-2 text-left pt-3">
                                Delivery Status
                            </div>
                            <div className="col-md-3">
                                <select
                                    onChange={(e) =>
                                        handleStatusChange(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                    name="status"
                                    id="status"
                                    value={order.orderStatus}
                                    className="form-control pl-2"
                                >
                                    <option value="Not Proccessed">
                                        Not Proccessed
                                    </option>
                                    <option value="Processing">
                                        Processing
                                    </option>
                                    <option value="Dispatched">
                                        Dispatched
                                    </option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="col-md-12 mt-4">
                                {showOrdersInTable(order)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
    </>
);

export default Orders;
