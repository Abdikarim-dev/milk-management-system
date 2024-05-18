import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const authenticate = async (req, res, next) => {
  console.log("Authorization Header:", req.headers.cookie);
  if (!req.headers.cookie) {
    return res.status(401).send({ message: "No authorization token provided" });
  }

  const token = req.headers.cookie.split("=")[1]; // Ensure 'Bearer ' prefix is correctly handled
  try {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token verification failed:", err);
        return res.status(403).send({ message: "Invalid or Expired Token" });
      }
      req.user = decoded;
      req.body.userId = decoded._id;
      next();
    });
  } catch (error) {
    console.log("Error in token extraction:", error);
    res.status(500).send({ message: "Invalid or Expired Token" });
  }
};
// export const authenticate = async (req, res, next) => {
//   console.log("Authorization Header:", req.headers.cookie);
//   if (!req.headers.authorization) {
//     return res.status(401).send({ message: "No authorization token provided" });
//   }

//   const token = req.headers.authorization.split(" ")[1]; // Ensure 'Bearer ' prefix is correctly handled
//   try {
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         console.log("Token verification failed:", err);
//         return res.status(403).send({ message: "Invalid or Expired Token" });
//       }
//       req.user = decoded;
//       req.body.userId = decoded._id;
//       next();
//     });
//   } catch (error) {
//     console.log("Error in token extraction:", error);
//     res.status(500).send({ message: "Invalid or Expired Token" });
//   }
// };


export const authUser = async (req, res, next) => {
  const { role } = req.params;
  if (role === "user") {
    next();
  } else {
    res.status(401).send({
      success: false,
      message: "Admin's can only access this route",
    });
  }
};
