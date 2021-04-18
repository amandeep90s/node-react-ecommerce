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
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setName("");
                setExpiry("");
                setDiscount("");
                setLoading(false);
                toast.success(`${res.data.name} Coupon created successfully.`);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                toast.error(error.message);
            });
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

                    <form onSubmit={handleSubmit} className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="name" className="text-muted">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <label
                                    htmlFor="discount"
                                    className="text-muted"
                                >
                                    Discount %
                                </label>
                                <input
                                    type="text"
                                    name="discount"
                                    id="discount"
                                    className="form-control"
                                    value={discount}
                                    onChange={(e) =>
                                        setDiscount(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="expiry" className="text-muted">
                                    Expiry
                                </label>
                                <br />
                                <DatePicker
                                    className="form-control w-100"
                                    selected={new Date()}
                                    value={expiry}
                                    onChange={(date) => setExpiry(date)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <button className="btn btn-primary btn-raised">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCoupon;
