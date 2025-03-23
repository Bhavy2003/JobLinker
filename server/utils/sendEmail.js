 import nodemailer from 'nodemailer';



export const sendEmail = async (options) => {
    if (!options.email) {
        throw new Error("Recipient email is missing!");
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,  // Your Gmail address
            pass: process.env.EMAIL_PASSWORD,  // Your App Password
        },
    });

    const mailOptions = {
        from: `"JobLinker" <${process.env.SMTP_EMAIL}>`,
        to: options.email,  // Make sure this is properly passed!
        subject: options.subject || "No Subject",
        html: options.message || "No Message",
    };

    await transporter.sendMail(mailOptions);
};
 


