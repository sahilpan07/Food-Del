import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from 'crypto'; 

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    const esewa_url = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"; 
    const serviceCode = "EPAYTEST"; 

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
            amount: transactionAmount,
            failure_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            product_delivery_charge: '1',
            product_service_charge: '0',
            product_code: "EPAY",                  
            signature: signature,
            signed_field_name: "total_amount,transaction_uuid,product_code",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            tax_amount: '0',
            total_amount: totalAmount,
            txId: newOrder._id,
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
