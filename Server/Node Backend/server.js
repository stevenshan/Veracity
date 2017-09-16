var http = require('http');
var indico = require('indico.io');
indico.apiKey =  '782bcfc058fd3c6e253db53e50afb9ee';
var mysql = require('mysql');
var response;
	console.log("start");
var server = http.createServer ( function(request,temp_response){
	console.log("1");
	response = temp_response;
    response.writeHead(200,{"Content-Type":"text\plain"});
    if (request.method == "GET" && request.url == "/article")
        {
			var body;
			var articleTxt = "I love Bernie Sanders";
			var author = "Kijo Kimu";
			var articleUrl = "testurl1";
			body = parseArticle(articleTxt, author, articleUrl, function(leaning){
				console.log(leaning);
				var ender = "Conservative:" + leaning[0] + ";Libertarian:" + leaning[1] + ";Liberal:" + leaning[2] + ";Green:" + leaning[3];
				response.end(ender);
				//console.log(body);
			//response.end(body);
				

		
				//response.end("received GET request.")
			});
			
			
        }
		else if (request.method == "GET" && request.url == "/site"){
			var body;
			body = getSite("http://www.dukechronicle.com/", function(xit){
				console.log(xit);
				response.end(xit);
				//console.log(body);
			//response.end(body);
				

		
				//response.end("received GET request.")
			});

			
		}
		else if (request.method == "GET" && request.url == "/author"){
			var body;
			var aName = "kj";
			body = getAuthor(aName, function(xit){
				console.log(xit);
				response.end(xit);
				//console.log(body);
			//response.end(body);
				

		
				//response.end("received GET request.")
			});

			
		}

});
server.listen(process.env.PORT || 5000);
console.log(process.env.PORT);

function getAuthor (nameA, callback){
		var connection = mysql.createConnection({
			  host     : 'localhost',
			  user     : 'root',
			  password : '',
			  database : 'tst2'
			});
				connection.connect(function(err) {
			  if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			  }
			 
			  console.log('connected as id ' + connection.threadId);
			});
				connection.query('SELECT * FROM `journalists` WHERE `name` = ?', [nameA], function (error, results, fields) {
		
					if (results == 0){
						var xit = null;
						callback(xit);
					}
					else{
						var xit = "name:" + results[0]["name"] + ";Liberal:" + results[0]["Lib"] + ";Conservative:"+ results[0]["Con"] + ";Green:"+ results[0]["G"] + ";Libertarian:"+ results[0]["Lbt"];
						callback(xit);
						/*if (results[0].title != data [6]){
							connection.query('UPDATE devposts SET description = :desc WHERE postID = :pid', {description:data[6],pid:data[5]}, function (error, results, fields) {
							if (error){
								console.log(error);	
							}
						});
						}
						*/
						//another time, old friend
					}

					
				});
				connection.end();
			
}


function getSite(siteUrl, callback){
		var connection = mysql.createConnection({
			  host     : 'localhost',
			  user     : 'root',
			  password : '',
			  database : 'tst2'
			});
				connection.connect(function(err) {
			  if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			  }
			 
			  console.log('connected as id ' + connection.threadId);
			});
				connection.query('SELECT * FROM `sites` WHERE `url` = ?', [siteUrl], function (error, results, fields) {
		
					if (results == 0){
						var xit = null;
						callback(xit);
					}
					else{
						var xit = "url:" + results[0]["url"] + ";name:" + results[0]["name"] + ";rating:"+ results[0]["rating"] + ";status:"+ results[0]["stat"];
						callback(xit);
						/*if (results[0].title != data [6]){
							connection.query('UPDATE devposts SET description = :desc WHERE postID = :pid', {description:data[6],pid:data[5]}, function (error, results, fields) {
							if (error){
								console.log(error);	
							}
						});
						}
						*/
						//another time, old friend
					}

					
				});
				connection.end();
			
}

function parseArticle(aText, author, articleUrl, callback){
	var sentText = aText;
	var sLbt, sLib, sCon, sG;
	console.log("hey");
	var responsei = function(res) { 
		sCon = res["Conservative"];
		sLbt = res["Libertarian"];
		sLib = res["Liberal"];
		sG = res["Green"];
		  var leaning = [];
		leaning[0] = sCon;
		leaning[1] = sLib;
		leaning[2] = sLbt;
		leaning[3] = sG;
		callback(leaning);
		uploadAtoDB(leaning, articleUrl, author);

	}
	
	var logError = function(err) { console.log(err); }

	// single example
	var results = indico.political("I love bernie")
	  .then(responsei)
	  .catch(logError);
	
}

function uploadAtoDB (leaning, aUrl, author){
			var connection = mysql.createConnection({
			  host     : 'localhost',
			  user     : 'root',
			  password : '	',
			  database : 'tst2'
			});
							connection.connect(function(err) {
			  if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			  }
			 
			  console.log('connected as id ' + connection.threadId);
			});
				connection.query('SELECT * FROM `articles` WHERE `url` = ?', [aUrl], function (error, results, fields) {
		console.log(results);
					if (results == 0 || results == undefined){
						var posti = {url : aUrl, author : author, Con : leaning[0], Lib : leaning[1], Lbt : leaning[2], G : leaning[3]};
						connection.query('INSERT INTO articles SET ?', posti, function (error, results, fields) {
							if (error){
								console.log(error);	
							}
							else{
								console.log("New Entry Good: ");
								/*console.log("Title: " + data[0]);
								console.log("User: " + data[1]);
								console.log("Date: " + data[2]);
								console.log("Short Description: " + data[3]);
								console.log("URL: " + data[4]);
								console.log("Post ID: " + data[5]);
								console.log("Description: " + data[6]);
								console.log("");
								*/
							}
						});
					}
					else{
						console.log("Duplicate Entry --PostID:z");
						/*if (results[0].title != data [6]){
							connection.query('UPDATE devposts SET description = :desc WHERE postID = :pid', {description:data[6],pid:data[5]}, function (error, results, fields) {
							if (error){
								console.log(error);	
							}
						});
						}
						*/
						//another time, old friend
					}

					
				});
	
}

console.log("Server running on port 8000");