import React from "react";

const ProductCreateForm = ({ handleSubmit, handleChange, values }) => {
    const {
        title,
        description,
        price,
        categories,
        category,
        // sub_categories,
        shipping,
        quantity,
        // images,
        colors,
        color,
        brands,
        brand,
    } = values;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    name="price"
                    id="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="shipping">Shipping</label>
                <select
                    name="shipping"
                    id="shipping"
                    className="form-control"
                    onChange={handleChange}
                    value={shipping}>
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="color">Color</label>
                <select
                    name="color"
                    id="color"
                    className="form-control"
                    onChange={handleChange}
                    value={color}>
                    <option value="">Please Select</option>
                    {colors.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <select
                    name="brand"
                    id="brand"
                    className="form-control"
                    onChange={handleChange}
                    value={brand}>
                    <option value="">Please Select</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    className="form-control"
                    onChange={handleChange}
                    value={category}
                    required>
                    <option value="">Please select</option>
                    {categories.length > 0 &&
                        categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary btn-raised">
                Save
            </button>
        </form>
    );
};

export default ProductCreateForm;
