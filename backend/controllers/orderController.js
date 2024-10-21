import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from 'crypto'; 

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    //const esewa_url = "https://uat.esewa.com.np/epay/main"; 
    const esewa_url = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"; 
    const serviceCode = "EPAYTEST";

    try {
        const totalAmount = req.body.amount; 
        const transactionAmount = req.body.amount; 

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: totalAmount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const signature = createSignature(
            `total_amount=${totalAmount},transaction_uuid=${newOrder._id},product_code=${serviceCode}`
        );

        // Prepare the eSewa parameters
        const esewaParams = {
            amount: transactionAmount,
            failure_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            product_delivery_charge: '1',
            product_service_charge: '0',
            product_code: "EPAYTEST",
            signature: signature,
            signed_field_name: "total_amount,transaction_uuid,product_code",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            tax_amount: '0',
            total_amount: totalAmount,
            txId: newOrder._id,
        };

        res.json({ success: true, esewaParams, esewa_url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
};

// Function to create the signature for eSewa
const createSignature = (message) => {
    const secretKey = process.env.ESEWA_SECRET;
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(message);
    return hmac.digest("base64");
};

export { placeOrder };
