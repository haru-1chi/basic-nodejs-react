const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');
const { HOST, SERVICE, EMAIL_PORT, SECURE, USER, PASS } = require('../config/index');
module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: HOST,
			service: SERVICE,
			port: Number(EMAIL_PORT),
			secure: Boolean(SECURE),
			auth: {
				user: USER,
				pass: PASS,
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