class CACHE {

    name;

    put = function(key, value){
        let object = {}
        try{
            object = JSON.parse(localStorage.getItem(this.name));
        }catch(e){
            console.error(e);
        }
        if(object===null){
            object = {};
        }
        object[key] = value;
        localStorage.setItem(this.name,JSON.stringify(object));
    }

    get = function(key){
        try{
            return JSON.parse(localStorage.getItem(this.name))[key];
        }catch(e){
            console.error(e);
            return undefined;
        }
    }

    append = function(key, value){

        let data = this.get(key);

        if (!data) {
            data = [];
        }
        if(!Array.isArray(data)){
            data = [data]
        }
        data.push(value);
        this.put(key, data)
    }

    constructor(name) {
        this.name = name;
    }

}

