

const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const PORT = process.env.PORT || 8085;

server.listen(PORT, () => {

console.log(`server listening on port ${PORT}`);
});