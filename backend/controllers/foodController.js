import foodModel from "../models/foodModels.js";
import fs from "fs";

// add food-item

const addFood = async (req, res) => {
    let image_filename= `${req.file.filename}`
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
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
// all food-items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.status(200).json({ success:true,data:foods })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success:false,message: error.message })
        
    }
}
// delete food-item
const deleteFood = async (req, res) => {
    try {
        const food = await foodModel.findByIdAndDelete(req.params.id)
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" })
        }
        fs.unlinkSync(`uploads/${food.image}`)
        res.status(200).json({ success: true, message: "Food deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}
export { addFood,listFood,deleteFood }; 