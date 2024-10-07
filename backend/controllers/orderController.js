import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from 'crypto'; 

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    const esewa_url = "https://esewa.com.np/epay/main"; 
    const serviceCode = "EPAYTEST"; 
    const productId = "EPAYTEST";

    try {
        const totalAmount = req.body.amount + 2; 
        const transactionAmount = req.body.amount; 

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: totalAmount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create the signature
        const signature = Signature(
            `total_amount=${totalAmount},transaction_uuid=${newOrder._id},product_code=${serviceCode}`
        );

        // Prepare eSewa parameters
        const esewaParams = new URLSearchParams({
            amt: transactionAmount,
            txAmt: transactionAmount,
            tAmt: totalAmount,
            psc: '0',
            pdc: '1',
            product_code: serviceCode,        
            pid: productId,                  
            signature: signature,
            txId: newOrder._id,
            scd: serviceCode,
            su: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            fu: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        // Create the session URL for eSewa
        const sessionUrl = `${esewa_url}?${esewaParams.toString()}`;
        res.json({ success: true, session_url: sessionUrl });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const Signature = (message) => {
    const secretKey = "8gBm/:&EnhH.1/q"; 
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(message); 
    return hmac.digest("base64");
};

export { placeOrder };
