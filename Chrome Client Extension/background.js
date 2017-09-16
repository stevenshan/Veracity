chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "status"}, function(response) {
    var flag = false, error = false, data = false;
    try {
      error = parseInt(response.error);
      data = response.data[0];
    }
    catch (err){
      flag = true;
    }
    if (flag){
      $("#loading").css("display", "block");
    }
    else {
      //                Author data, article data, website data
      labels = ["article_data", "author_data", "site_data"];
      switch (error){
        case 1:
          $("#loading").css("display", "block");
          break;
        case 2:
          $("#error").css("display", "table");
          $("#error span").html(response.message == "" ? "An error occurred." : response.message);
          break;
        case 6:
          $("#error").css("display", "table");
          $("#error span").html("Not my news.");
          break;
        case 0:
          console.log(data);
          for(i = 0; i < labels.length; i++){
            if (labels[i] in data){
              value = data[labels[i]];
              var DOM_element = $("<div class=\"box\"></div>");
              $("#content").append(DOM_element);
              console.log(value);
              switch (labels[i]){
                case "article_data":
                  if (value == ""){
                    DOM_element.css("display", "table");
                    DOM_element.html("<div style=\"display: table-cell; vertical-align: middle\">Something went wrong with our analysis of this article.</div>");
                  }
                  else {
                    
                  }
                  break;
                case "author_data":
                  if (value == ""){
                    DOM_element.css("display", "table");
                    DOM_element.html("<div style=\"display: table-cell; vertical-align: middle\">We couldn't find data in our database for this journalist: " + data["author"] + "</div>");
                  }
                  break;
                case "site_data":

                  break;
              }
            }
          }
          break;
      }
    }
  });
});
