import React from "react";
import { useDispatch } from "react-redux";
import ModalImage from "react-modal-image";
import Laptop from "../../images/laptop.png";

const ProductCardInCheckout = ({ product }) => {
    const colors = ["Black", "Brown", "Silver", "White", "Blue"];

    const dispatch = useDispatch();

    const handleColorChange = (e) => {
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            cart.map((p, index) => {
                if (product._id === p._id) {
                    cart[index].color = e.target.value;
                }
                return cart;
            });

            localStorage.setItem("cart", JSON.stringify(cart));
            // update to redux
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", height: "auto" }}>
                        {product.images.length ? (
                            <ModalImage
                                small={product.images[0].url}
                                large={product.images[0].url}
                            />
                        ) : (
                            <img src={Laptop} alt="product" />
                        )}
                    </div>
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>
                    <select
                        onChange={handleColorChange}
                        name="color"
                        className="form-control"
                        value={product.color}
                    >
                        {colors.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </td>
                <td>{product.count}</td>
                <td>Shipping icon</td>
                <td>Delete icon</td>
            </tr>
        </tbody>
    );
};

export default ProductCardInCheckout;
