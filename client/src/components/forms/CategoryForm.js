import React from "react";

const CategoryForm = ({ handleSubmit, name, setName, loading }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    autoFocus
                    required
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-raised"
                disabled={!name || name.length < 2 || loading}>
                Save
            </button>
        </form>
    );
};

export default CategoryForm;
