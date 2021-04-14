import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
    const { user, cart } = useSelector((state) => ({ ...state }));

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-md-8">
                    <h4>Cart / {cart.length} Product(s)</h4>
                    {!cart.length ? (
                        <p className="lead">
                            No products in cart.{" "}
                            <Link to="/shop">Continue Shopping</Link>{" "}
                        </p>
                    ) : (
                        <h4>er</h4>
                    )}
                </div>
                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>
                                {c.title} x {c.count} = ${c.price * c.count}
                            </p>
                        </div>
                    ))}
                    <hr />
                    Total : <strong>${getTotal()}</strong>
                    <hr />
                    {user ? (
                        <h4 className="btn btn-sm btn-primary mt-2">
                            Proceed to Checkout
                        </h4>
                    ) : (
                        <h4 className="btn btn-sm btn-primary mt-2">
                            Login to Checkout
                        </h4>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
