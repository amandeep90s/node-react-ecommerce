import React from "react";
import AdminNav from "../../../components/nav/AdminNav";

const CategoryCreate = () => {
    return (
        <div className="container-fluid py-2">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Admin Category Page</h4>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
