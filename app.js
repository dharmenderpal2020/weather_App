const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "95e3043c2152829e339c92e48e646bbc";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit +
    "";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const description = weatherData.weather[0].description;
      console.log(description);
      res.write(
        "<h1>the temp in" + query + " is : " + temp + " degree celcius</h1>"
      );
      res.write(
        "<h2> the weather in " + query + " is :" + description + " </h2>"
      );
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000.");
});
("");
