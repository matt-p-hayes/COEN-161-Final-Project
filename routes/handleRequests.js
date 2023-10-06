const http = require("http");
const sendResponse = require("./utils/send-response");
const pathToRegexp = require("path-to-regexp");

const createPerson = require("./createPerson");
//const getPerson = require("./getPerson");
const getAllPersons = require("./getAllPersons");
const getEntries = require("./getEntries");
const deletePersons = require('./deletePersons');
const getRandomPerson = require('./getRandomPerson');
const serveHomePage = require('./homePage');
const serveWinner = require("./winner");
//const serveScript  = require('./scripts');
const serveMedia = require('./media');
const getTotal = require('./getTotal');
const updateTotal = require('./updateTotal');
const resetTotal = require('./resetTotal');
const serveStyles = require('./serveStyles');
const serveNewScript = require('./serveNewScript.js');

const handleRequests = (db) => {
  //routing table for raffle website
  const routingTable = {
    "/coen-161/final/raffle/persons": getAllPersons,
    //"/coen-161/final/raffle/person": getPerson,
    "/coen-161/final/raffle/makePerson": { POST: createPerson },
    "/coen-161/final/raffle/deletePersons": { DELETE: deletePersons },
    "/coen-161/final/raffle/getRandom": { GET: getRandomPerson },
    "/coen-161/final/raffle/getTotal": { GET: getTotal },
    "/coen-161/final/raffle/getEntries": { GET: getEntries },
    "/coen-161/final/raffle/updateTotal": { PUT: updateTotal },
    "/coen-161/final/raffle/resetTotal": { PUT : resetTotal },
    "/coen-161/final/raffle": { GET: serveHomePage },
    "/coen-161/final/raffle/winner": { GET: serveWinner },
    "/coen-161/final/raffle/congratulations.js(.*)": { GET: serveNewScript }, // has the (.*) at the end so that we can upload different css versions to avoid browser caching
    "/coen-161/final/raffle/home.js(.*)": { GET: serveNewScript },
    "/(.*).css(.*)": { GET: serveStyles }, 
    "/(.*).png": { GET: serveMedia },
    "/(.*).gif": { GET: serveMedia },
    "/(.*).webp": { GET: serveMedia },
    "/(.*).jpeg": { GET: serveMedia }
  };

  const routeRequest = function (req) {
    const path = req.url;
    //console.log('URL: ', path)
    const bestMatch = { matchedRoute: "", params: {}, handler: null };
  
    //iterates over the routing table and attempts to find a match with 
    for (const [route, handler] of Object.entries(routingTable)) {
      const match = pathToRegexp.match(route)(path);
      if (match) {
        //checks to see if the most recent matched url has more paths (/'s) than the current best match
        const hasMorePaths =
          bestMatch.matchedRoute.split("/").length <
          match.path.split("/").length;
        
        //checks to see if the most recent matched url has more params than the current best match
        const hasMoreParams =
          Object.keys(bestMatch.params).length <
          Object.keys(match.params).length;
  
        const isNewMatchMoreSpecific = hasMorePaths || hasMoreParams;
  
        //if the most recent match is better or there hasn't been a match, make this the best match
        if (isNewMatchMoreSpecific || bestMatch.handler === null) {
          if (typeof handler === "object") {
            if (!handler[req.method]) {
              // match the signature of (req, res) but ignore the caller's req variable
              return (_, res) => sendResponse(res, 405);
            } else {
              bestMatch.handler = handler[req.method];
            }
          } else if (typeof handler === "function") {
            bestMatch.handler = handler;
          }
  
          bestMatch.params = match.params;
          bestMatch.matchedRoute = route;
        }
      }
    }

    //add the params to req
    for (const [param, value] of Object.entries(bestMatch.params)) {
      req.params[param] = value;
    }
  
    //
    return bestMatch.handler;
  };

  return (req, res) => {
    //adds the mongodb database to req
    req.params = {};
    req.app = { db };

    //gets the proper handler function based on the route requested
    const handler = routeRequest(req);

    // if we can't match the URL, then send back a 404
    if (handler === null) {
      return sendResponse(res, 404, {
        error: `Could not find a handler for url ${req.url}`,
      });
    } else {
      return handler(req, res);
    }
  }
};

module.exports = handleRequests;
