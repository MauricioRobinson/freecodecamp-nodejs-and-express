require('dotenv').config();
let express = require('express');
const { loggerMiddleware, timeMiddleware } = require('./middlewares');
console.log('Hello World');
const bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
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

app.get('/:word/echo', function (req, res) {
  res.json({ echo: req.params.word });
});

app
  .get('/name', function (req, res) {
    res.send({ name: `${req.query.first} ${req.query.last}` });
  })
  .post('/name', function (req, res) {
    res.send({ name: `${req.body.first} ${req.body.last}` });
  });

module.exports = app;
