function detectURLChange() {
	var currentURL = window.location.href; // Get the current URL
  
	// Check if the URL has changed
	setInterval(function() {
	  if (currentURL !== window.location.href) {
		// URL has changed, trigger your desired action here
		currentURL = window.location.href; // Update the current URL
		if(currentURL.indexOf('jobs/collections/recommended')==-1)
			return;

		let node  = document.getElementsByClassName('jobs-unified-top-card__primary-description')[0];
		var observer = new MutationObserver(function(mutationsList, observer) {
			// Check if the target node has been added to the DOM
			if (node.children[0].children[0] instanceof HTMLAnchorElement) {
			  observer.disconnect(); // Stop observing DOM mutations
			   let company = node.children[0].children[0].innerText;
			   appendCustomCompany(node,company)
			}
		  });
		
		  // Start observing DOM mutations
		  observer.observe(document.documentElement, { childList: true, subtree: true });

	  }
	}, 100); // Check every second (you can adjust the interval as needed)
  }
  
  // Call the function to start detecting URL changes
  detectURLChange();

// new MutationObserver(function(mutations) {
// 	let nodes = {};
// 	for(let mutation of mutations) {
// 		for(let node of mutation.addedNodes) {
// 				if (!(node instanceof HTMLAnchorElement) || node.className.trim()!=='app-aware-link') continue;	// we track only elements, skip other nodes (e.g. text nodes)

// 					const ancestorWithClass = findAncestorWithClass(node, 'jobs-unified-top-card__primary-description');
// 					if(ancestorWithClass){
// 						const name = node.innerText;
						
// 						nodes[name] = node.parentNode;
// 					}
				
// 			}
// 		}
// 		console.log(nodes);
	
// }).observe(document, {subtree: true, childList: true});
