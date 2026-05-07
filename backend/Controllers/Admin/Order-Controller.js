const order = require("../../Models/Order.js");

const createOrder = async (req, res) => {
  try {
    const { cartItems, orderType, paymentMethod, totalAmount } = req.body;

    if (orderType === "POS") {
      if (req.user.role !== "cashier") {
        return res.status(403).json({
          success: false,
          message: "Only cashier can create POS orders.",
        });
      }
    }

    if (orderType === "ONLINE") {
      if (req.user.role !== "user") {
        return res.status(403).json({
          success: false,
          message: "Only user can create ONLINE orders",
        });
      }
    }

    const newOrder = new order({
      userId: req.user.id,
      orderType,
      cartItems,
      paymentMethod,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      data: newOrder,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "You got an error...",
    });
  }
};

// to get the order details for users
const fetchAllTheOrdersForUsers = async (req, res) => {
  try {
    // get all the orders...
    const getOrders = await order.find({});

    // if no order is not found...
    if (!getOrders.length) {
      return res.status(404).json({
        success: false,
        message: "No order found...",
      });
    }

    // successfully fetch the orders...
    res.status(200).json({
      success: true,
      data: getOrders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "got some error",
    });
  }
};

// to get the order details for admin
const fetchAllTheOrdersForAdmin = async (req, res) => {
  try {
    // get the id from query param
    const { id } = req.params;

    const fetchOrderDetailsAdmin = await order.findById(id);

    if (!fetchOrderDetailsAdmin) {
      return res.status(404).json({
        success: false,
        message: "No Order found",
      });
    }

    res.status(200).json({
      success: true,
      data: fetchOrderDetailsAdmin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "got some error...",
    });
  }
};

// update the order details

const updateTheOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const findOrder = await order.findById(id);

    if (!findOrder) {
      return res.status(404).json({
        success: false,
        message: "No order found...",
      });
    }

    await order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "order status updated successfully...",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "You got an error...",
    });
  }
};

// to delete the order successfully...
const deleteTheOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteOrders = await order.findByIdAndDelete(id);

    if (!deleteOrders) {
      return res.status(404).json({
        success: false,
        message: "No Order found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "You got some error...",
    });
  }
};

module.exports = {
  fetchAllTheOrdersForUsers,
  fetchAllTheOrdersForAdmin,
  updateTheOrderDetails,
  deleteTheOrderDetails,
};
