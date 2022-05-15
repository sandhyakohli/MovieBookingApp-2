const http = require("http");
const PORT = 9000;

const ROUTE_RESPONSE_MAP = {
  "/movies": "All Movies Data in JSON format from Mongo DB",
  "/genres": "All Genres Data in JSON format from Mongo DB",
  "/artists": "All Artists Data in JSON format from Mongo DB",
};

const server = http.createServer((req, res) => {
  if (ROUTE_RESPONSE_MAP[req.url]) {
    res.end(ROUTE_RESPONSE_MAP[req.url]);
  }
});

server.listen(PORT, () => {
  console.log(`server listening on port 9000`);
});