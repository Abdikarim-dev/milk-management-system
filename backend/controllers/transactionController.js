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
        litre:parseFloat(litre),
        price:parseFloat(price),
        // user: { connect: { id: parseInt(userId) } },
        // milkTank: { connect: { id: parseInt(milkTankId) } },
        userId,
        milkTankId
      },
    });

    await prisma.milkTank.update({
      where:{id:milkTankId},
      data:{quantity:milkTank.quantity - litre}
    })
    res.status(200).send({
      success: true,
      message: "Transaction Completed Successfully",
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
