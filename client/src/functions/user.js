import axios from "axios";

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
