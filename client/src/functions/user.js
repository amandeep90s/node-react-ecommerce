import axios from "axios";

// store user cart
export const userCart = async (cart, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API_URL}/user/cart`,
        { cart },
        {
            headers: {
                authtoken,
            },
        }
    );

// get user cart
export const getUserCart = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/user/cart`, {
        headers: {
            authtoken,
        },
    });

// remove user cart
export const emptyUserCart = async (authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API_URL}/user/cart`, {
        headers: {
            authtoken,
        },
    });

// save user address
export const saveUserAddress = async (authtoken, address) =>
    await axios.post(
        `${process.env.REACT_APP_API_URL}/user/address`,
        { address },
        { headers: { authtoken } }
    );

// apply coupon
export const applyCoupon = async (authtoken, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API_URL}/user/cart/coupon`,
        { coupon },
        { headers: { authtoken } }
    );

// create order
export const createOrder = async (stripeResponse, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API_URL}/user/order`,
        { stripeResponse },
        { headers: { authtoken } }
    );

// create order with cash on delivery
export const createCashOrderForUser = async (authtoken, cod) =>
    await axios.post(
        `${process.env.REACT_APP_API_URL}/user/cash-order`,
        { cod },
        { headers: { authtoken } }
    );

// list user orders
export const getUserOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/user/orders`, {
        headers: {
            authtoken,
        },
    });

// get user wishlists
export const getWishlist = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/user/wishlist`, {
        headers: {
            authtoken,
        },
    });

// add user wishlist
export const addToWishlist = async (productId, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API_URL}/user/wishlist`,
        { productId },
        { headers: { authtoken } }
    );

// update user wishlist
export const removeFromWishlist = async (productId, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API_URL}/user/wishlist/${productId}`,
        {},
        { headers: { authtoken } }
    );
