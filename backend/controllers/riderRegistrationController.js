import nodemailer from "nodemailer";

const riderRegistrationController = async (req, res) => {
  const {
    rider_name,
    email,
    phone,
    address,
    vehicle_type,
    vehicle_number,
    description,
    location,
  } = req.body;

  // Check if location exists and split it into latitude and longitude
  let latitude = null;
  let longitude = null;
  if (location) {
    const locationParts = location.split(",");
    latitude = locationParts[0];
    longitude = locationParts[1];
  }

  const userEmail = req.body.email;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "test423559@gmail.com",
      pass: "bknaqrqdyiewltem",
    },
  });

  // Create location text based on whether location is provided
  const locationText =
    latitude && longitude
      ? `Location: Latitude: ${latitude}, Longitude: ${longitude}`
      : "Location not provided";

  // Create email content
  const mailOptions = {
    from: userEmail,
    to: "test423559@gmail.com",
    subject: `Riders registration request`,
    text: `
            Rider Name: ${rider_name}
            Email: ${email}
            Phone: ${phone}
            Address: ${address}
            ${locationText}
            Description: ${description}
            Vehicles Type: ${vehicle_type}
            Vehicle Number: ${vehicle_number}
          `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "Restaurant details sent successfully!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error sending email" });
  }
};

export default riderRegistrationController;
