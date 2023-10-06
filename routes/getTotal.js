
const sendResponse = require("./utils/send-response");

const getTotal = (req, res) => {
   //console.log("IN GET TOTAL")

   //gets the total amount of money currently available to be won
    return req.app.db
      .getTotal()
      .then((total) => {
        sendResponse(res, 201, total);
      });
};

module.exports = getTotal;