import { PrismaClient } from "@prisma/client";
import { add, endOfDay, startOfDay } from "date-fns";
import {
  SMS_API_PASSWORD,
  SMS_API_URL,
  SMS_API_USERNAME,
} from "../config/config.js";
import axios from "axios";

const prisma = new PrismaClient();

export const sendSms = async (recipient, message) => {
  try {
    const response = await axios.get(
      `${SMS_API_URL}?user=${SMS_API_USERNAME}&pass=${SMS_API_PASSWORD}&cont=${message}&rec=${recipient}`
    );

    return response.data;
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

export const getDailySMS = async (req, res) => {
  try {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    const allUsers = await prisma.user.findMany();

    const result = await prisma.$queryRaw`
        SELECT 
          userId, 
          DATE(createdAt) as day, 
          SUM(litre) as totalLitre, 
          SUM(price) as totalPrice 
        FROM transaction 
        WHERE createdAt BETWEEN ${add(start, { hours: 3 })} AND ${add(end, {
      hours: 3,
    })}
          AND userId IN (SELECT id FROM user WHERE userType = 'user')
        GROUP BY userId, DATE(createdAt)
      `;

    // Calculate total price and litre for all users
    const totals = await prisma.$queryRaw`
        SELECT 
          SUM(litre) as totalLitre, 
          SUM(price) as totalPrice 
        FROM transaction 
        WHERE createdAt BETWEEN ${add(start, { hours: 3 })} AND ${add(end, {
      hours: 3,
    })}
          AND userId IN (SELECT id FROM user WHERE userType = 'user')
      `;

    // Map the result to include username from allUsers array
    const fullInfo = result.map((transaction) => {
      const user = allUsers.find((user) => user.id === transaction.userId);
      return {
        userId: transaction.userId,
        fullname: user ? user.fullname : "Unknown",
        phone: user ? user.phone : "unknown",
        litre: Number(transaction.totalLitre) * 0.001,
        price: transaction.totalPrice,
        createdAt: transaction.day,
      };
    });

    let tableText = "------------- Report ------------ ";
    // tableText += " Name | Litre | Price ";

    fullInfo.forEach((info) => {
      tableText += `(${info.phone}) | ${info.litre} Ltrs | $${info.price}`;
      tableText += "    ";
    });

    const phoneNo = "";
    // Send SMS
    const data = await sendSms("617710604", tableText);

    console.log(tableText);

    res.status(200).json({
      message: "success",
      SMS_Response: data,
      tableText,
      //   totals: [
      //     { litre: Number(totals[0].totalLitre) },
      //     { price: totals[0].totalPrice },
      //   ],
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching daily report", error: error.message });
  }
};
