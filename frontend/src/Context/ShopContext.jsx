import React, { useState, createContext } from 'react';
import all_product from "../components/Assets/all_product";
   



export const ShopContext = createContext(null);

const ShopContextProvider = (props)=>{

    const [all_product,setAll_product] = useState([]);
    
    const contextValue = {all_product};

return(
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
)
}

export default ShopContextProvider;