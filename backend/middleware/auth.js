import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const {token}= req.headers;
    if (!token) {
        return res.status(401).json({success:false, message: 'No token provided' });
    }
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decoded.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false, message: 'Invalid token' });

    }
}
export default authMiddleware;