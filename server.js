var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});

var handleMessage = function(message) {
  console.log('received: %s', message);
  try {
    var obj = JSON.parse(message);
    console.log(obj);
    // this is gross, change it 
    this.send('uh huh: ' + JSON.stringify(obj));
  }
  catch (e) {
    this.send('not an object, but fine: ' + message);
  }
}

wss.on('connection', function(ws) {
  ws.on('message', handleMessage.bind(ws));
  ws.send('connected!');
});
// wscat -c ws://cncrtd-u1204-01.cloudapp.net:8080  

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('index.html');
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

repl = require('repl');
r = repl.start('node> ');
r.context.wss = wss;