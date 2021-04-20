import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createPaymentIntent } from "../../functions/stripe";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const StripeCheckout = ({ history }) => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        createPaymentIntent(user.token).then((res) => {
            setClientSecret(res.data.clientSecret);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.value,
                },
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            // here you get result after successful payment
            // create order and save in database for admin to process
            // empty user cart from redux store and local storage
            console.log(JSON.stringify(payload, null, 4));
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const handleChange = async (e) => {
        // listen for changes in the card element
        // and display any errors as the custoemr types their card details
        setDisabled(e.empty); // disable pay button if errors
        setError(e.error ? e.error.message : ""); // show error message
    };

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <>
            <p
                className={
                    succeeded ? "result-message" : "result-message hidden"
                }
            >
                Payment Successfull.
                <Link to="/user/history" className="mr-2">
                    See it in your purchase history.
                </Link>
            </p>

            <form
                id="payment-form"
                className="stripe-form"
                onSubmit={handleSubmit}
            >
                <CardElement
                    id="card-element"
                    options={cartStyle}
                    onChange={handleChange}
                />

                <button
                    className="stripe-button"
                    disabled={processing || disabled || succeeded}
                >
                    <span id="button-text">
                        {processing ? (
                            <>
                                <Spin
                                    indicator={<LoadingOutlined />}
                                    className="mr-2"
                                ></Spin>
                                Processing
                            </>
                        ) : (
                            "Pay"
                        )}
                    </span>
                </button>
                {error && (
                    <>
                        <hr />
                        <div className="card-error" role="alert">
                            {error}
                        </div>
                    </>
                )}
            </form>
        </>
    );
};

export default StripeCheckout;
