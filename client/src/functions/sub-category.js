import axios from "axios";

// Get all sub categories
export const getSubCategories = async () =>
    await axios.get(`${process.env.REACT_APP_API_URL}/sub-categories`);

// Get a single sub category
export const getSubCategory = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/sub-category/${slug}`);

// Remove a sub category
export const removeSubCategory = async (slug, authtoken) => {
    return await axios.delete(
        `${process.env.REACT_APP_API_URL}/sub-category/${slug}`,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// Update a sub category
export const updateSubCategory = async (slug, subCategory, authtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API_URL}/sub-category/${slug}`,
        subCategory,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// Create a sub category
export const createSubCategory = async (subCategory, authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/sub-category`,
        subCategory,
        {
            headers: {
                authtoken,
            },
        }
    );
};
