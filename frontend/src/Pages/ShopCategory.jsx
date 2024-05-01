import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../components/Assets/dropdown_icon.png'
import Item from '../components/Item/Item'

const ShopCategory = (props) => {

    const [all_product,setAll_product] = useState([]);
    const [cartItems,setCartItems] = useState(useDefaultCart());

    const contextValue = {all_product};

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
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
        <div className="shopcateory-products">
        {all_product.map((item,i)=>{
            if (props.category===item.category){
               return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{
                return null;
            }
        })}
        </div>
        <div className="shopcategory-loadmore">
            Explore More!
        </div>
    </div>
    )
}

export default ShopCategory;