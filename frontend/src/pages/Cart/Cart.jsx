import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  
  
  const {cartItems,food_list,removeFromCart,getTotalCartAmount} = useContext(StoreContext);
  const navigate = useNavigate()
  return (
   
    <div className='cart'>
      <div className="carrt-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
             <div>
               <div className="cart-items-title cart-items-item" key={index}>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price*cartItems[item._id]}</p>
                <button className='cross' onClick={()=>removeFromCart(item._id)}>Remove</button>
              </div>
              <hr />
             </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
       <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Free</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
              </div>  
              <hr />
            <div className="cart-total-details">
              <p className='cart-total-sumary'>Total</p>
              <p className='cart-total-sumary'>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
              </div>
              <hr />    
          </div>  
          <button onClick={()=>navigate('/order')}> PROCEDD TO CHECKOUT</button>        
        </div>
        <div className="cart-promocode">
          <div>
            <p>if you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
