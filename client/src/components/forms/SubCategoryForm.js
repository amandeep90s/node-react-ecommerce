import React from "react";

const SubCategoryForm = ({ handleSubmit, name, setName, parent, loading }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Sub Category Name</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    required
                    autoFocus
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-raised"
                disabled={!name || name.length < 2 || !parent || loading}
            >
                Save
            </button>
        </form>
    );
};

export default SubCategoryForm;
