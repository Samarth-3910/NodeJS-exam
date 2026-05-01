const http = require('http');
const os =  require('os');
const fs = require('fs');
const server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/updateUser'){
        const timestamp = new Date().toISOString();
        fs.appendFile('visitors.log', `Visitor at ${timestamp}\n`, (err) => {
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error updating the visitors log');
            }
            else{
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('User log updated');
            }
        });
    }
    else if(req.method === 'GET' && req.url === '/saveLog'){
        fs.readFile('visitors.log', (err, data) => {
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading log file');
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    }
    else if(req.method === 'POST' && req.url === '/backup'){
        fs.copyFile('visitors.log', 'backup.log', (err) => {
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error while backing up visitors log');
            }
            else{
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Log file backed up successfully');
            }
        });
    }
    else if(req.method === 'GET' && req.url === '/clearLog'){
        fs.writeFile('visitors.log', '', (err) => {
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error while clearing visitors log file');
            }
            else{
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Visitors log cleared successfully');
            }
        });
    }
    else if(req.method === 'GET' && req.url === '/serverInfo'){
        const serverInfo = {
            platform: os.platform(),
            cpuArch: os.arch(),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            uptime: os.uptime()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(serverInfo));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
