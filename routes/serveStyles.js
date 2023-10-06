const path = require("path");
const fs = require("fs/promises");

const serveStyles = function (req, res) {
    //console.log('IN SERVE STYLES');
    //console.log(req.url)
    
    //gets the correct css file without the version number(added to avoid caching) on the end
    let fragments = req.url.split("/");
    let newPathFragments = fragments.splice(4);
    let newPath = newPathFragments[0] + "/" + newPathFragments[1].split('-')[0];
    return (
    fs
        .readFile(path.join("public", newPath))
        .then(result => {
        res.writeHead(200, {"Content-Type": "text/css"});
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

module.exports = serveStyles;