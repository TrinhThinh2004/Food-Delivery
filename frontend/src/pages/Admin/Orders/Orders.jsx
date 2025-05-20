import React,{useState} from 'react'
import "./Orders.css"
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { assetsAD } from '../../../admin_assets/assetsAD'
const Orders = ({url}) => {
  const [orders,setOrders]=useState([]);
  const fetchOrders = async () => {
   
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
  }
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className='order add'>
      <h3>Order page</h3>
      <div className='order-list'>
        {orders.map((order,index) => (
          <div className='order-item' key={index}>
  <img src={assetsAD.parcel_icon} alt="" />
  <p className='order-item-food'>
    {order.items.map((item, idx) =>
      idx === order.items.length - 1
        ? item.name + " x " + item.quantity
        : item.name + " x " + item.quantity + " , "
    )}
  </p>
  <div>
    <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}.</p>
    <div className='order-item-address'>
      <p>{order.address.street + ','}</p>
      <p>
        {order.address.city + ',' + order.address.state + ',' + order.address.country + ',' + order.address.zipCode}
      </p>
    </div>
    <p className='order-item-phone'>{order.address.phone}</p>
  </div>
  <p>Items: {order.items.length}</p>
  <select>
    <option value="Food Processing">Food Processing</option>
    <option value="Out for delivery">Out for delivery</option>
    <option value="Delivered">Delivered</option>
  </select>
</div>
        ))}
      </div>
    </div>
  )
}

export default Orders
