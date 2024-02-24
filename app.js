#!/usr/bin/env node
const commander = require("commander");
const fs = require("fs");
const sendEmail = require("./services/sendEmail");
require("dotenv").config({ path: "./.env" });

// create new instance of commander
const program = new commander.Command();

program
	.option("-t, --to <to>", "recipient email address")
	.arguments("<files...>")
	.on("--help", () => {
		console.log("");
		console.log("Examples");
		console.log(
			"$ node-cli-share -t recipientemail@gmail.com file1.txt file2.txt"
		);
		console.log("");
	});

program.parse(process.argv);

const recipient = program._optionValues.to;
if (!recipient) {
	console.error("Recipient email is required");
	process.exit(1);
}

let files = [];
for (let file of program.args) {
	const fileContent = fs.readFileSync(file);
	files.push({ filename: file, content: fileContent });
}

const mailOptions = {
	recipient,
	files,
};

sendEmail(mailOptions)
	.then(() => {
		console.log(`File(s) sent successfully to ${recipient}`);
	})
	.catch((error) => {
		console.error("Error sending email", error);
	});
