import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

// Components
import Header from "./components/nav/Header";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCategoryCreate from "./pages/admin/sub-category/SubCategoryCreate";
import SubCategoryUpdate from "./pages/admin/sub-category/SubCategoryUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";

const App = () => {
    const dispatch = useDispatch();

    // to check firebase auth store
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                currentUser(idTokenResult.token)
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
            }
        });

        // cleanup
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <>
            <Header />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route
                    exact
                    path="/register/complete"
                    component={RegisterComplete}
                />
                <Route
                    exact
                    path="/forgot/password"
                    component={ForgotPassword}
                />
                <UserRoute exact path="/user/history" component={History} />
                <UserRoute exact path="/user/password" component={Password} />
                <UserRoute exact path="/user/wishlist" component={Wishlist} />
                <AdminRoute
                    exact
                    path="/admin/dashboard"
                    component={AdminDashboard}
                />
                <AdminRoute
                    exact
                    path="/admin/category"
                    component={CategoryCreate}
                />
                <AdminRoute
                    exact
                    path="/admin/category/:slug"
                    component={CategoryUpdate}
                />
                <AdminRoute
                    exact
                    path="/admin/sub-category"
                    component={SubCategoryCreate}
                />
                <AdminRoute
                    exact
                    path="/admin/sub-category/:slug"
                    component={SubCategoryUpdate}
                />
                <AdminRoute
                    exact
                    path="/admin/product"
                    component={ProductCreate}
                />
            </Switch>
        </>
    );
};

export default App;
