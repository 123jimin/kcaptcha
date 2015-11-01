const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ";

var fs = require('fs'),
    convnet = require("./convnet.js");

var segments = [
	41, 60, 90, 115, 137, 165
].map(x => x-24);

var net = new convnet.Net();
var data = JSON.parse(fs.readFileSync("./net.json", 'utf-8'));
net.fromJSON(data);

var split = (img_data, ind) => {
	var i, j;
	var vol = new convnet.Vol(48, 48, 1, 0.0);
	for(j=0; j<48; j++) for(i=0; i<48; i++){
		vol.set(i, j, 0, img_data[((j+1)*200+i+segments[ind])<<2]/255. - .5);
	}

	return vol;
};

var recognize = img_data => [0, 1, 2, 3, 4, 5].map(ind => split(img_data, ind)).map(vol => net.forward(vol).w);

var analyze = data => {
	var text = "";
	var prob = 0;
	data.forEach(arr => {
		var i, max_i = 0;
		for(i=1; i<arr.length; i++) if(arr[i] > arr[max_i]) max_i = i;
		text += ALPHABET[max_i];
		prob += Math.log(arr[max_i]);
	});
	return {'text': text, 'prob': Math.exp(prob)};
};

module.exports = {
	'ALPHABET': ALPHABET,
	'recognize': img_data => analyze(recognize(img_data))
};
