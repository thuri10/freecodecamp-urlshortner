const { nanoid } = require("nanoid");
const fs = require("fs");
const path = require("path");
const url = require("url");
const validUrl = require("valid-url");

//path to store our data parsed
const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "urls.json"
);

exports.Shortener = (req, res, next) => {
  let shortUrl = nanoid();
  const url  = req.body.url;
  if(!validUrl.isWebUri(url)) {
      res.status(401).json({
        error: "invalid url"
      });
      return
  } else {
    const responseData = {
        original_url: req.body.url,
        short_url: shortUrl,
    };
    fs.writeFile(filePath, JSON.stringify(responseData), (err) => {
        console.log(err);
    });
    res.send(responseData);
  }
};

exports.shortUrlVisit = (req, res, next) => {
  let myURL;
  //read array stored of our url
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    data = JSON.parse(data);
    try {
      myURL = new URL(data.original_url);
    } catch (error) {
      res.json({ error: "invalid url" });
      return;
    }
    if (req.params.short_url === data.short_url) {
      res.redirect(data.original_url);
    }
  });
};
