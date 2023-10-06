const readBody = require("./utils/read-body");
const sendResponse = require("./utils/send-response");

const updateTotal = (req, res) => {
  //console.log("IN UPDATE TOTAL ")

  //updates the total amount of money in the raffle once a new person has been added
  return readBody(req).then((body) => {
    const options = JSON.parse(body);

    const total = req.app.db.updateTotal(options.newTotal)
      
    sendResponse(res, 201, { total });
      
  });
};

module.exports = updateTotal;