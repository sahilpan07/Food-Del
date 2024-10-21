import nodemailer from "nodemailer";


const contactController = async (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    contact_email,
    address,
    subject,
    message,
    
  } = req.body;
const userEmail = req.body.email;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "test423559@gmail.com",
      pass: "bknaqrqdyiewltem",
    },
  });

  const mailOptions = {
    from: userEmail,
    to: "test423559@gmail.com",
    subject: `New message from ${first_name} ${last_name}: ${subject}`,
    text: `
            Name: ${first_name} ${last_name}
            Email: ${contact_email}
            Phone: ${phone}
            Address: ${address}
            Message: ${message}
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

export default contactController;
