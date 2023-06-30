
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // let url = `https://www.ambitionbox.com/api/v2/company/${msg.name}`;
    if(request['complete']){
        fetch(request['url']).then((res)=>sendResponse(res['url'].split("/").pop().replace("-reviews","")))
        return true;
    }
    fetch(request['url']).then((res) => res.json().then((json) => sendResponse(json)));
    return true;
});
