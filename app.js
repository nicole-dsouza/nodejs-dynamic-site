var routes  = require('./router.js');



/* 
 * we need a simple way to look at student info from a web browser
 * use node.js to perform the student lookups, and serve our template via HTTP
 */

// create web server

const http = require('http');
const port = 5000;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        routes.home(req, res);
    } else {
        routes.student(req, res);
    }
});

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});