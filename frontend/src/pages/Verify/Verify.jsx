import React,{useContext} from 'react'
import './Verify.css'
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url}=useContext(StoreContext)
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", {
            success,
            orderId,
        });
        const data = await response.data;
        if (data.success) {
            alert("Payment successful");
            navigate("/order");
        } else {
            alert("Payment failed");
            navigate("/");
        }
    };
    useEffect(() => {
        verifyPayment();
    }, []);
    return (
    <div className='verify'>
      <div className='spinner'>

      </div>
    </div>
  )
}

export default Verify
