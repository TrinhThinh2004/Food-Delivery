import React from 'react'
import "./SidebarAD.css"
import {assetsAD} from "../../../admin_assets/assetsAD.js"
import { NavLink } from 'react-router-dom'
const SidebarAD = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='add' className="sidebar-option">
          <img src={assetsAD.add_icon}/>
          <p>Add Items</p>
        </NavLink>
        <NavLink to='list' className="sidebar-option">
          <img src={assetsAD.order_icon}/>
          <p>List Items</p>
        </NavLink>
        <NavLink to='orders' className="sidebar-option">
          <img src={assetsAD.order_icon}/>
          <p>Orders</p>
        </NavLink>
        <NavLink to='chat' className="sidebar-option">
          <img src={assetsAD.chat_icon}/>
          <p>Chat</p>
        </NavLink>
      </div>      
    </div>
  )
}

export default SidebarAD