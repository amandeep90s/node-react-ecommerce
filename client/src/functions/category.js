import axios from "axios";

// Get all categories
export const getCategories = async () =>
    await axios.get(`${process.env.REACT_APP_API_URL}/categories`);

// Get a single category
export const getCategory = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/category/${slug}`);

// Remove a category
export const removeCategory = async (slug, authtoken) => {
    return await axios.delete(
        `${process.env.REACT_APP_API_URL}/category/${slug}`,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// Update a category
export const updateCategory = async (slug, category, authtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API_URL}/category/${slug}`,
        category,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// Create a category
export const createCategory = async (category, authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/category`,
        category,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// Get a sub categories
export const getSubCategories = async (_id) =>
    await axios.get(
        `${process.env.REACT_APP_API_URL}/category/sub-categories/${_id}`
    );
