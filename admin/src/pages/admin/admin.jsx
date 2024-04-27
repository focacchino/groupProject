import React from 'react';
import './admin.css';
import Sidebar from '../../components/sidebar/sidebar';
import { Route, Routes } from 'react-router-dom';

const Admin = () => { 
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/listproduct" element={<ListProduct />} />
            </Routes>
        </div>
    );
}

export default Admin;