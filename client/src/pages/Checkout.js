import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyUserCart, getUserCart, saveUserAddress } from "../functions/user";
import { toast } from "react-toastify";

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState();
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState("");

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
        saveUserAddress(user.token, address).then((res) => {
            if (res.data.ok) {
                setAddressSaved(true);
                toast.success("Address saved successfully.");
            }
        });
    };

    const emptyCart = () => {
        // remove from local storage
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
        }
        // remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        // remove from backend
        emptyUserCart(user.token).then((res) => {
            setProducts([]);
            setTotal(0);
            toast.success("Cart is empty. Contniue shopping.");
        });
    };

    const showAddress = () => (
        <>
            <textarea
                name="address"
                id="address"
                cols="30"
                rows="4"
                className="form-control"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <button
                className="btn btn-primary btn-info btn-raised mt-2"
                onClick={saveAddressToDb}
            >
                Save
            </button>
        </>
    );

    const showProductSummary = () =>
        products.map((p, i) => (
            <div key={i}>
                <p>
                    {p.product.title} ({p.color}) x {p.count} ={" "}
                    <strong>{p.product.price * p.count}</strong>
                </p>
            </div>
        ));

    const applyDiscountCoupon = () => {
        //
        console.log(coupon);
    };

    const showApplyCoupon = () => (
        <>
            <input
                type="text"
                name="coupon"
                id="coupon"
                onChange={(e) => setCoupon(e.target.value)}
                value={coupon}
                className="form-control"
            />

            <button
                onClick={applyDiscountCoupon}
                className="btn btn-warning btn-raised mt-2"
            >
                Apply
            </button>
        </>
    );

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-md-6">
                    <h4>Delivery Address</h4>
                    {showAddress()}

                    <h4 className="mt-4">Got Coupon?</h4>
                    {showApplyCoupon()}
                </div>
                <div className="col-md-6">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>{products.length} Product(s) in cart</p>
                    <hr />
                    {showProductSummary()}
                    <hr />
                    <h5>Cart total: ${total}</h5>

                    <div className="row">
                        <div className="col-md-6">
                            <button
                                className="btn btn-primary btn-raised"
                                disabled={!addressSaved || !products.length}
                            >
                                Place Order
                            </button>
                        </div>

                        <div className="col-md-6">
                            <button
                                className="btn btn-danger btn-raised"
                                disabled={!products.length}
                                onClick={emptyCart}
                            >
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
