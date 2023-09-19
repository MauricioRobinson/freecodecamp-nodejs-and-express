require('dotenv').config();
let express = require('express');
console.log('Hello World');
let app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  // res.send("Hello Express")
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function (req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({ message: 'HELLO JSON' });
  } else {
    res.json({ message: 'Hello json' });
  }
});

module.exports = app;
