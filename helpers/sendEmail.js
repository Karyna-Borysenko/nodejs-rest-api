const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_LOGIN, META_PASSWORD } = process.env;

const sendEmail = async (email) => {
  const transport = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: META_LOGIN,
      pass: META_PASSWORD,
    },
  });

  await transport.sendMail({ ...email, from: META_LOGIN });
};

module.exports = {
  sendEmail,
};
