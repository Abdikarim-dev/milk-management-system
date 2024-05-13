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
    res.status(200).send(allTransactionsByUser);
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
    const addTransaction = await prisma.transaction.create({
      data: req.body,
    });
    res.status(200).send(addTransaction);
  } catch (error) {
    res.status(400).send({
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
    res.status(200).send(editTransaction);
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
      by: ["userId"] , 
      
      where:{
        user:{
          userType:"user"
        }
      },
      _sum: {
        litre: true,
        price: true,
      },
    });
    const allUsers = await prisma.user.findMany();

    // const fullInfo = [];
    // const mapUsers = result.map((user)=>{
    //   const temp = allUsers.find(index => true && index.id ==user.userId)
    //   return temp

    // })

    // Map the result to include username from allUsers array
    const fullInfo = result.map(transaction => {
      const user = allUsers.find(user => user.id === transaction.userId);
      return {
        userId: transaction.userId,
        username: user ? user.username : "Unknown",
        fullname: user ? user.fullname : "Unknown",
        litre: transaction._sum.litre,
        price: transaction._sum.price
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
