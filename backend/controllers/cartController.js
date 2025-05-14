import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
 try{
  let userData = await userModel.findById(req.userId);
  let cartData = await userData.cartData;
  if(!cartData[req.body.itemId]){
    cartData[req.body.itemId] = 1;
  }
  else{
    cartData[req.body.itemId] += 1;
  }
  await userModel.findByIdAndUpdate(req.userId,{cartData});
  res.status(200).json({success:true, message: 'Item added to cart successfully' });
 }catch(error){
  console.log(error);
  return res.status(500).json({success:false, message: 'Internal server error' });
 }
}
const removeFromCart = async (req, res) => {
  try{
    let userData = await userModel.findById(req.userId);
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId]>0){
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.userId,{cartData});
    res.status(200).json({success:true, message: 'Item removed from cart successfully' });

  }catch(error){
    console.log(error);
    return res.status(500).json({success:false, message: 'Internal server error' });
  }
}
const removeAll = async (req, res) => {
  try{
    let userData = await userModel.findById(req.userId);
    let cartData = await userData.cartData;
     delete cartData[req.body.itemId];
    await userModel.findByIdAndUpdate(req.userId,{cartData});
    res.status(200).json({success:true, message: 'Item removed from cart successfully' });
  }catch(error){
    console.log(error);
    return res.status(500).json({success:false, message: 'Internal server error' });
  }
}
const getCart = async (req, res) => {
  try{
    let userData = await userModel.findById(req.userId);
    let cartData = await userData.cartData;
    res.status(200).json({success:true, cartData });
  }catch(error){
    console.log(error);
    return res.status(500).json({success:false, message: 'Internal server error' });
  }
}
export { addToCart, removeFromCart, getCart, removeAll };