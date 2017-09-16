function update_news_sources(callback){
  $.getJSON(chrome.extension.getURL('news_sources.json'), callback);
}
