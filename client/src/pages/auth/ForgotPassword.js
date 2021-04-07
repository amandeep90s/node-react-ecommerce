import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Button, Spin } from "antd";
import { LoadingOutlined, MailOutlined } from "@ant-design/icons";

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push("/");
    }, [history, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail("");
                setLoading(false);
                toast.success("Check your email for password reset link");
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
                console.log("Error message in forgot password", error);
            });
    };

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (
                <h4>
                    <Spin indicator={<LoadingOutlined />} className="mr-2" />
                    Loading...
                </h4>
            ) : (
                <h4>Forgot Password</h4>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        autoFocus
                    />
                </div>

                <Button
                    onClick={handleSubmit}
                    type="primary"
                    size="large"
                    shape="round"
                    block
                    icon={<MailOutlined />}
                    disabled={!email}
                >
                    Send Reset Password Link
                </Button>
            </form>
        </div>
    );
};

export default ForgotPassword;
