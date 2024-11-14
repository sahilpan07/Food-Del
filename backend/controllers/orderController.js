import completeOrderModel from "../models/completeOrderModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order form frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 150 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") { 
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//user order for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    req.json({success:false,message:"Error"})
    
  }
}

//find all orders of all user for admin
const listOrders = async (req,res) =>{
  try {
    const orders = await orderModel.find({});
    const count = await orderModel.countDocuments(); 

    res.json({success:true,data:orders,count})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

//api for updating status
const updateStatus = async (req, res) => {
  try {
    const order = await orderModel.findById(req.body.orderId);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (req.body.status === "Delivered") {
      // Update status to "Delivered" in the original order
      order.status = "Delivered";
      await order.save();

      res.json({ success: true, message: "Status updated to Delivered. Will remove order after 2 minutes." });

      // Wait for 2 minutes (120,000 milliseconds) before transferring to completeOrderModel
      setTimeout(async () => {
        try {
          // Copy the order data to the completed order model, including updated "Delivered" status
          const completedOrder = new completeOrderModel(order.toObject());
          await completedOrder.save();

          // Delete the order from orderModel
          await orderModel.findByIdAndDelete(req.body.orderId);
          console.log("Order moved to completeOrderModel and removed from orderModel");
        } catch (error) {
          console.error("Error transferring order to completeOrderModel:", error);
        }
      }, 120000); // 2-minute delay
    } else {
      // Just update the status if it's not "Delivered"
      await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
      res.json({ success: true, message: "Status Updated" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in updating status" });
  }
};


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };