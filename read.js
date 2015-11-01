#!/usr/bin/env node

var fs = require('fs'),
    inkjet = require("./inkjet.js"),
    captcha_reader = require("./lib.js");

inkjet.decode(fs.readFileSync(process.argv[process.argv.length-1]), (err, decoded) => {
	if(err) throw err;

	var result = captcha_reader.recognize(decoded.data);
	console.log(result.text + " " + result.prob.toFixed(4));
});
