var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var utf8 = require('utf8');
var patchV = "x.x";
var urlPrefix = "http://www.allsides.com";
var i = 0;
    url = ['https://www.allsides.com/bias/bias-ratings','https://www.allsides.com/bias/bias-ratings?field_news_source_type_tid=2&field_news_bias_nid=1&field_featured_bias_rating_value=All&title=&page=1','https://www.allsides.com/bias/bias-ratings?field_news_source_type_tid=2&field_news_bias_nid=1&field_featured_bias_rating_value=All&title=&page=2']; //TODO: work with multiple URLs
var runtime = 0;

function execute() {
	console.log("Begin Cycle");
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
	for (z = 0; z < url.length; z++){
		request(url[z], function(error, response, html){
			
			if(!error){
				var $ = cheerio.load(html);
				$.html();
				
				var temp_url;
				console.log("started");

				$('td.views-field-title').each(function(){

					var temp_url = $(this).children("a").attr("href");
					getDescription(temp_url, connection);
				})
			}
		})
	}
	
	
	
}

function getDescription(nUrl, connection){
	
	var result = "";
	
	request(("https://www.allsides.com" + nUrl), function(error, response, html){
		console.log("good2");
		if(!error){
				
			var $ = cheerio.load(html);
				
			if (1==1){
				var url, rating, name, stat;
				$('.container').each(function(){
					url = $('.source-image').children("a").attr("href");
					name = $(".span8").children("h1").text();
					rating = $('.bias-value').text();
					stat = "verified";
					})
					
					var uploadArray = [];
					uploadArray[0] = url;
					uploadArray[1] = name;
					uploadArray[2] = rating;
					uploadArray[3] = stat;
					console.log(uploadArray);
					
					fupload(uploadArray, connection);
					}	
				
			
		}
		else{
			console.log(error);
		}
	})
	
}

function fupload(data, connection){
	
	connection.query('SELECT * FROM `sites` WHERE `url` = ?', [data[0]], function (error, results, fields) {
		
		if (results == 0){
			var posti = {url : data[0], name : data[1], rating : data[2], stat : data[3]};
			connection.query('INSERT INTO sites SET ?', posti, function (error, results, fields) {
				if (error){
					console.log(error);	
				}
				else{
					console.log("New Entry Good: ");
			});
		}
		else{
			console.log("Duplicate Entry --PostID:" + data[5]);
		}

		
	});
}

console.log('VGD v1.0.0 Booted!');

execute();
setInterval(execute,600000);
