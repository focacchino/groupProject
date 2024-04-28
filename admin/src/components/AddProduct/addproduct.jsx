import React from 'react';
import { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {

    const [image,setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({
           ...productDetails,
            [e.target.name]: e.target.value,
        });
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append("product", image);

        await fetch('http://localhost:4000/upload', {
            method: "POST",
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data})

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success?alert('Successfully added'):alert('Failed to add product');
                console.log(data);
            })
        }
    }

    

    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>
                Product Title
            </p>
            <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='title' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>
                    Price
                </p>
                <input value={productDetails.old_price} onChange={changeHandler} type="number" name='old_price' placeholder='price'/>
            </div>
            <div className="addproduct-itemfield">
                <p>
                    Offer Price
                </p>
                <input type="number" value={productDetails.new_price} onChange={changeHandler}  name='new_price' placeholder='price'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select name='category' value={productDetails.category} onChange={changeHandler}  className='addproduct-selector'>
                <option value='women'>Women</option>
                <option value='men'>Men</option>
                <option value='kids'>Kids</option>
                <label htmlFor='file-input'>
                    <img src={image?URL.createObjectURL(image): upload_area} className='addproduct-thumbnail-img'/>
                </label>
                <input onChange={imageHandler} type='file' id='file-input' name='image' hidden />
            </select>
        </div>
        <button onClick= {() => {Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
}

export default AddProduct;