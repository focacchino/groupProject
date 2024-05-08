import React, { useContext } from 'react'
import './Cartitems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import { ShopContext } from '../../Context/ShopContext';
const Cartitems = () => {
    const {getTotalCartAmount,all_product,Cartitems,removefromCart} = useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(Cartitems[e.id]>0)
            {
                return <div>
                <div className="cartitems-format carticon-format-main">
                    <img src="" alt={e.image} className='carticon-product-icon' />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className='cartitems-quantity'>{Cartitems[e.id]}</button>
                    <p>${e.new_price*Cartitems[e.id]}</p>
                    <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removefromCart(e.id)}} alt="" />
                </div>
                <hr />
            </div>
            }
            return null;

        }) }
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>SubTotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>Proceed to Checkout</button>
            </div>
        </div>
    

    </div>
  )
}

export default Cartitems