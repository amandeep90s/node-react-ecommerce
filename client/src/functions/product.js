import axios from "axios";

// Create a product
export const createProduct = async (product, authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/product`,
        product,
        {
            headers: {
                authtoken,
            },
        }
    );
};
