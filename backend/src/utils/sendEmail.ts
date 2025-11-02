// utils/sendEmail.ts
import transport from "./transporter";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    console.log("📧 Starting email send to:", to);

    const mailOptions = {
      from: '"Your Portfolio" <saquibhazari1000@gmail.com>',
      to,
      subject,
      html,
    };

    console.log("📧 Mail options prepared");
    const result = await transport.sendMail(mailOptions);
    console.log("✅ Email sent successfully, Message ID:", result.messageId);

    return result;
  } catch (error: any) {
    console.error("❌ Email send failed:", error);
    console.error("❌ Email error details:", error.message);
    throw error; // Re-throw to see in main function
  }
};
