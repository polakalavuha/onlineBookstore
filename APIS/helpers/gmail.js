
const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})
exports.sendMail = (user, subject, text,) => {
    this.transporter.sendMail({
        from: "bookswagonmail@gmail.com",
        to: user.email,
        subject,
        text
    })
}