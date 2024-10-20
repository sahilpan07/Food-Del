import nodemailer from 'nodemailer';


const contactController = async (req, res) => {
    const { first_name, last_name, phone, address, subject, message } = req.body;
    const userEmail = req.body.userEmail; 

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "saanjeep16@gmail.com", 
            pass: 'pbnwbbowqfdgmskd', 
        },
    });

    const mailOptions = {
        from: userEmail, 
        to: 'saanjeep16@gmail.com', 
        subject: `New message from ${first_name} ${last_name}: ${subject}`,
        text: `
            Name: ${first_name} ${last_name}
            Email: ${userEmail}
            Phone: ${phone}
            Address: ${address}
            Message: ${message}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return res.status(200).json({ message: 'Email sent successfully' });
    }  catch (error) {
        console.error('Error sending email:', error.message);
        return res.status(500).json({ message: 'Error sending email', error: error.message });
    }
};

export default contactController;
