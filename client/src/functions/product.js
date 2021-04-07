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

// Get single product
export const getProduct = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/product/${slug}`);

// Get products by count
export const getProductsByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/products/${count}`);

// Update a product
export const updateProduct = async (slug, product, authtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API_URL}/product/${slug}`,
        product,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// Delete a product
export const removeProduct = async (slug, authtoken) => {
    return await axios.delete(
        `${process.env.REACT_APP_API_URL}/product/${slug}`,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// Get products list with sort, order, limit
export const getProducts = async (sort, order, page) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
        sort,
        order,
        page,
    });
};

// Get products count
export const getProductsCount = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/products/total`);
};
