import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";

// Using lazy
// Components
const Header = lazy(() => import("./components/nav/Header"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));

// Pages
const Home = lazy(() => import("./pages/Home"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const Cart = lazy(() => import("./pages/Cart"));
const SubCategoryHome = lazy(() => import("./pages/sub/SubCategoryHome"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const Shop = lazy(() => import("./pages/Shop"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
    import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
    import("./pages/admin/category/CategoryUpdate")
);
const SubCategoryCreate = lazy(() =>
    import("./pages/admin/sub-category/SubCategoryCreate")
);
const SubCategoryUpdate = lazy(() =>
    import("./pages/admin/sub-category/SubCategoryUpdate")
);
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));

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
        <Suspense
            fallback={
                <div className="col text-center p-5">
                    __ React Redux EC
                    <LoadingOutlined />
                    MMERCE __
                </div>
            }
        >
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
                <UserRoute exact path="/checkout" component={Checkout} />
                <UserRoute exact path="/payment" component={Payment} />

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
                <AdminRoute
                    exact
                    path="/admin/coupons"
                    component={CreateCoupon}
                />
            </Switch>
        </Suspense>
    );
};

export default App;
