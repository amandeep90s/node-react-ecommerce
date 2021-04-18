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
