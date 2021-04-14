import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
    const { user, cart } = useSelector((state) => ({ ...state }));

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-7">
                    <h4>Cart</h4>
                    {JSON.stringify(cart)}
                </div>

                <div className="col-md-5"></div>
            </div>
        </div>
    );
};

export default Cart;
