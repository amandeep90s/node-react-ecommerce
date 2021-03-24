import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Spin } from "antd";
import {
    GoogleOutlined,
    LoadingOutlined,
    MailOutlined,
} from "@ant-design/icons";
import { createOrUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    let dispatch = useDispatch();

    useEffect(() => {
        if (user && user.token) history.push("/");
    }, [history, user]);

    const roleBasedRedirect = (res) => {
        if (res.data.role === "admin") {
            history.push("/admin/dashboard");
        } else {
            history.push("/user/history");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
                .then((response) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: response.data.name,
                            email: response.data.email,
                            token: idTokenResult.token,
                            role: response.data.role,
                            _id: response.data._id,
                        },
                    });
                    roleBasedRedirect(response);
                })
                .catch((error) => console.error(error));
        } catch (error) {
            toast.error(error.message);
            console.error(error);
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();

                createOrUpdateUser(idTokenResult.token)
                    .then((response) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: response.data.name,
                                email: response.data.email,
                                token: idTokenResult.token,
                                role: response.data.role,
                                _id: response.data._id,
                            },
                        });
                        roleBasedRedirect(response);
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
            });
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    placeholder="Your email"
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    placeholder="Your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <Button
                onClick={handleSubmit}
                type="primary"
                className="mb-3"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || password.length < 6}>
                Login with Email/Password
            </Button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <h4>
                            <Spin
                                indicator={<LoadingOutlined />}
                                className="mr-2"
                            />
                            Loading...
                        </h4>
                    ) : (
                        <h4>Login</h4>
                    )}

                    {loginForm()}

                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large">
                        Login with Google
                    </Button>

                    <Link
                        to="/forgot/password"
                        className="float-right text-danger">
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
