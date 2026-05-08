const order = require("../../Models/Order.js");

const createOrder = async (req, res) => {
  try {
    const { cartItems, orderType, paymentMethod, totalAmount } = req.body;


    // if the cartItems is not there or cartItems length length is 0 
    if(!cartItems || cartItems.length === 0){
      return res.status(400).json({
        success: false,
        message: 'Cart can not be empty'
      })
    }

    
    // if the order type is pos and the role is not cashier 
    if (orderType === "POS") {
      if (req.user.role !== "cashier"  && req.user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Only cashier can create POS orders.",
        });
      }
    }

   

    // create the new order
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
    const getOrders = await order.find({
      userId: req.user.id
    });

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
const fetchSingleOrdersForAdmin = async (req, res) => {
  try {
    // get the id from query param
    const { id } = req.params;

    const fetchOrderDetailsForAdmin = await order.findById(id);

    if (!fetchOrderDetailsForAdmin) {
      return res.status(404).json({
        success: false,
        message: "No Order found",
      });
    }

    res.status(200).json({
      success: true,
      data: fetchOrderDetailsForAdmin,
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

    await order.findByIdAndUpdate(id, { orderStatus },{new: true});

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
  createOrder,
  fetchAllTheOrdersForUsers,
  fetchSingleOrdersForAdmin,
  updateTheOrderDetails,
  deleteTheOrderDetails,
};



