import React from "react";
import ModalImage from "react-modal-image";
import Laptop from "../../images/laptop.png";

const ProductCardInCheckout = ({ product }) => {
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
                <td>{product.color}</td>
                <td>{product.count}</td>
                <td>Shipping icon</td>
                <td>Delete icon</td>
            </tr>
        </tbody>
    );
};

export default ProductCardInCheckout;
