
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var checkout = require('./db/db.js')

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/data', (req, res) => {
  console.log(req.body)
  res.status(201).send(req.body)
})

let port = 8080;

app.listen(port, function() {
  console.log(`Server Connexion Established, listening on http://localhost:${port}`);
});
