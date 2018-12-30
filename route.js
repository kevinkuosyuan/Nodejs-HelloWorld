
// 20181226 Modify By Kevin.Kuo: 新增傳入 handler 參數，判斷 pathname 要執行的方法
// 20181230 Modify By Kevin.Kuo: 新增傳入參數 postData，取得傳入的資料
function route(handle, pathname, response, postData) {
	if (typeof handle[pathname] === "function" ) {
		handle[pathname](response, postData);
	}
	else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;