const path = require("path");
const fs = require("fs/promises");

const serveNewScript = function (req, res) {
    //console.log('IN SERVE NEW SCRIPT');
    //const file = req.url.split("/")[1];
    //console.log('FILE', file);
    //console.log('IN SCRIPT');
    //console.log(req.url)

    //gets the correct js file without the version number(added to avoid caching) on the end
    let fragments = req.url.split("/");
    let newPathFragments = fragments.splice(4);
    let newPath = newPathFragments[0].split('-')[0];
    //console.log(newPath);
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

module.exports = serveNewScript;