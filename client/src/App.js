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
import SideDrawer from "./components/drawer/SideDrawer";

// Pages
import Home from "./pages/Home";
import CategoryHome from "./pages/category/CategoryHome";
import Cart from "./pages/Cart";
import SubCategoryHome from "./pages/sub/SubCategoryHome";
import Product from "./pages/Product";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import Shop from "./pages/Shop";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCategoryCreate from "./pages/admin/sub-category/SubCategoryCreate";
import SubCategoryUpdate from "./pages/admin/sub-category/SubCategoryUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import AllProducts from "./pages/admin/product/AllProducts";

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
                    .catch((error) => console.log(error));
            }
        });

        // cleanup
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <>
            <Header />
            <SideDrawer />
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
                <Route exact path="/category/:slug" component={CategoryHome} />
                <Route
                    exact
                    path="/sub-category/:slug"
                    component={SubCategoryHome}
                />
                <Route exact path="/product/:slug" component={Product} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />

                {/* User Routes */}
                <UserRoute exact path="/user/history" component={History} />
                <UserRoute exact path="/user/password" component={Password} />
                <UserRoute exact path="/user/wishlist" component={Wishlist} />

                {/* Admin Routes */}
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
                <AdminRoute
                    exact
                    path="/admin/product/:slug"
                    component={ProductUpdate}
                />
                <AdminRoute
                    exact
                    path="/admin/products"
                    component={AllProducts}
                />
            </Switch>
        </>
    );
};

export default App;
