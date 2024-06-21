const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			service: "gmail",
			port: Number(587),
			secure: Boolean(true),
			auth: {
				user: "jarunee.recc2@gmail.com",
				pass: "qhmudyxtbzczejwi",
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};