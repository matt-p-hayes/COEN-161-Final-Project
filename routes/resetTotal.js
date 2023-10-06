const sendResponse = require("./utils/send-response");

const resetTotal = (req, res) => {
    //resets the total to 0 so a new raffle can be started
    const total = req.app.db.resetTotal();
    sendResponse(res, 201, { total });
};

module.exports = resetTotal;