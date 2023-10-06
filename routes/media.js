const path = require("path");
const fs = require("fs/promises");

//used for various media such as png and gif
const serveMedia = function (req, res) {
    // console.log('IN SERVE MEDIA');
    // console.log(req.url)

    //acquires the file name and path within public from the request
    let fragments = req.url.split("/");
    let newPathFragments = fragments.splice(4);
    let newPath = newPathFragments[0] + "/" + newPathFragments[1];
    return (
    fs
        .readFile(path.join("public", newPath))
        .then(result => {
        res.writeHead(200);
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

module.exports = serveMedia;