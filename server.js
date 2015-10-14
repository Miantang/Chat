var http = require('http');
var events = require('events');

var server = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('okay');
});


server.on('upgrade', function(req, socket, head) {
	var self = this;
	//var key = hashWebSocketKey(req.headers['sec-websocket-key']);

	socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
		'Upgrade: WebSocket\r\n' +
		'Connection: Upgrade\r\n' +
		'\r\n');

	socket.on('data', function(buf){
		self.buffer = Buffer.concat([self.buffer, buf]);
		//while(self._processBuffer()) {
        //
		//}
	});
	socket.on('close', function(err) {
		if (!self.closed) {
			self.emit('close', 1006);
			self.closed = true;
		}
	});
	socket.pipe(socket); // echo back
});

server.listen(1337, '127.0.0.1', function() {

    // make a request
    var options = {
        port: 1337,
        hostname: '127.0.0.1',
        headers: {
            'Connection': 'Upgrade',
            'Upgrade': 'websocket'
        }
    };

    var req = http.request(options);
    req.end();

    req.on('upgrade', function(res, socket, upgradeHead) {
        console.log('got upgraded!');
        socket.end();
        process.exit(0);
    });
});

/*function elect(socket){
	dj = socket;
	io.sockets.emit("announcement", socket.nickname + " is the new dj!");
	socket.emit("elected");
	//socket.dj???
	socket.dj = true;
	socket.on("disconnect", function(){
		dj = null;
		io.sockets.emit("announcement", "the dj left - next one to be join becomes dj");
	});
}

io.sockets.on('connection', function(socket){
	/!*console.log("someone connected");
	socket.emit('news', {name:"hello, ran"});
	socket.on('other_event', function(msg){
		console.log(msg);
	});*!/
	socket.on('join', function(name){
		socket.nickname = name;
		socket.broadcast.emit("announcement", name + " joined the chat room.");
		if(!dj){
			elect(socket);
		} else {
			socket.emit("song", currentSong);
		}
	});
	socket.on('text', function(msg, fn){
		socket.broadcast.emit('text', socket.nickname, msg);
		fn( Date.now() );
	});

});
app.use(express.static(__dirname + '/public'));
server.listen(3000);*/










