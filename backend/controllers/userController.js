import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
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
    const { password, email, username, ...otherData } = req.body;

    const isUsernameExist = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (isUsernameExist)
      return res.status(200).send({
        success: false,
        message: "Username already exists!",
      });
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (isEmailExist)
      return res.status(200).send({
        success: false,
        message: "Email already exists!",
      });

    // Hash password
    const saltRounds = 10; // You can adjust the salt rounds based on your security requirement
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const addUser = await prisma.user.create({
      data: {
        ...otherData,
        username,
        email,
        password: hashedPassword, // Use the hashed password instead of the plain one
      },
    });

    // Send response (excluding password from the response)
    const { password: _, ...userData } = addUser;
    res.status(200).send({
      success:true,
      message:"User Registered Successfully!"
    });
  } catch (error) {
    res.status(400).send({
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
      success:true,
      message:'Registered Users Successfully'
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

    const editUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(200).send(editUser);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const removeUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).send(removeUser);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const isUsernameExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!isUsernameExist)
    return res.status(200).send({
      success: false,
      message: "Username is not exist!, please create an account!",
    });
  else {
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

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: expiresIn * 1000,
      });

      isUsernameExist.password = undefined;

      res.status(200).send({
        success: true,
        username:isUsernameExist,
        expiresIn,
        token
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "Incorrect Password, Please try again!",
      });
    }
  }
};
