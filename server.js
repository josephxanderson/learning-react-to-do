const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const server = {};

// The base directory to serve files from.
// The project set-up allows for all source to be browsed.
// This is OK as this is an educational project.
const baseDir = path.join(__dirname, './');

// The file types we serve.
const mimeTypes = {
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
};

server.getContentType = url => {
    // Set the default content type.
    let contentType = 'text/plain';

    // Get the extension of the URL.
    const extname = path.extname(url);

    // Map through to match up the extension to a mime type.
    for (let key in mimeTypes) {
        if (mimeTypes.hasOwnProperty(key)) {
            if (extname === key) {
                contentType = mimeTypes[key];
            }
        }
    }

    return contentType;
};

server.serveStaticContent = (pathname, response) => {
    // Set the content type based on the file extension.
    const contentType = server.getContentType(pathname);
    response.setHeader('Content-Type', contentType);

    // Read the file and send the response to the browser.
    fs.readFile(`${baseDir}${pathname}`, (error, data) => {
        if (!error) {
            response.writeHead(200);
            response.end(data);
        } else {
            let data = {
                httpCode: 404,
                message: 'Can\'t find that.',
            };

            response.writeHead(404);
            response.end(JSON.stringify(data));
        }
    });
};

// Create the server.
const httpServer = http.createServer((request, response) => {
    const pathname = url.parse(request.url, false).pathname;
    server.serveStaticContent(pathname, response);
});

server.init = (port, host) => {
    httpServer.listen(port, host, () => {
        console.log(`The server is online and listening at http://${host}:${port}!`);
    });
};

// Start the server.
server.init(process.env.PORT || 5000, 'localhost');