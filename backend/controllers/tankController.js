import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addTank = async (req, res) => {
  try {
    const { userId, ...otherData } = req.body;
    const tank = await prisma.milkTank.create({
      data: otherData,
    });

    res.status(200).send({
      success: true,
      message: "Filled the milk tank successfully!",
      data: tank,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error occurred at the add milk tank controller: " + error.message,
    });
  }
};

const editTank = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, limit, desc, refill } = req.body;

    const tankId = parseInt(id);

    if (isNaN(tankId)) {
      return res.status(400).send({ success: false, message: "Invalid tank ID" });
    }

    const findTank = await prisma.milkTank.findUnique({ where: { id: tankId } });

    if (!findTank) {
      return res.status(404).send({ success: false, message: "Tank not found" });
    }

    const updatedData = { quantity: findTank.quantity };

    if (quantity !== undefined) {
      const newQuantity = refill
        ? parseFloat(findTank.quantity) + parseFloat(quantity)
        : parseFloat(quantity);

      if (newQuantity > parseFloat(findTank.limit)) {
        return res.status(400).send({
          success: false,
          message: "Quantity exceeds tank storage limit",
        });
      }

      updatedData.quantity = newQuantity;
    }

    if (limit !== undefined) updatedData.limit = parseFloat(limit);
    if (desc) updatedData.desc = desc;

    const editTank = await prisma.milkTank.update({
      where: { id: tankId },
      data: updatedData,
    });

    res.status(200).send({
      success: true,
      message: "Tank value updated successfully!",
      data: editTank,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error occurred at edit tank controller: ${error.message}`,
    });
  }
};
const removeTank = async (req, res) => {
  try {
    const { id } = req.params;
    const tankId = parseInt(id);

    if (isNaN(tankId)) {
      return res.status(400).send({ success: false, message: "Invalid tank ID" });
    }

    const deleteTank = await prisma.milkTank.delete({
      where: { id: tankId },
    });

    res.status(200).send({
      success: true,
      message: "Tank has been deleted successfully",
      data: deleteTank,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error occurred at deleting tank controller: " + error.message,
    });
  }
};

const getTanks = async (req, res) => {
  try {
    const tanks = await prisma.milkTank.findMany();

    res.status(200).send({
      success: true,
      message: "Tanks have been fetched successfully",
      data: tanks,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error occurred at fetching tanks controller: " + error.message,
    });
  }
};

export { addTank, editTank, removeTank, getTanks };
