function getTitleAndUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
	};

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
	var url = base64_encode(tab.url);
	var title = base64_encode(tab.title);
	var icon = base64_encode(tab.favIconUrl)
	
    callback(url, title, icon);
  });
}

 
function makeRequest(url, title, icon) {
  var searchUrl = 'http://localhost:1339/kb?u=' + url + '&t=' + title + '&i=' + icon;
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.send();
}
 
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  renderStatus('Sending bookmark to KeeBook Plugin');
  getTitleAndUrl(makeRequest);
});

