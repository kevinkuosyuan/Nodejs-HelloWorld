// 20181230 Modify By Kevin.Kuo: 加入 querystring 模組
var querystring = require("querystring"), 
	// 20190113 Add By Kevin.Kuo: 加入 fs 模組，讀檔案到伺服器中
	fs = require("fs");


// 20181025 Add By Kevin.Kuo: 新增 start 方法，當 url 傳送 start 則呼叫該方法
// 20181030 Modify By Kevin.Kuo: 新增傳回資料為畫面。
function start(response, postData) {
	console.log("Request handler 'start' was called.");

	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post">'+
		'<label >輸入文字: </label>' + 
		'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<input type="submit" value="Submit text" />'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

// 20181025 Add By Kevin.Kuo: 新增 upload 方法，當 url 傳送 upload 則呼叫該方法
// 20181030 Modify By Kevin.Kuo: 修改 upload 為回傳傳入的資料
function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	// 20181030 Modify By Kevin.Kuo: 確認回傳的 charset 為 UTF-8，當回傳的文字是中文，才不會變亂碼
	response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"});
	response.write("You've sent the text: "+
	querystring.parse(postData).text);
	response.end();
}

// 20190113 Add By Kevin.Kuo: 新增 show 方法，當 /show 時，顯示圖檔
function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/Users/kuosyuan/Program/Node js/Hello World/image/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;