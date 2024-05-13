const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res) {

  const query = req.body.cityName;
  const apiKey = "05ce09665ccafc3f82f99ef02f4a9181";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apiKey+ "&units=metric"
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const url1 = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
      res.write("<p>The wearher is currently " +weatherDescription+ ".</p>");
      res.write("<h1>The temperature in "+query+" is " + temp + " degrees.</h1>");
      res.write("<img src=" +url1+" >");
      res.send();
    })
  })
})


app.listen(3000, function() {
  console.log("Server is running")
})
