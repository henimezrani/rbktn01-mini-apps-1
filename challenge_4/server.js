


var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './client/dist'));
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log("heeeeeeeeeeeeeeeeeeeeeeeeh")
})

let port = 8080;

app.listen(port, function() {
  console.log(`Server Connexion Established, listening on http://localhost:${port}`);
});

