function sendRequest(url,complete=false){
   return new Promise(function(resolve,reject){
      const request = {
         url,
         complete
      } 
      chrome.runtime.sendMessage(request, function (response) { 
         resolve(response)
      })
   });

}