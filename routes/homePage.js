const path = require("path");
const fs = require("fs/promises");

const serveHome = function (req, res) {
  //console.log("IN SERVE HOME")

  //serves the homepage of the website
  return (
    fs
      .readFile(path.join("public", "home.html"))
      .then(result => {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(result);
        res.end();
      })
      // catch if the file has error and send 500
      .catch(error => {
        res.writeHead(500);
        res.write(error);
        res.end();
      })
  );
};

module.exports = serveHome;