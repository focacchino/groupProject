import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css'; // Import the CSS file for Sidebar component


// Correct function declaration syntax
const Sidebar = () => {
    return (
        
            <div className="sidebar">
                <Link to={'/admin/addproduct'} style={{textDecoration:"none"}}>
                    <div className="sidebar-item">
                        <p>Add Product</p>
                    </div>
                </Link>
                <Link to={'/admin/listproduct'} style={{textDecoration:"none"}}>
                    <div className="sidebar-items">
                        <p>Product List</p>
                    </div>
                </Link>
            </div>
    );
}

export default Sidebar;
