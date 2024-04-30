import React, { useState, createContext } from 'react';
import all_product from "../components/Assets/all_product";
   



export const ShopContext = createContext(null);

const ShopContextProvider = (props)=>{

    const [all_product,setAll_product] = useState([]);
    
    const contextValue = {all_product};

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
return(
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
)
}

export default ShopContextProvider;