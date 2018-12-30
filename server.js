
var http = require('http');
// 20181225 Add By Kevin: 解析 Http 的 url 路徑
var url = require('url');

function openserver(route, handle) {
	function onRequest(request, response) {
		// 20181225 Add By Kevin: 取得 pathName，作為之後路由選擇器的來源
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		// 20181030 Add By Kevin.Kuo: 新增 Listener 事件。
		// 當 data 時，記錄每組 data 的資訊。
		// 當 end 時，表示該次呼叫結束。
		var postData = "";

		request.setEncoding("UTF-8");

		// request.addListener 等於 request.on
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
			postDataChunk + "'.");
		});

		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});

		// 20181030 Modify By Kevin.Kuo: 隱藏該語法，修改當 end 後才會呼叫。
		// route(handle, pathname, response);
		
		/*
		// 20181026 Modify By Kevin.Kuo: 修改 response 回覆由各 route 呼叫的動作自行處理
		var content = route(pathname, handle);

		// 發送HTTP Head
		// HTTP Status: 
		//   200 : OK
		// 內容類型: text/plain
		response.writeHead(200, {'Content-Type': 'text/plain'});

		// 發送響應數據 "Hello World!"
		response.write(content);

		// 結束
		response.end();
		*/
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.openserver = openserver;

console.log('Server running at http://127.0.0.1:8888/');