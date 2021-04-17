import axios from "axios";

// Get all coupons
export const getCoupons = async () =>
    await axios.get(`${process.env.REACT_APP_API_URL}/coupons`);

// Create a coupon
export const createCoupon = async (coupon, authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/coupon`,
        { coupon },
        {
            headers: {
                authtoken,
            },
        }
    );
};

// Get a single category
export const getCoupon = async (couponId) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/coupon/${couponId}`);

// Remove a coupon
export const removeCoupon = async (couponId, authtoken) => {
    return await axios.delete(
        `${process.env.REACT_APP_API_URL}/coupon/${couponId}`,
        {
            headers: {
                authtoken,
            },
        }
    );
};

// Update a coupon
export const updatecoupon = async (couponId, coupon, authtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API_URL}/coupon/${couponId}`,
        { coupon },
        {
            headers: {
                authtoken,
            },
        }
    );
};
