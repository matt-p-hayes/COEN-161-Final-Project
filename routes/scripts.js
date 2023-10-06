const path = require("path");
const fs = require("fs/promises");

const serveScript = function (req, res) {
    
    const file = req.url.split("/")[1];
    console.log('FILE', file);
    console.log('IN SCRIPT');
    console.log(req.url)
    let fragments = req.url.split("/");
    let newPathFragments = fragments.splice(4);
    let newPath = newPathFragments[0];
    console.log(newPath);
  return (
    fs
      .readFile(path.join("public", newPath))
      .then(result => {
        res.writeHead(200, {"Content-Type": "text/javascript"});
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

module.exports = serveScript;