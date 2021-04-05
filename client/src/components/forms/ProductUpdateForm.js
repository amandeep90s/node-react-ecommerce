import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductUpdateForm = ({
    handleSubmit,
    handleChange,
    handleCategoryChange,
    categories,
    setValues,
    values,
    subOptions,
}) => {
    const {
        title,
        description,
        price,
        category,
        sub_categories,
        shipping,
        quantity,
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
                    <option value="">Please Select</option>
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
                    onChange={handleCategoryChange}
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

            <div className="form-group">
                <label htmlFor="category">Sub Categories</label>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={sub_categories}
                    onChange={(value) =>
                        setValues({ ...values, sub_categories: value })
                    }>
                    {subOptions &&
                        subOptions.length > 0 &&
                        subOptions.map((s) => (
                            <Option key={s._id} value={s._id}>
                                {s.name}
                            </Option>
                        ))}
                </Select>
            </div>

            <button type="submit" className="btn btn-primary btn-raised">
                Save
            </button>
        </form>
    );
};

export default ProductUpdateForm;
