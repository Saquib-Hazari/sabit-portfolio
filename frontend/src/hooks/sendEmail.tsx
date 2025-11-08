import { sendEmail } from "../../../backend/src/utils/sendEmail";
import type { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, category, country, comment } = req.body;

    console.log("📨 Received contact form submission:", {
      email,
      category,
      country,
    });

    // Validate required fields
    if (!email || !comment) {
      return res.status(400).json({ error: "Email and comment are required" });
    }

    // Create the email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3182CE;">📧 New Portfolio Contact</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <p><strong>📧 Email:</strong> ${email}</p>
          <p><strong>📁 Category:</strong> ${category || "Not specified"}</p>
          <p><strong>🌍 Country:</strong> ${country || "Not specified"}</p>
          <p><strong>💬 Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3182CE;">
            ${comment.replace(/\n/g, "<br>")}
          </div>
        </div>
        <p style="color: #666; margin-top: 20px;">
          Sent from your portfolio contact form • ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    // Send the email
    await sendEmail(
      "saquibhazari1000@gmail.com", // Your email to receive contacts
      `New Contact from ${email}`,
      emailHtml
    );

    console.log("✅ Contact form email sent successfully");
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("❌ API route error:", error);
    res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
}
