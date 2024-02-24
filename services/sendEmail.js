const nodeMailer = require("nodemailer");

module.exports = async (options) => {
	const transporter = nodeMailer.createTransport({
		service: "gmail",
		auth: {
			user: "2001sandeepsharma2001@gmail.com",
			pass: "ppdxazsmfzmaemon",
		},
	});

	await transporter.sendMail({
		from: `CLISend<2001sandeepsharma2001@gmail.com>`,
		to: options.recipient,
		subject: "Files shared via CLISend",
		text: "Here are the files shared with you via CLISend",
		attachments: options.files,
	});
};
