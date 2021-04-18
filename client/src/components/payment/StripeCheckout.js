import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = () => {
        //
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
            </form>
        </>
    );
};

export default StripeCheckout;
