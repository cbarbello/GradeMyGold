//displays icon in address bar when script is active
function showPageAction( tabId, changeInfo, tab ) {
  if(tab.url == "https://my.sa.ucsb.edu/gold/StudentGrades.aspx"){
    chrome.pageAction.show(tabId);
  }
};
chrome.tabs.onUpdated.addListener(showPageAction);