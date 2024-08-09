import { PrismaClient } from "@prisma/client";

import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  add,
} from "date-fns";

const prisma = new PrismaClient();

// Utility function to format dates for Prisma
const formatDate = (date) => {
  return date.toISOString();
};

export const getAdminSMS = () => {};
export const getUserSMS = () => {};
export const getDailyReport = async (req, res) => {
  try {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    let userId = req.params.id; // Get userId from route parameters
    userId = userId ? parseInt(userId) : undefined; // Convert to integer if present

    // Query to get transactions either for a specific user or all users if userId is undefined
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      include: {
        user: true, // Include user details in the result
      },
    });

    // Aggregate results by day and user
    let results = {};
    transactions.forEach((transaction) => {
      const day = transaction.createdAt.toISOString().split("T")[0];
      const userKey = `${transaction.userId}-${day}`;

      if (!results[userKey]) {
        results[userKey] = {
          userId: transaction.userId,
          username: transaction.user.username,
          fullname: transaction.user.fullname,
          phone: transaction.user.phone,
          litre: 0,
          price: 0,
          createdAt: day,
        };
      }
      results[userKey].litre += parseFloat(transaction.litre);
      results[userKey].price += transaction.price;
    });

    // Convert results object to array
    const fullInfo = Object.values(results);

    // Calculate total litres and price
    const totalLitre = transactions.reduce(
      (sum, cur) => sum + parseFloat(cur.litre),
      0
    );
    const totalPrice = transactions.reduce((sum, cur) => sum + cur.price, 0);

    // Format totals as specified
    const totals = [{ litre: totalLitre }, { price: totalPrice }];

    res.status(200).json({
      message: "success",
      fullInfo,
      totals,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily report", error });
  }
};

export const getWeeklyReport = async (req, res) => {
  try {
    const today = new Date();
    const start = startOfWeek(today);
    const end = endOfWeek(today);

    let userId = req.params.id; // Get userId from route parameters
    userId = userId ? parseInt(userId) : undefined; // Convert to integer if present

    // Query to get transactions either for a specific user or all users if userId is undefined
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      include: {
        user: true, // Include user details in the result
      },
    });

    // Aggregate results by day and user
    let results = {};
    transactions.forEach((transaction) => {
      const day = transaction.createdAt.toISOString().split("T")[0];
      const userKey = `${transaction.userId}-${day}`;

      if (!results[userKey]) {
        results[userKey] = {
          userId: transaction.userId,
          username: transaction.user.username,
          fullname: transaction.user.fullname,
          phone: transaction.user.phone,
          litre: 0,
          price: 0,
          createdAt: day,
        };
      }
      results[userKey].litre += parseFloat(transaction.litre);
      results[userKey].price += transaction.price;
    });

    // Convert results object to array
    const fullInfo = Object.values(results);

    // Calculate total litres and price
    const totalLitre = transactions.reduce(
      (sum, cur) => sum + parseFloat(cur.litre),
      0
    );
    const totalPrice = transactions.reduce((sum, cur) => sum + cur.price, 0);

    // Format totals as specified
    const totals = [{ litre: totalLitre }, { price: totalPrice }];

    res.status(200).json({
      message: "success",
      fullInfo,
      totals,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching weekly report", error });
  }
};

export const getMonthlyReport = async (req, res) => {
  try {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);

    let userId = req.params.id; // Get userId from route parameters
    userId = userId ? parseInt(userId) : undefined; // Convert to integer if present

    // Query to get transactions either for a specific user or all users if userId is undefined
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      include: {
        user: true, // Include user details in the result
      },
    });

    // Aggregate results by day and user
    let results = {};
    transactions.forEach((transaction) => {
      const day = transaction.createdAt.toISOString().split("T")[0];
      const userKey = `${transaction.userId}-${day}`;

      if (!results[userKey]) {
        results[userKey] = {
          userId: transaction.userId,
          username: transaction.user.username,
          fullname: transaction.user.fullname,
          phone: transaction.user.phone,
          litre: 0,
          price: 0,
          createdAt: day,
        };
      }
      results[userKey].litre += parseFloat(transaction.litre);
      results[userKey].price += transaction.price;
    });

    // Convert results object to array
    const fullInfo = Object.values(results);

    // Calculate total litres and price
    const totalLitre = transactions.reduce(
      (sum, cur) => sum + parseFloat(cur.litre),
      0
    );
    const totalPrice = transactions.reduce((sum, cur) => sum + cur.price, 0);

    // Format totals as specified
    const totals = [{ litre: totalLitre }, { price: totalPrice }];

    res.status(200).json({
      message: "success",
      fullInfo,
      totals,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly report", error });
  }
};

export const getCustomReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Parse the start and end dates and adjust for time zone if necessary
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);  // Set to end of the day

    // Retrieve transactions within the date range for users with userType 'user'
    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
        user: {
          userType: 'user'
        },
      },
      include: {
        user: true,  // Include user details
      },
    });

    // Group and sum transactions by day and userId
    const groupedResults = transactions.reduce((acc, cur) => {
      const day = cur.createdAt.toISOString().split('T')[0];
      const userKey = `${cur.userId}-${day}`;

      if (!acc[userKey]) {
        acc[userKey] = {
          userId: cur.userId,
          username: cur.user.username,
          fullname: cur.user.fullname,
          phone: cur.user.phone,
          litre: 0,
          price: 0,
          createdAt: day,
        };
      }
      acc[userKey].litre += parseFloat(cur.litre);
      acc[userKey].price += cur.price;
      return acc;
    }, {});

    const fullInfo = Object.values(groupedResults);

    // Compute overall totals
    const totalLitre = transactions.reduce((sum, cur) => sum + parseFloat(cur.litre), 0);
    const totalPrice = transactions.reduce((sum, cur) => sum + cur.price, 0);

    // Prepare the response
    const totals = [
      { litre: totalLitre },
      { price: totalPrice }
    ];

    res.status(200).json({
      success: "true",
      fullInfo,
      totals
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching custom report", error });
  }
};


export const getUserTransactionReport = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: parseInt(userId),
      },
    });

    res.status(200).json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user transaction report", error });
  }
};
