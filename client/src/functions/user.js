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
