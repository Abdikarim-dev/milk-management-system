import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import cloudinary from "../config/cloudinary.js";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
export const addUser = async (req, res) => {
  try {
    // Extract password and other data from request body
    const { userId, password, email, phone, image, username, ...otherData } =
      req.body;

    const isEmailOrUserExist = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });
    const isPhoneExist = await prisma.user.findFirst({
      where: {
        phone: phone,
      },
    });
    if (isPhoneExist?.phone === phone)
      return res.status(200).send({
        success: false,
        message: "Phone Number already exists!",
      });
    if (isEmailOrUserExist?.username === username)
      return res.status(200).send({
        success: false,
        message: "Username already exists!",
      });

    if (isEmailOrUserExist?.email === email)
      return res.status(200).send({
        success: false,
        message: "Email already exists!",
      });

    let result;

    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
    }

    // Hash password
    const saltRounds = 10; // You can adjust the salt rounds based on your security requirement
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const addUser = await prisma.user.create({
      data: {
        ...otherData,
        username,
        email,
        phone,
        password: hashedPassword, // Use the hashed password instead of the plain one
        image: result?.url,
      },
    });

    // Send response (excluding password from the response)
    const { password: _, ...userData } = addUser;
    return res.status(200).send({
      success: true,
      image: result?.url,
      message: "User Registered Successfully!",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "An error occured : " + error.message,
    });
  }
};
export const activeUser = async (req, res) => {
  try {
    // Extract password and other data from request body
    const { id, role } = req.body;
    const request = req.body;
    console.log(request);
    const user = await prisma.activeUser.create({
      data: {
        id: 1,
        userId: parseInt(id),
        role: role,
      },
    });

    return res.status(200).send({
      success: true,
      message: "Active user added Successfully!",
      data: user,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "An error occured : " + error.message,
    });
  }
};
export const deleteActiveUser = async (req, res) => {
  try {
    const user = await prisma.activeUser.deleteMany();

    return res.status(200).send({
      success: true,
      message: "Active user added Successfully!",
      data: user,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "An error occured : " + error.message,
    });
  }
};

export const addManyUsers = async (req, res) => {
  try {
    const addedUsers = await prisma.user.createMany({
      data: req.body,
    });
    res.status(200).send({
      success: true,
      message: "Registered Users Successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error.message,
    });
  }
};
export const editUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Extract password and other data from request body
    const { password, email, username, userId, image, ...otherData } = req.body;

    const isEmailOrUserExist = await prisma.user.findFirst({
      where: {
        AND: [
          {
            OR: [{ email: email }, { username: username }],
          },
          {
            NOT: {
              id: parseInt(id), // Exclude the current user from the check
            },
          },
        ],
      },
    });
    if (isEmailOrUserExist && isEmailOrUserExist.username === username)
      return res.status(200).send({
        success: false,
        message: "Username already exists!",
      });

    if (isEmailOrUserExist && isEmailOrUserExist.email === email)
      return res.status(200).send({
        success: false,
        message: "Email already exists!",
      });

    let result;

    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
    }

    let updatedData = {
      ...otherData,
      username,
      email,
      image: result?.url,
    };

    if (password) {
      // Hash password
      const saltRounds = 10; // You can adjust the salt rounds based on your security requirement
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updatedData.password = hashedPassword;
    }
    const editUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    res.status(200).send({
      success: true,
      message: "User Updated Successfully!",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
      data: error.message,
    });
  }
};
export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.transaction.deleteMany({ where: { userId: parseInt(id) } });
    await prisma.logs.deleteMany({ where: { userId: parseInt(id) } });
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(200).send({
      success: true,
      message: "User & its transactions Has been deleted successfully!",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsernameExist = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (isUsernameExist) {
      if (
        isUsernameExist.status === "inActive" ||
        isUsernameExist.status === "suspended"
      ) {
        if (isUsernameExist.status === "inActive")
          return res.status(200).send({
            success: false,
            message:
              "You're temporarily in Active, please contact your superior!",
          });
        else
          return res.status(200).send({
            success: false,
            message: "You're suspended, please contact your superior!",
          });
      } else {
        const passwordMatched = await bcrypt.compare(
          password,
          isUsernameExist.password
        );

        if (passwordMatched) {
          const dataToBeSendToFrontend = {
            _id: isUsernameExist.id,
          };
          const expiresIn = 7 * 24 * 60 * 60;
          const token = jwt.sign(dataToBeSendToFrontend, JWT_SECRET, {
            expiresIn,
          });

          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: expiresIn * 1000,
          });

          isUsernameExist.password = undefined;

          res.status(200).send({
            success: true,
            username: isUsernameExist,
            expiresIn,
            token,
          });
        } else {
          return res.status(200).send({
            success: false,
            message: "Incorrect Password, Please try again!",
          });
        }
      }
    } else {
      return res.status(200).send({
        success: false,
        message: "Username is not exist!, please create an account!",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured at login controller : " + error,
    });
  }
};

export const getActiveUser = (req, res) => {};

// export const getUserInfo = async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: req.body.userId,
//       },
//     });
//     user.password = "";
//     if (user) {
//       res.send({
//         success: true,
//         message: "User Info Fetched Successfully.",
//         data: user,
//       });
//     } else {
//       res.send({
//         success: false,
//         message: "User does not exists.",
//         data: null,
//       });
//     }
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       data: error,
//       message: error.message,
//     });
//   }
// };

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;

    const { userId, oldPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatched) {
      return res.status(400).send({
        success: false,
        message: "Please enter your old password correctly!",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const updatePassword = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).send({
      success: true,
      message: "Password Has Been Changed Successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: req.body.userId,
      },
    });

    res.status(200).send({
      success: true,
      data: userInfo,
      message: "User Fetched Successfully!",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      data: error,
      message: error.message,
    });
  }
};
