// const http = require("http");
// const db = require("./models");
// const PORT = 9000;

const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

console.log(`server listening on port ${PORT}`);
});