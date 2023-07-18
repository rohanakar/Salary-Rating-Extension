
function generateCard(source, stars, reviewCount,href) {
    return `
        <div class="tbl">
            <a href="${href}" target="_blank">
                <span class="custom-company-rating">${stars} ★</span>
                <span class="custom-company-reviews">  • ${reviewCount} Reviews</span>
                </a>
                <span class="">
                   powered by
                </span>
                   <span class="custom-company-rating"> ${source[0].toUpperCase() + source.slice(1)}</span>
                </div>
        </div>`
}
async function processAmbitionBox(parentNode, company) {

    let AMBTION_DIV = document.getElementById("custom-company-card-ambitionBox")
    if(AMBTION_DIV)
        AMBTION_DIV.remove();

    const cache = new CACHE('ambitionbox');  
    const ambitionbox = new AmbitionBox();

    let id = await ambitionbox.getId(company);
    if(!id){
        return;
    }
    let salary = await ambitionbox.getSalaries(company);
    let reviews = await ambitionbox.getReviews(company);
    
    let ambitonDiv = document.createElement('div');
    ambitonDiv.className =  'custom-company-card ambitionBox';
    ambitonDiv.id = 'custom-company-card-ambitionBox';
    ambitonDiv.innerHTML = generateCard('ambitionBox', reviews['avgRating'], kFormatter(reviews['totalCount']),ambitionbox.getUrl(company));

    let ambitionSalary = document.createElement('div');
    ambitionSalary.classList.add('custom-company-salary');
    let table = generateTable(salary);
    ambitionSalary.appendChild(table);
    ambitonDiv.appendChild(ambitionSalary);

    
    parentNode.appendChild(ambitonDiv);

}

function generateTable(salaryData){

    const data = salaryData;

    const table = document.createElement('div');
    table.classList.add('custom-company-table');
    let rows=[]
      // Generate table rows dynamically
      for (let i = 0; i < data.length; i++) {
        const row = `<div class='row' style="font-size:12px;padding:6px">
        <div style="text-decoration: underline;min-width:130px;flex:1">${data[i].name}</div> 
        <div style="min-width:130px;text-align:center;flex:1">
        <span> ₹ ${(parseFloat(data[i].min)/100000).toFixed(1)} -</span>
        <span>${(parseFloat(data[i].max)/100000).toFixed(1)} LPA </span>
        </div>
        <div style="text-align:center;flex:1"> ${data[i].points} Salaries </div>
        </div>`;
        rows += row;
      }
      table.innerHTML = rows;
      return table;

}

function kFormatter(num) {
	if (num > 9999) {
		return (num/10000).toFixed(1)*10 + 'k'
	}
    else if (num > 999) {
		return (num/1000).toFixed(1) + 'k'
	}
	else{
		return num;
	}
}

function appendCustomCompany(parentNode, company) {
    company = company.trim().split(' ').join('-').toLowerCase();
    processAmbitionBox(parentNode, company)
}
