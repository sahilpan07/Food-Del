// chatbotController.js
export const getBotResponse = (req, res) => {
    const userMessage = req.body.message.toLowerCase(); // Get message from request body and convert to lowercase

    let botResponse = "I'm here to help! Please provide more details about your issue.";
  
    // Define responses based on specific help topics
    if (userMessage === "order status") {
      botResponse = "To check your order status, please go to 'My Orders' in your profile or provide us with your order ID.";
    } else if (userMessage === "refund") {
      botResponse = "For refunds, please visit our Refund Policy page or contact support with your order details.";
    } else if (userMessage === "delivery time") {
      botResponse = "Delivery times vary by location. Please check the estimated delivery time on the order confirmation page.";
    } else if (userMessage === "payment issue") {
      botResponse = "If you're experiencing payment issues, please try a different payment method or contact our support team.";
    } else if (userMessage === "account problem") {
      botResponse = "For account-related issues, go to 'Account Settings' in your profile or contact us for assistance.";
    }
  
    // Send response
    res.json({ response: botResponse });
  };
  