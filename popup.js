function getTitleAndUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
	};

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];

	//----this is NOT Cryptographically secure! -- please don't take this as an example for your own apps.----
	var key = CryptoJS.enc.Utf8.parse('7061737323313233');
    var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
	var options = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv, keySize: 128 / 8,  };
	
    var encrypted_url = encodeURIComponent(CryptoJS.AES.encrypt(tab.url, key, options));
	var encrypted_title = encodeURIComponent(CryptoJS.AES.encrypt(tab.title, key, options));
	var encrypted_icon = encodeURIComponent(CryptoJS.AES.encrypt(tab.favIconUrl, key, options));
	//----this is NOT Cryptographically secure! -- please don't take this as an example for your own apps.----

    callback(encrypted_url, encrypted_title, encrypted_icon);
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

