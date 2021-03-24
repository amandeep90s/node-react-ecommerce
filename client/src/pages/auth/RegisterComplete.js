import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let dispatch = useDispatch();

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if (!email || !password) {
            toast.error("Email and password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be atleast 6 characters long");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );

            if (result.user.emailVerified) {
                // remove user email from local storage
                window.localStorage.removeItem("emailForRegistration");

                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = user.getIdTokenResult();

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
                    })
                    .catch((error) => console.error(error));

                // redirect
                history.push("/");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control px-2"
                value={email}
                placeholder="Email"
                disabled
            />

            <input
                type="password"
                className="form-control px-2"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
            />

            <button type="submit" className="btn btn-raised btn-primary mt-3">
                Complete Registration
            </button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;
