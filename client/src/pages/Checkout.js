import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../functions/user";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        setLoading(true);
        getUserCart(user.token).then((res) => {
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
            setLoading(false);
        });

        return () => setProducts([]);
    }, []);

    const saveAddressToDb = () => {
        //
    };

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-md-6">
                    <h4>Delivery Address</h4>
                    <br />
                    <br />
                    textarea
                    <button
                        className="btn btn-primary mt-2"
                        onClick={saveAddressToDb}
                    >
                        Save
                    </button>
                    <hr />
                    <h4>Got Coupon?</h4>
                    <br />
                    coupon input and apply coupon
                </div>
                <div className="col-md-6">
                    <h4>Order Summary</h4>
                    <h1>{total}</h1>
                    {JSON.stringify(products)}
                    <hr />
                    <p>Products</p>
                    <hr />
                    <p>List of products</p>
                    <hr />
                    <p>Cart total: $x</p>

                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-primary">
                                Place Order
                            </button>
                        </div>

                        <div className="col-md-6">
                            <button className="btn btn-primary">
                                Empty Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
