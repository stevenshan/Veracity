chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.greeting == "status") {
			response = {};
			response["error"] = status;
			response["message"] = message;
			response["data"] = _data;
			sendResponse(response);
		}
	}
);

var storage = chrome.storage.local;
var refresh_freq = 1;// in days
var status = 1;
var message = "";
var _data = false;

$(function(){
	storage.get("veracity_news_last_update", check_refresh);
});

function check_refresh(result){
	var refresh_db = false;
	result = result["veracity_news_last_update"];
	if (typeof result !== "number") {
		refresh_db = true;
	} else {
		now = Date.now();
		if (now < result || Math.abs(now - result) >= refresh_freq * 24 * 3600 * 1000){
			refresh_db = true;
		}
	}
	if (true || refresh_db){
		update_news_sources(ready_compare);
	}
	// else {
	// 	ready_compare(false);
	// }
}

function ready_compare(file){
	// if (file === false){
	// 	storage.get("veracity_news_sources", function(data){
	// 		process(JSON.parse(data));
	// 	});
	// }
	// else {
	// 	chrome.storage.sync.set({"veracity_news_sources": JSON.stringify(file)});
	// 	chrome.storage.sync.set({"veracity_news_last_update": Date.now()});
	// 	process(file);
	// }
	process(file);
}

function getLocation(href){
	var l = document.createElement("a");
	l.href = href;
	return l.hostname;
}

function process(news_sources){
	var url = getLocation(window.location).replace(/(https:\/\/|http:\/\/)?(www.)?/i, "");
	var news_website = false;

	news_sources.forEach(function(source){
		source = getLocation(source["url"]).replace(/(https:\/\/|http:\/\/)?(www.)?/i, "");
		if (source.length > 3){
			var comp1, comp2;
			if(source.length > url.length){
				comp1 = url;
				comp2 = source;
			}
			else {
				comp1 = source;
				comp2 = url;
			}
			if(comp2.indexOf(comp1) != -1){
				news_website = true;
			}
		}
	})
	if (news_website !== false){
		$.get("http://138.197.83.96/bin/?site="+window.location+"&u="+url, function( data ) {
			flag = false
			try {
				data = JSON.parse(data);
			}
			catch (err){
				flag = true;
			}
			status = 2;
			if (flag == false){
				status = 0;
				_data = data;
			}
		});
	}
	else {
		status = 6;
	}
}
