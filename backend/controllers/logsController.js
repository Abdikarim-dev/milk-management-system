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

export const getLogsReport = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch users first
    const allUsers = await prisma.user.findMany();

    const logs = await prisma.logs.findMany({
      where: username
        ? {
            user: {
              username: username,
            },
          }
        : {},
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map the result to include username from allUsers array
    const fullInfo = logs.map((log) => {
      const user = allUsers.find((user) => user.id === log.userId);
      return {
        userId: log.userId,
        username: user ? user.username : "Unknown",
        fullname: user ? user.fullname : "Unknown",
        phone: user ? user.phone : "unknown",
        type: log.type,
        note: log.note,
        createdAt: log.createdAt,
      };
    });

    res.status(200).json({ message: "success", logs: fullInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily report", error });
  }
};
export const getDailyLogs = async (req, res) => {
  const today = new Date();
  const start = startOfDay(today);
  const end = endOfDay(today);

  const { username } = req.params;
  try {
    const logs = await prisma.logs.findMany({
      where: {
        createdAt: {
          gte: add(start, { hours: 3 }),
          lte: add(end, { hours: 3 }),
        },
        ...(username && {
          user: {
            username: username,
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const allUsers = await prisma.user.findMany();

    // Map the result to include username from allUsers array
    const fullInfo = logs.map((log) => {
      const user = allUsers.find((user) => user.id === log.userId);
      return {
        userId: log.userId,
        username: user ? user.username : "Unknown",
        fullname: user ? user.fullname : "Unknown",
        phone: user ? user.phone : "unknown",
        type: log.type,
        note: log.note,
        createdAt: log.createdAt,
      };
    });

    res.status(200).json({ message: "success", logs: fullInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily report", error });
  }
};
export const getWeeklyLogs = async (req, res) => {
  const today = new Date();
  const start = startOfWeek(today);
  const end = endOfWeek(today);

  const { username } = req.params;
  try {
    const logs = await prisma.logs.findMany({
      where: {
        createdAt: {
          gte: add(start, { hours: 3 }),
          lte: add(end, { hours: 3 }),
        },
        ...(username && {
          user: {
            username: username,
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const allUsers = await prisma.user.findMany();

    // Map the result to include username from allUsers array
    const fullInfo = logs.map((log) => {
      const user = allUsers.find((user) => user.id === log.userId);
      return {
        userId: log.userId,
        username: user ? user.username : "Unknown",
        fullname: user ? user.fullname : "Unknown",
        phone: user ? user.phone : "unknown",
        type: log.type,
        note: log.note,
        createdAt: log.createdAt,
      };
    });

    res.status(200).json({ message: "success", logs: fullInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily report", error });
  }
};
export const getMonthlyLogs = async (req, res) => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);

  const { username } = req.params;

  try {
    const logs = await prisma.logs.findMany({
      where: {
        createdAt: {
          gte: add(start, { hours: 3 }),
          lte: add(end, { hours: 3 }),
        },
        ...(username && {
          user: {
            username: username,
          },
        }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const allUsers = await prisma.user.findMany();

    // Map the result to include username from allUsers array
    const fullInfo = logs.map((log) => {
      const user = allUsers.find((user) => user.id === log.userId);
      return {
        userId: log.userId,
        username: user ? user.username : "Unknown",
        fullname: user ? user.fullname : "Unknown",
        phone: user ? user.phone : "unknown",
        type: log.type,
        note: log.note,
        createdAt: log.createdAt,
      };
    });

    res.status(200).json({ message: "success", logs: fullInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily report", error });
  }
};
