$('#submit').click(function (e) {
  console.log('here')
  e.preventDefault();

  var JSONtext = $("#JSONtext").val();
  var JSONfileElem = document.getElementById('JSONfile');

  if(JSONtext !== '') { // there is text, handle it
    $.post("http://localhost:8080/data", {
      JSONdata: JSONtext
    })
  } else if (JSONfileElem.files.length !== 0) { // there is a file, handle it
    
    var reader = new FileReader();
    reader.onload = (e) => {
      var JSONfile = e.target.result;
      $.post("http://localhost:8080/data", {
        JSONdata: JSONfile
      }).done((data) => {
        $('body').append(renderResult(data));
      })
    };
    reader.readAsText(JSONfileElem.files[0]);
  } else {
    alert('please enter a text or choose a file')
  }
});

function renderResult(data) {

  var statsDiv = document.createElement("DIV");
  var nameDiv = document.createElement("H2");
  var dataDiv = document.createElement("P");
  nameDiv.innerHTML = "Converted File"
  dataDiv.innerHTML = data
  statsDiv.appendChild(nameDiv);
  statsDiv.appendChild(dataDiv);

  return statsDiv
}
