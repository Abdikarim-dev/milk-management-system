import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTransactionsByUsers = async (req, res) => {
  try {
    const allTransactionsByUser = await prisma.transaction.findMany({
      include: {
        user: true, // Include user data
      },
      where: {
        user: {
          id: parseInt(req.params.id),
        },
      },
    });

    // Map over the transactions to include the user's name at the top level
    const transactionsWithUserName = allTransactionsByUser.map(
      (transaction) => ({
        ...transaction,
        userName: transaction.user.name, // Assuming 'name' is the field you want
      })
    );

    res.status(200).send(transactionsWithUserName);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occurred: " + error,
    });
  }
};

export const getTransactionsByUser = async (req, res) => {
  try {
    const allTransactionsByUser = await prisma.transaction.findMany({
      where: {
        user: {
          id: parseInt(req.params.id),
        },
      },
      include: {
        user: true,
      },
    });
    res.status(200).send({
      success: true,
      message: "All User Transactions fetched successfully",
      data: allTransactionsByUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
export const getTransactions = async (req, res) => {
  try {
    const allTransactions = await prisma.transaction.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).send(allTransactions);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
export const addTransaction = async (req, res) => {
  try {
    const { userId, litre, price, milkTankId } = req.body;
    const milkTank = await prisma.milkTank.findUnique({
      where: {
        id: parseInt(milkTankId),
      },
    });

    if (!milkTank)
      return res.status(400).send({
        success: false,
        message: "Milk Tank Is Empty!",
      });

    if (milkTank.quantity < litre)
      return res.status(400).send({
        success: false,
        message: "Not enough milk in the tank!",
      });
    const transaction = await prisma.transaction.create({
      data: {
        litre: parseFloat(litre),
        price: parseFloat(price),
        // user: { connect: { id: parseInt(userId) } },
        // milkTank: { connect: { id: parseInt(milkTankId) } },
        userId,
        milkTankId,
      },
    });

    const logs = await prisma.logs.create({
      data: {
        type: "Transaction Type",
        note: `Added Transaction With of (${parseFloat(litre) * 0.001}) Litre. `,
        userId: userId,
      },
    });
    // (
    //   insert into logs("Transaction Type","Added Transaction With of (Litre)","Active User's Id")
    // )
    await prisma.milkTank.update({
      where: { id: milkTankId },
      data: { quantity: milkTank.quantity - litre },
    });
    res.status(200).send({
      success: true,
      message: "Transaction Completed Successfully",
      logs: logs,
    });
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "An error occured : " + error.message,
    });
  }
};
export const addManyTransactions = async (req, res) => {
  try {
    const addedTransactions = await prisma.transaction.createMany({
      data: req.body,
    });
    res.status(200).send(addedTransactions);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error.message,
    });
  }
};
export const editTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const editTransaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(200).send({
      success: true,
      message: "Transaction edited successfully...",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
export const removeTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const removeTransaction = await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).send(removeTransaction);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};

export async function getEachTransactionsUser(req, res) {
  try {
    const result = await prisma.transaction.groupBy({
      by: ["userId"],

      where: {
        user: {
          userType: "user",
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
    res.status(200).send({
      success: true,
      message: fullInfo,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to fetch aggregated data:",
      error,
    });
  }
}

export const getActiveUserTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.groupBy({
      by: ["userId"],

      where: {
        user: {
          userType: "user",
          id: req.body.userId,
        },
      },
      _sum: {
        litre: true,
        price: true,
      },
      _count: {
        userId: true,
      },
    });
    res.status(200).send({
      success: true,
      message: "User's transaction fetched successfully!",
      data: transactions,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
// export const getActiveUserTransactions = async (req, res) => {
//   try {

//     const transactions = await prisma.transaction.groupBy({
//       by: ["userId"],

//       where: {
//         user: {
//           userType: "user",
//         },
//       },
//       _sum: {
//         litre: true,
//         price: true,
//       },
//       _count:{
//         userId:true
//       }
//     });
//     res.status(200).send({
//       success:true,
//       message:"User's transaction fetched successfully!",
//       data:transactions
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: "An error occured : " + error,
//     });
//   }
// };

// Utility function to format date to YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

// Utility function to get the last N days
const getLastNDays = (n) => {
  const dates = [];
  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
};

// Utility function to get last 7 days with day names
const getLast7DaysWithNames = () => {
  const days = [];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push({ date: formatDate(date), name: dayNames[date.getDay()] });
  }
  return days;
};

// Utility function to group transactions
const groupTransactions = (transactions, dates) => {
  const groupedData = dates.reduce((acc, date) => {
    acc[date] = { date, noOfTransactions: 0 };
    return acc;
  }, {});

  transactions.forEach((transaction) => {
    const date = formatDate(transaction.createdAt);
    if (groupedData[date]) {
      groupedData[date].noOfTransactions += 1;
    }
  });

  return Object.values(groupedData);
};

export const transactionsByDays = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: true,
      },
    });

    // Grouping transactions by user and date
    const groupedData = transactions.reduce((acc, transaction) => {
      const date = transaction.createdAt.toISOString().split("T")[0];
      const userKey = `${transaction.user.fullname}_${date}`;

      if (!acc[userKey]) {
        acc[userKey] = {
          fullname: transaction.user.fullname,
          date: date,
          noOfTransactions: 0,
        };
      }
      acc[userKey].noOfTransactions += 1;
      return acc;
    }, {});

    const result = Object.values(groupedData);

    res.status(200).send({
      success: true,
      message: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
export const transactionsByDaily = async (req, res) => {
  try {
    const today = formatDate(new Date());
    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: new Date(today + "T00:00:00.000Z"),
          lt: new Date(today + "T23:59:59.999Z"),
        },
      },
      include: {
        user: true,
      },
    });

    const result = transactions.reduce((acc, transaction) => {
      const username = transaction.user.fullname;
      const id = transaction.user.id;
      const litre = transaction.litre;
      const price = transaction.price;
      if (!acc[username]) {
        acc[username] = {
          id,
          username,
          litre: 0,
          price: 0,
          noOfTransactions: 0,
          date: today,
        };
      }
      acc[username].litre += parseFloat(litre);
      acc[username].price += price;
      acc[username].noOfTransactions += 1;
      return acc;
    }, {});

    res.status(200).send({
      success: true,
      message: Object.values(result),
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
export const transactionsByWeekly = async (req, res) => {
  try {
    const last7Days = getLast7DaysWithNames();
    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: new Date(last7Days[6].date + "T00:00:00.000Z"),
        },
        userId: parseInt(req.params.id),
      },
      include: {
        user: true,
      },
    });

    const groupedData = last7Days.reduce((acc, { date, name }) => {
      acc[date] = { date, name, noOfTransactions: 0 };
      return acc;
    }, {});

    transactions.forEach((transaction) => {
      const date = formatDate(transaction.createdAt);
      if (groupedData[date]) {
        groupedData[date].noOfTransactions += 1;
      }
    });

    res.status(200).send({
      success: true,
      message: groupedData,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
export const transactionsByMonthly = async (req, res) => {
  try {
    const last30Days = getLastNDays(30);
    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: new Date(last30Days[29] + "T00:00:00.000Z"),
        },
        userId: parseInt(req.params.id),
      },
      include: {
        user: true,
      },
    });

    const groupedData = groupTransactions(transactions, last30Days);

    res.status(200).send({
      success: true,
      message: groupedData,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "An error occured : " + error,
    });
  }
};
