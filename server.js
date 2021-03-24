const basePath = __dirname;
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the Node.js server.
const server = http.createServer(function(req, res) {
    // Find the file based on the path given. Note this is OK for development purposes,
    // but has a recursive bug which could create vulnerabilities!
    const stream = fs.createReadStream(path.join(basePath, req.url));

    stream.on('error', function() {
        res.writeHead(404);
        res.end();
    });

	res.writeHead(200, { 'content-type': 'text/html' });
    stream.pipe(res);
});

// Start the server with the specified port.
server.listen(process.env.PORT || 5000);