import foodModel from "../models/foodModels.js";
import fs from "fs";

// add food-item

const addFood = async (req, res) => {
    let image_filename= `${req.file.filename}`
    const food = new foodModel({
        name: req.body.name,
        descreption: req.body.descreption,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save()
        res.status(200).json({ success:true,message: "Food added successfully" })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success:false,message: error.message })
        
    }
}
export { addFood }; 