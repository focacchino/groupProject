import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css'; // Import the CSS file for Sidebar component
import add_product_icon from '../../Assets/product_cart_icon.png';
import list_product_icon from '../../Assets/product_list_icon.png';

// Correct function declaration syntax
const Sidebar = () => {
    return (
        
            <div className="sidebar">
                <Link to={'/addproduct'} style={{textDecoration:"none"}}>
                    <div className="sidebar-item">
                        <img src={add_product_icon} alt="" />
                        <p>Add Product</p>
                    </div>
                </Link>
                <Link to={'/listproduct'} style={{textDecoration:"none"}}>
                    <div className="sidebar-items">
                        <img src={list_product_icon} alt="" />
                        <p>Product List</p>
                    </div>
                </Link>
            </div>
    );
}

export default Sidebar;
