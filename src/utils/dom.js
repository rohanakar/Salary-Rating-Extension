

function findAncestorWithClass(element, className) {
	let parentNode = element.parentNode;
  
	while (parentNode !== null) {
		try{
			if (parentNode.classList.contains(className)) {
				return parentNode;
			  }
			  parentNode = parentNode.parentNode;
		
		}catch(e){
			return null;
		}
	}
  
	return null; // Class not found in any ancestor node
  }
  

new MutationObserver(function(mutations) {
	for(let mutation of mutations) {
		for(let node of mutation.addedNodes) {
				if (!(node instanceof HTMLAnchorElement) || node.className.trim()!=='app-aware-link') continue;	// we track only elements, skip other nodes (e.g. text nodes)

					const ancestorWithClass = findAncestorWithClass(node, 'jobs-unified-top-card__primary-description');
					if(ancestorWithClass){
						// console.log(ancestorWithClass);
						const name = node.innerText;
						// console.log(name)
						appendCustomCompany(node.parentNode, name);
					}
				
			}
		}
}).observe(document, {subtree: true, childList: true});
