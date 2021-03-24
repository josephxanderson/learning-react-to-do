// Thanks to: https://medium.com/@amitgupta15/node-js-server-without-express-bf22903355ad

const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const server = {};
const baseDir = path.join(__dirname, './');

const mimeTypes = {
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
  // Set the default content type to application/octet-stream
    let contentType = 'application/octet-stream';

    const extname = path.extname(url);

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
  // Get content type based on the file extension
  const contentType = server.getContentType(pathname);

  response.setHeader('Content-Type', contentType);

  fs.readFile(`${baseDir}${pathname}`, (error, data) => {
    if (!error) {
        response.writeHead(200);
        response.end(data);
    } else {
        response.writeHead(404);
        response.end('404 - File Not Found');
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
        console.log(`Server is listening at http://${host}:${port}`);
    });
};

// Start the server.
server.init(process.env.PORT || 5000, 'localhost');