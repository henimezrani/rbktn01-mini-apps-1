var express = require("express");
var bodyParser = require('body-parser');
var $ = require("jquery");

var PORT = process.env.PORT || 8080
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/client'));

app.get("/", (req, res) => {
  res.render('index');
});

app.post("/data", (req, res) => {
	var data = JSON.parse(req.body.JSONdata)
	var convertedData = convertJSONtoCSV(data);
	res.send(convertedData)
});

app.listen(PORT, () => {
  console.log(`running on: http://localhost:${PORT}`);
});

function convertJSONtoCSV(JSONObject){
	var ArrayData = retrieveData(JSONObject);
	for (var i = 0 ; i < ArrayData.length ; i++) {
		ArrayData[i] = ArrayData[i].join(',')
	}
	return ArrayData.join('\n')

	function retrieveData(JSONObject, result, firstTime) {
		var firstTime = firstTime || 0; 
		var result = result || []
		var tmpArr = [];
		if (firstTime === 0) {
			var keysArr = [];
			for (var key in JSONObject) {
				if (key !== 'children') {
					keysArr.push(key)
				}
			}
			result.push(keysArr)
		}

		for (var key in JSONObject) {
			if (key !== 'children'){
				tmpArr.push(JSONObject[key])
			} else {
				result.push(tmpArr)
				for (var i = 0 ; i < JSONObject.children.length ; i++) {
					retrieveData(JSONObject.children[i], result, 1)
				}
				
			}
		}
		return result;
	}
}