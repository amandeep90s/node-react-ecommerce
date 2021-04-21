import axios from "axios";

// Get all customer orders
export const getOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/admin/orders`, {
        headers: {
            authtoken,
        },
    });

// Update order status
export const changeStatus = async (orderId, orderStatus, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/order-status`,
        { orderId, orderStatus },
        {
            headers: {
                authtoken,
            },
        }
    );
