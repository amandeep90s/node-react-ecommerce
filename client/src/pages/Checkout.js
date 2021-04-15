import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../functions/user";

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getUserCart(user.token).then((res) => {
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        });

        return () => setProducts([]);
    }, [user.token]);

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
                    <hr />
                    <p>{products.length} Product(s) in cart</p>
                    <hr />
                    {products.map((p, i) => (
                        <div key={i}>
                            <p>
                                {p.product.title} ({p.color}) x {p.count} ={" "}
                                <strong>{p.product.price * p.count}</strong>
                            </p>
                        </div>
                    ))}
                    <hr />
                    <h5>Cart total: ${total}</h5>

                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-primary btn-raised">
                                Place Order
                            </button>
                        </div>

                        <div className="col-md-6">
                            <button className="btn btn-danger btn-raised">
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
