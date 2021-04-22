import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const saveOrderToDb = (cashOnDelivery = false) => {
        if (cashOnDelivery) {
            dispatch({
                type: "CASH_ON_DELIVERY",
                payload: true,
            });
        } else {
            dispatch({
                type: "CASH_ON_DELIVERY",
                payload: false,
            });
        }
        userCart(cart, user.token)
            .then((res) => {
                if (res.data.ok) history.push("/checkout");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const showCartItems = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            {cart.map((p) => (
                <ProductCardInCheckout key={p._id} product={p} />
            ))}
        </table>
    );

    return (
        <div className="container-fluid py-3">
            <div className="row">
                <div className="col-md-8">
                    <h4>Cart / {cart.length} Product(s)</h4>
                    {!cart.length ? (
                        <p className="lead">
                            No products in cart.
                            <Link to="/shop">Continue Shopping</Link>{" "}
                        </p>
                    ) : (
                        showCartItems()
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
                        <>
                            <button
                                onClick={() => saveOrderToDb(false)}
                                className="btn btn-sm btn-primary btn-raised mt-2 mr-2"
                                disabled={!cart.length}
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => saveOrderToDb(true)}
                                className="btn btn-sm btn-warning btn-raised mt-2"
                                disabled={!cart.length}
                            >
                                Pay Cash on Delivery
                            </button>
                        </>
                    ) : (
                        <Link
                            to={{
                                pathname: "/login",
                                state: { from: "cart" },
                            }}
                        >
                            <button className="btn btn-sm btn-primary btn-raised mt-2">
                                Login to Checkout
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
