import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from 'crypto'; // Ensure you have this if you need it for signature

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    const esewa_url = "https://esewa.com.np/epay/main"; // eSewa payment URL

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const totalAmount = req.body.amount + 2; // Adjust if necessary
        const esewaParams = new URLSearchParams({
            tAmt: totalAmount,    // Total amount
            amt: totalAmount,      // Amount to be paid
            txAmt: totalAmount,    // Transaction amount
            psc: '0',              // Payment Service Charge
            pdc: '1',              // Required parameter
            txId: newOrder._id,    // Ensure this is unique
            su: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Success URL
            fu: `${frontend_url}/verify?success=false&orderId=${newOrder._id}` // Failure URL
        });
        
        // eSewa payment URL
        const sessionUrl = `${esewa_url}?${esewaParams.toString()}`;
        res.json({ success: true, session_url: sessionUrl });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export const Signature = (message) => {
    const secretKey = "8gBm/:&EnhH.1/q";
    const hmac = crypto.createHmac("sha256", secretKey);
    const hashInBased64 = hmac.digest("base64"); // Fix typo from "based64" to "base64"
    return hashInBased64;
};

export { placeOrder };
