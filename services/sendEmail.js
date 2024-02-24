const nodeMailer = require("nodemailer");

module.exports = async (options) => {
	const transporter = nodeMailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	});

  await transporter.sendMail({
		from: `CLIShare<${process.env.MAIL_FROM}>`,
		to: options.recipient,
		subject: "Files shared via CLIShare",
		text: "Here are the files shared with you via CLIShare",
		attachments: options.files,
  });
};
