import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const addToCart= (itemId) => {
        if(!cartItems[itemId]){
            setCartItems(prev=>({...prev, [itemId]: 1}))
        }
        else{
            setCartItems(prev=>({...prev, [itemId]: prev[itemId]+1}))
        }
    }
    const removeFromCart = (itemId) => {
        if(cartItems[itemId] === 1){
            const newCartItems = {...cartItems}
            delete newCartItems[itemId]
            setCartItems(newCartItems)
        }
        else{
            setCartItems(prev=>({...prev, [itemId]: prev[itemId]-1}))
        }
    }
    const removeAll= (itemId) => {
        const newCartItems = {...cartItems}
        delete newCartItems[itemId]
        setCartItems(newCartItems)
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount; 
    };
    const getFoodList = async () => {
        try {
            const response = await axios.get(url+"/api/food/list")
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };
    useEffect(() => {
        
        async function loadData(){
            await getFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        removeAll,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;