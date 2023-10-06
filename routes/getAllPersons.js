const sendResponse = require("./utils/send-response");

const getAllPersons = (req, res) => {
  //gets all people objects currently in the database
  return req.app.db.getAllPersons().then((persons) => {
    sendResponse(res, 200, { persons });
  });
};

module.exports = getAllPersons;
