import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <Link to={"/addproduct"} style={textDecoration= "none"}>
                    <div>
                        <p>Add Product</p>
                    </div>
                </Link>
            </div>
            <div className="sidebar-item">
                <Link to={"/listproduct"} style={textDecoration= "none"}>
                    <div>
                        <p>Product List</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;