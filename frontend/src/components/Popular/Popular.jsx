import React from "react";
import './Popular.css'
import data_product from "../Assets/data";
import Item from "../item/item";
const Popular = () => {
    return (
        <div className="popular">
         <h1>POPULAR IN WOMEN</h1>
         <hr/>
         <div className="popular-item">'
           {data_product.map((Item,i)=>{
            return <Item key={i} id={Item.id} name={Item.name} image={Item.id.image} new_price={Item.new_price} old_price={Item.old_price}/>
           })}
         </div>
        </div>
    )
}

export default Popular