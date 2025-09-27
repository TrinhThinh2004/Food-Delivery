import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/food/list")
      .then((response) => setFoods(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteFood = (id) => {
    axios
      .delete(`http://localhost:4000/api/food/delete/${id}`)
      .then(() => {
        setFoods(foods.filter((food) => food._id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="manage-foods">
      <h1>Manage Foods</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td>{food.name}</td>
              <td>{food.descreption}</td>
              <td>${food.price}</td>
              <td>{food.category}</td>
              <td>
                <button onClick={() => deleteFood(food._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageFoods;
