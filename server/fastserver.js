const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
var resource = {"name": "Python",
                "start_time": "10:00",
                "end_time": "11:30"}


http.createServer((request, response) => {
    if (request.method == "POST") {
        let data;

        req.on('data', async function (chunk) {
            data += chunk;
        });
        req.on('end')

        response.writeHead(200, {'Content-Type': 'text/plain'});

        switch (data) {
            case ("name"): 
                response.write(resource["name"]);
            case ("start_time"): 
                response.write(resource["start_time"]);
            case ("end_time"): 
                response.write(resource["end_time"]);
        };

        response.end();
    }

}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});