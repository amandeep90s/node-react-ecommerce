import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    createCoupon,
    getCoupons,
    getCoupon,
    updatecoupon,
    removeCoupon,
} from "../../../functions/coupon";
import { Spin } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCoupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container-fluid py-2">
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
                            />
                            Loading...
                        </h4>
                    ) : (
                        <h4>Coupons</h4>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateCoupon;
