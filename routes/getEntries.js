
const sendResponse = require("./utils/send-response");

const getEntries = (req, res) => {
    //console.log("IN GET ENTRIES")

    //gets the current number of people in the database
    return req.app.db
      .getAllPersons()
      .then((total) => {
        sendResponse(res, 201, total.length);
      });
};

module.exports = getEntries;