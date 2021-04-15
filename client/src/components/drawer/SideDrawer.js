import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
import Laptop from "../../images/laptop.png";

const SideDrawer = () => {
    const dispatch = useDispatch();
    const { cart, drawer } = useSelector((state) => ({ ...state }));

    const imageStyle = {
        width: "100%",
        height: "100px",
        objectFit: "cover",
    };

    return (
        <Drawer
            className="text-center"
            title={`Cart / ${cart.length} Product(s)`}
            placement="right"
            onClose={() => {
                // show cart items in side drawer
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false,
                });
            }}
            visible={drawer}
        >
            {cart.map((p) => (
                <div key={p._id} className="row mb-2">
                    <div className="col">
                        <>
                            {p.images[0] ? (
                                <img
                                    src={p.images[0].url}
                                    style={imageStyle}
                                    alt="Cart Product"
                                    className="img-thumbnail"
                                />
                            ) : (
                                <img
                                    src={Laptop}
                                    style={imageStyle}
                                    alt="Cart Product"
                                />
                            )}
                            <p className="text-center bg-secondary text-light p-1">
                                {p.title} x {p.count}
                            </p>
                        </>
                    </div>
                </div>
            ))}
            <Link to="/cart">
                <button
                    onClick={() =>
                        dispatch({
                            type: "SET_VISIBLE",
                            payload: false,
                        })
                    }
                    className="btn btn-primary btn-raised btn-block text-center"
                >
                    Go to Cart
                </button>
            </Link>
        </Drawer>
    );
};

export default SideDrawer;
