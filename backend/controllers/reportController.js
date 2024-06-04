import { PrismaClient } from "@prisma/client";

import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
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
          gte: start,
          lte: end,
        },
      },
    });

    res.status(200).json(transactions);
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
          gte: start,
          lte: end,
        },
      },
    });

    res.status(200).json(transactions);
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
          gte: start,
          lte: end,
        },
      },
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly report", error });
  }
};

export const getCustomReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const newStartDate = formatDate(start)
    const newEndDate = formatDate(end)
    console.log(newStartDate)
    console.log(newEndDate)

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: newStartDate,
          lte: newEndDate,
        },
      },
    });

    res.status(200).json(transactions);
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
