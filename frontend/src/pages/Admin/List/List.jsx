import React, { use } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
const List = ({ url }) => {
  const [list, setList] = React.useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  const removeFood = async (foodId) => {
    const response = await axios.delete(`${url}/api/food/delete/${foodId}`);
    if (response.data.success) {
      toast.success(response.data.message);
      fetchList();
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
      </div>
      {list.map((item, index) => {
        return (
          <div className="list-table-format" key={index}>
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
