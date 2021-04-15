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
