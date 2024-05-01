import React, { useState, createContext, useEffect,Component } from 'react';
import all_product from '../components/Assets/all_product'
   



export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart ={};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
        }
        return cart;
}
const ShopContextProvider = (props)=>{

    

    const [all_product,setAll_product] = useState([]);
    const [cartItems,setCartItems] = useState(getDefaultCart());
    

    

    useEffect(() => {
        fetch('https://localhost:4000/allproducts')
        .then((response) => response.json())
        .then((data) => response.setAll_product(data))

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcartitems',{
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: "",
            }).then((res) => res.json()).then((data) => {
                console.log(data);
                setCartItems(data);
            })
        }
    },[]);
    
    

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]: prev[itemId]+1}));
        if (localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({
                    'itemId': itemId
                })
            }).then((res) => res.json()).then((data) => {
                console.log(data);
                console.log(cartItems);
            })
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]: prev[itemId]-1}));
        if (localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                },
                body: JSON.stringify({
                    'itemId': itemId
                })
            }).then((res) => res.json()).then((data) => {
                console.log(data);
            })
        }
    }
    const getTotalCartAmount =( ) =>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0)
            {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }
    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
    const contextValue ={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
return(
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
)
}

export default ShopContextProvider;