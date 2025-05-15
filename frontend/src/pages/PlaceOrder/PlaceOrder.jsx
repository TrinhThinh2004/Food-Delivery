import React, { useContext,useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";
const PlaceOrder = () => {
  const navigate = useNavigate();
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
  const [data,setData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler = (event) => {
    const name=event.target.name;
    const value= event.target.value;
    setData(data=>({...data,[name]:value}))
  };
  const placeOrder = async (event) => {
  event.preventDefault();
  let orderItems = [];
  food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      orderItems.push({
        ...item,
        quantity: cartItems[item._id]
      });
    }
  });
  let orderData = {
    address: data,
    items: orderItems,
    amount: getTotalCartAmount() + 2,
  };
  let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
  if (response.data.success) {
    window.location.replace(response.data.session_url);
  } else {
    alert("Something went wrong");
  }
};
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
      
        <p className='title'>Delivery Infomation</p>
        <div className="multi-fields">
          <input required  name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required  name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required  name='email' onChange={onChangeHandler} value={data.email} type="Email" placeholder='Email address' />
        <input required  name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required  name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required  name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required  name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required  name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone number' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delevery Free</p>
              <p>$2</p>
              </div>  
              <hr />
            <div className="cart-total-details">
              <p className='cart-total-sumary'>Total</p>
              <p className='cart-total-sumary'>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
              </div>
              <hr />    
          </div>  
          <button type='submit' > PROCEED TO PAYMENT</button>        
        </div>
      </div>
     
    </form>
  )
}

export default PlaceOrder
