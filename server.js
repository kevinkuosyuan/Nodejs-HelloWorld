
var http = require('http');

function start(argument) {
	function onRequest(request, response) {
	  // 發送HTTP Head
	  // HTTP Status: 
	  //   200 : OK
	  // 內容類型: text/plain
	  response.writeHead(200, {'Content-Type': 'text/plain'});
	  
	  // 發送響應數據 "Hello World!"
	  response.end('Hello World!\n');
	}

	http.createServer(onRequest).listen(8888);
}

exports.start = start;

console.log('Server running at http://127.0.0.1:8888/');