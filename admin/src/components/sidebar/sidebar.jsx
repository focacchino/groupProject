import React from "react";
import { Link } from "react-router-dom";
import './sidebar.css'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <Link to={"/addproduct"} style={textDecoration= "none"}>
                    <img src={add_product_icon} alt="" />
                    <div>
                        <p>Add Product</p>
                    </div>
                </Link>
            </div>
            <div className="sidebar-item">
                <Link to={"/listproduct"} style={textDecoration= "none"}>
                    <img src={list_product_icon} alt="" />
                    <div>
                        <p>Product List</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;