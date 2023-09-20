require('dotenv').config();
let express = require('express');
const { loggerMiddleware, timeMiddleware } = require('./middlewares');
console.log('Hello World');
let app = express();

app.use('/public', express.static(__dirname + '/public'));

app.use(loggerMiddleware);

app.get('/', function (req, res) {
  // res.send("Hello Express")
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function (req, res) {
  let obj = {
    message: 'Hello json',
  };

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json(obj.message.toUpperCase());
  } else {
    res.json(obj.message);
  }
});

app.get('/now', timeMiddleware, function (req, res) {
  res.json({ time: req.time });
});

module.exports = app;
