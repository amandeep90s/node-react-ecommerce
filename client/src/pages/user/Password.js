import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success("Password updated");
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
                setLoading(false);
            });
    };

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    placeholder="Your password"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-raised"
                disabled={!password || password.length < 6 || loading}>
                Submit
            </button>
        </form>
    );

    return (
        <div className="container-fluid py-2">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4>
                            <Spin
                                indicator={<LoadingOutlined />}
                                className="mr-2"
                            />
                            Loading...
                        </h4>
                    ) : (
                        <h4>Password Update</h4>
                    )}

                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    );
};

export default Password;
