const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("contact.ejs");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.USER_EMAIL,
    subject: `Message from ${req.body.name} (${req.body.email}): ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
