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

export const getDailyReport = async (req, res) => {
  try {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: add(start, { hours: 3 }),
          lte: add(end, { hours: 3 }),
        },
      },
    });

    const result = await prisma.transaction.groupBy({
      by: ["userId"],

      where: {
        user: {
          userType: "user",
        },
        createdAt: {
          gte: add(start, { hours: 3 }),
          lte: add(end, { hours: 3 }),
        },
      },
      _sum: {
        litre: true,
        price: true,
      },
    });
    const allUsers = await prisma.user.findMany();

    // Map the result to include username from allUsers array
    const fullInfo = result.map((transaction) => {
      const user = allUsers.find((user) => user.id === transaction.userId);
      return {
        userId: transaction.userId,
        username: user ? user.username : "Unknown",
        fullname: user ? user.fullname : "Unknown",
        litre: transaction._sum.litre,
        price: transaction._sum.price,
      };
    });

    res.status(200).json({ message: "success", transactions, fullInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily report", error });
  }
};

export const getWeeklyReport = async (req, res) => {
  try {
    const today = new Date();
    const start = startOfWeek(today);
    const end = endOfWeek(today);

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: add(start, { hours: 3 }),
          lte: add(end, { hours: 3 }),
        },
      },
    });

    const result = await prisma.transaction.groupBy({
      by: ["userId"],

      where: {
        user: {
          userType: "user",
        },
        createdAt: {
          gte: add(start, { hours: 3 }),
          lte: add(end, { hours: 3 }),
        },
      },
      _sum: {
        litre: true,
        price: true,
      },
    });

    const allUsers = await prisma.user.findMany();

    // Map the result to include username from allUsers array
    const fullInfo = result.map((transaction) => {
      const user = allUsers.find((user) => user.id === transaction.userId);
      return {
        userId: transaction.userId,
        username: user ? user.username : "Unknown",
        fullname: user ? user.fullname : "Unknown",
        litre: transaction._sum.litre,
        price: transaction._sum.price,
      };
    });

    res.status(200).json({ message: "success", transactions, fullInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching weekly report", error });
  }
};

export const getMonthlyReport = async (req, res) => {
  try {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: add(start, { hours: 3 }),
          lte: add(end, { hours: 3 }),
        },
      },
    });

    const result = await prisma.transaction.groupBy({
      by: ["userId"],

      where: {
        user: {
          userType: "user",
        },
        createdAt: {
          gte: add(start, { hours: 3 }),
          lte: add(end, { hours: 3 }),
        },
      },
      _sum: {
        litre: true,
        price: true,
      },
    });

    const allUsers = await prisma.user.findMany();

    // Map the result to include username from allUsers array
    const fullInfo = result.map((transaction) => {
      const user = allUsers.find((user) => user.id === transaction.userId);
      return {
        userId: transaction.userId,
        username: user ? user.username : "Unknown",
        fullname: user ? user.fullname : "Unknown",
        litre: transaction._sum.litre,
        price: transaction._sum.price,
      };
    });

    res.status(200).json({ message: "success", transactions, fullInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly report", error });
  }
};

export const getCustomReport = async (req, res) => {
  try {
    console.log("HERE")
    const { startDate, endDate } = req.body;
    console.log(startDate)
    console.log(endDate)
    const start = new Date(startDate);
    const end = new Date(endDate);

    

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    const result = await prisma.transaction.groupBy({
      by: ["userId"],

      where: {
        user: {
          userType: "user",
        },
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      _sum: {
        litre: true,
        price: true,
      },
    });

    const allUsers = await prisma.user.findMany();

    // Map the result to include username from allUsers array
    const fullInfo = result.map((transaction) => {
      const user = allUsers.find((user) => user.id === transaction.userId);
      return {
        userId: transaction.userId,
        username: user ? user.username : "Unknown",
        fullname: user ? user.fullname : "Unknown",
        litre: transaction._sum.litre,
        price: transaction._sum.price,
      };
    });

    res.status(200).json({ message: "success", transactions, fullInfo });
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
