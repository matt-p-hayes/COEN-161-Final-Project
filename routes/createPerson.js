const readBody = require("./utils/read-body");
const sendResponse = require("./utils/send-response");

const createPerson = (req, res) => {
  //console.log("IN CREATE PERSONS")

  //makes sure that both a name and an amount was sent
  return readBody(req).then((body) => {
    const options = JSON.parse(body);
    if (!options.name) {
      return sendResponse(res, 400, {
        error: "name is a required field",
      });
    } else if (!options.amount) {
      return sendResponse(res, 400, {
        error: "even dollar amount is a required field",
      });
    }
    //creates a new person in the mongodb database
    const person = req.app.db.createPerson(options.name, options.amount)
      
    //sends the created person back
    sendResponse(res, 201, { person });
      
  });
};

module.exports = createPerson;
