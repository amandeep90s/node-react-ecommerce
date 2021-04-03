import React from "react";
import AdminNav from "../../components/nav/AdminNav";

const AdminDashboard = () => {
    return (
        <div className="container-fluid py-2">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Admin Dashboard</h4>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
