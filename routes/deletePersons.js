const readBody = require("./utils/read-body");
const sendResponse = require("./utils/send-response");

const deletePersons = (req, res) => {
  //console.log("IN DELETE PERSONS")

  //deletes all people in the database in order to reset the raffle
  return req.app.db
    .deletePersons()
    .then(() => {
      sendResponse(res, 201, {});
    });
};

module.exports = deletePersons;