import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

    useEffect(() => {
        loadUserOrders();
    }, []);

    const loadUserOrders = () => {
        setLoading(true);
        getUserOrders(user.token).then((res) => {
            setLoading(false);
            setOrders(res.data);
        });
    };

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
                        <h4>User Orders</h4>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;
