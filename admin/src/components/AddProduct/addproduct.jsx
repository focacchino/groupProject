import React from 'react';
import './AddProduct.css';

const AddProduct = () => {
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>
                Product Title
            </p>
            <input type="text" name='name' placeholder='title' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>
                    Price
                </p>
                <input type="number" name='old_price' placeholder='price'/>
            </div>
            <div className="addproduct-itemfield">
                <p>
                    Offer Price
                </p>
                <input type="number" name='new_price' placeholder='price'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select name='category' className='addproduct-selector'>
                <option value='women'>Women</option>
                <option value='men'>Men</option>
                <option value='kids'>Kids</option>
                <label htmlFor='file-input'>
                    <img src={} className='addproduct-thumbnail-img'/>
                </label>
                <input type='file' id='file-input' name='image' hidden />
            </select>
        </div>
        <button className='addproduct-btn'>ADD</button>
    </div>
}