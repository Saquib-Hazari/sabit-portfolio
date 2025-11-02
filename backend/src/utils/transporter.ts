import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "724234093d7a7f",
    pass: "749251c02e2670",
  },
});

export default transport;
