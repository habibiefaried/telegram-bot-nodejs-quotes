var Bot = require('node-telegram-bot');
var fs = require('fs');

var arrayNama = fs.readFileSync('listNama').toString().split("\n");
var arrayQuotes = fs.readFileSync('listQuote').toString().split("\n");
//console.log(Math.floor(Math.random() * arrayNama.length) + 0);

var lastNamaIdx = 0;
var lastQuotesIdx = 0;

var bot = new Bot({
  token:'122071015:AAGIEunI5-CD9ynsUZzhXocBn5LDns_n_RI'
})
.on('message', function (message) {
  console.log(message);
  var t = message.text;
  if (t == "/arcquotes")
	sendMsg(message.chat.id, generateMessage());
})
.start();

function generateMessage(){
	var generatedMsg = "";
	var strNama = ""; var strQuotes = "";
	var idxNama = 0; var idxQuotes = 0;
	while ((strNama == "") || (idxNama == lastNamaIdx)) {
		idxNama = (Math.floor(Math.random() * arrayNama.length) + 0);
		strNama = arrayNama[idxNama];
	}
	lastNamaIdx = idxNama;

	while ((strQuotes == "") || (idxQuotes == lastQuotesIdx)) {
		idxQuotes = (Math.floor(Math.random() * arrayNama.length) + 0);
		strQuotes = arrayQuotes[idxQuotes];
	}
	lastQuotesIdx = idxQuotes;

	generatedMsg = strNama + " berkata bahwa " + strQuotes;
	return generatedMsg;
}

function sendMsg(id_sender,pesan) {
  bot.sendMessage({
	chat_id: id_sender,
        text: pesan,
  }, function (err, msg) {
     console.log(err);
     console.log(msg);
  });
}
