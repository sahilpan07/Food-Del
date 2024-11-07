    import nodemailer from "nodemailer";


    const restaurantRegistrationController = async (req, res) => {
        const {
          restaurant_name,
          owner_name,
          email,
          phone,
          address,
          location,
          description,
          license_number,
          tax_id,
          restaurant_type,
          operational_hours,
          website,
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
        const locationText = latitude && longitude
          ? `Location: Latitude: ${latitude}, Longitude: ${longitude}`
          : 'Location not provided';
      
        // Create email content
        const mailOptions = {
          from: userEmail,
          to: "test423559@gmail.com",
          subject: `New message from ${email}`,
          text: `
            Restaurant Name: ${restaurant_name}
            Owner's Name: ${owner_name}
            Email: ${email}
            Phone: ${phone}
            Address: ${address}
            ${locationText}
            Description: ${description}
            License Number: ${license_number}
            Tax ID: ${tax_id}
            Restaurant Type: ${restaurant_type}
            Operational Hours: ${operational_hours}
            Website: ${website}
          `,
        };
      
        try {
          await transporter.sendMail(mailOptions);
          return res
            .status(200)
            .json({ success: true, message: "Restaurant details sent successfully!" });
        } catch (error) {
          return res
            .status(500)
            .json({ success: false, message: "Error sending email" });
        }
      };
      
    export default restaurantRegistrationController;
