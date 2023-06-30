class AmbitionBox {

    BASEURL = 'https://www.ambitionbox.com';
    cache = new CACHE('ambitionBox');

    /*
        {
            'ambitionBox':{
                'oracle':{
                    'id':1,
                    'salary':{
                        'SSE':'20L-30L',
                        'SE':'10L-12L'
                    },
                    'ratings':{
                        'stars':3.5,
                        'count':1225
                    }
                }
            }
        }
    */

    getId = async (company) => {

        let companyData = this.cache.get(company);
        if(companyData && companyData['id']){
            if(new Date(companyData['expiryDate']).getTime()>=(new Date()).getTime()){
               return companyData['id'];
            }
        }
        
        ///api/v2/search?query=net%20analytiks&category=all&type=companie
        let response = await sendRequest(`${this.BASEURL}/api/v2/company/${company}`)
       
        try{
            let expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7);
            let id=undefined;
            if(response['data'].length==0){
                let _company = await sendRequest(`${this.BASEURL}/search?CompanyName=${company}&Type=CompanyReview`,true)
                response = await sendRequest(`${this.BASEURL}/api/v2/company/${_company}`)
            }

            id = response['data']['CompanyId'];
            
            if(id){
                this.cache.put(company, {
                    id,
                    expiryDate,
                });
            }
            return id;
        }catch(e){
            
            console.error(e);
            return undefined;
        }
    }


    getSalaries = async (company) => {
        let companyData = this.cache.get(company);
        if(!companyData['salary']){
            let response = await sendRequest(`${this.BASEURL}/salaries-services/v0/api/v5/salaries/company/${companyData['id']}/company-salary-data?division=engineering-software-qa`)
            let jobProfiles = response['data']['jobProfiles'];

            jobProfiles = jobProfiles.reduce((a,b)=>{
                a.push({name:b.jobProfileName,avg:b.avgCtc,points:b.dataPoints,min:b.minCtc,max:b.maxCtc});
            return a;},[])

            companyData['salary'] = jobProfiles;
            this.cache.put(company, companyData);
        }
        return companyData['salary'];
        
    }

    getReviews = async (company) => {
        let companyData = this.cache.get(company);

        if(!companyData['ratings']){
            let response = await sendRequest(`${this.BASEURL}/api/v2/reviews/rating-distribution/${companyData['id']}`)
            let ratings = {
                totalCount:response['data']['TotalCount'],
                avgRating:response['data']['Distribution']
            }
            ratings.avgRating = ratings.avgRating.reduce((sum,curr)=>sum+curr.Percent*curr['Rating'],0)
            ratings.avgRating = ratings.avgRating/100;
            companyData['ratings']=ratings;
            this.cache.put(company, companyData);
        }
        return companyData['ratings'];
    }

    getUrl = (company)=>{
        return `${this.BASEURL}/search?CompanyName=${company}&Type=CompanyReview`;
    }

}

