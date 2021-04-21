import React from "react";
import ShowPaymentInfo from "./ShowPaymentInfo";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const Orders = ({ orders, handleStatusChange }) => (
    <>
        {orders.map((order) => (
            <div key={order._id}>
                <div className="mb-4 p-3 card card bg-light p-4 mb-3">
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
                                <option value="Processing">Processing</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </>
);

export default Orders;
