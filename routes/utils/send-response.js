const http = require("http");

//sends an http response based on the passed in status code and body
const sendResponse = (res, statusCode, body = null) => {
  if (body && res.statusCode !== 500) {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...res.headers,
      };

      const responseBody =
        headers["Content-Type"] === "application/json"
          ? JSON.stringify(body)
          : body;

      res.writeHead(statusCode, http.STATUS_CODES[statusCode], headers);
      res.write(responseBody);
    } catch (err) {
      if (err instanceof SyntaxError) {
        res.writeHead(500);
      }
    }
  } else {
    res.writeHead(statusCode);

    if (res.statusCode === 500) {
      res.log.error = body;
    }
  }

  res.end();
  return Promise.resolve({
    statusCode,
    body,
  });
};

module.exports = sendResponse;
