chrome.webRequest.onHeadersReceived.addListener(
	function(details) {
		if ( parseInt(details.statusLine.split(" ")[1]) >= 400 ) {
			if (details.url.split("/").slice(-1)[0].indexOf(".") == -1) {
				console.log("failed to load " + details.url + ". HTTP Code is " + details.statusLine);
				chrome.alarms.create("Reload_Tabid=" + details.tabId, { when: Date.now()+5000 })	
			}
		}
	},
	{urls: ["<all_urls>"]},
	["blocking"]
);

chrome.webNavigation.onErrorOccurred.addListener(
	function(details) {
		console.log(details);
		if (details.frameId == 0) {
			console.log("failed to load " + details.url + ". Error is " + details.error);
			chrome.alarms.create("Reload_Tabid=" + details.tabId, { when: Date.now()+5000 })
		}
	}
);

chrome.alarms.onAlarm.addListener(
	function(alarm) {
		tabid = parseInt(alarm.name.split("=").slice(-1)[0])
		chrome.tabs.reload(tabid);
	}
);
