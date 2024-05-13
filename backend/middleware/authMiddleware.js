import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(403).send({
      success: false,
      message: "Access Denied Please Login!",
    });
  try {
    const decoded = jwt.verify(token,JWT_SECRET)

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send({
      success: false,
      message: "Access Denied Please Login!",
    });
  }
};

export const authUser = async (req,res,next)=>{
    const {role} = req.params;
    if(role==='admin'){
        next();
    }else{
        res.status(401).send({
            success:false,
            message:"Admin's can only access this route"
        })
    }
}
