const path = require("path");
const fs = require("fs/promises");

const serveWinner = function (req, res) {
  //console.log("IN SERVE WINNER")

  //serves the winner page of the website
  return (
    fs
      .readFile(path.join("public", "congratulations.html"))
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

module.exports = serveWinner;
