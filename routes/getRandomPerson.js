
const sendResponse = require("./utils/send-response");

const getRandomPerson = (req, res) => {
    //console.log("IN GET RANDOM PERSON")

    //gets a random person from the database in order to pick a winner
    return req.app.db
      .getRandomPerson()
      .then((person) => {
        sendResponse(res, 201, person);
      });
};

module.exports = getRandomPerson;