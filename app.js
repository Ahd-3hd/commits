var express = require("express");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var app = express();
var port = process.env.PORT || 3000;
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", function (req, resp) {
  const url = "https://github.com/Zeus3hd";
  let date = new Date();
  let jointDate = `${date.getFullYear()}-0${
    date.getMonth() + 1
  }-0${date.getDate()}`;
  console.log(jointDate);
  request(url, (err, res, html) => {
    if (!err) {
      var $ = cheerio.load(html);
      let arrLength = $(".js-calendar-graph-svg").children().length;
      let arr = $(".js-calendar-graph-svg").children().children().children();
      let newArr = [];
      for (let x in arr) {
        if (arr[x].attribs) {
          if (arr[x].attribs["data-date"] === `${jointDate}`) {
            let commitCount = arr[x].attribs["data-count"];
            let phrase = "";
            if (commitCount < 40) {
              phrase = "Ahd is being a lazy piece of shit !";
            } else {
              phrase = "Ahd is Kicking Ass YO !";
            }
            resp.render("index", {
              commitCount: commitCount,
              phrase: phrase,
            });
          }
        }
      }
    }
    return;
  });
});

app.listen(port);

console.log("Magic happens on port: ", port);

exports = module.exports = app;
