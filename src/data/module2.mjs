import {Ville} from './module1.mjs';


class Villes
{
    villes;
    constructor() {
        //fait un tableau de villes
        this.villes = new Array();
    }
    //recupere dans l'api les villes commençant par le string "city"
    getFromVille(city){ return new Promise((resolve, reject) => {
    
       const urlBase = 'https://data.opendatasoft.com/api/records/1.0/search/';
       const dataset =  'open-beer-database-breweries%40public-us';
       const facets= 'facet=city';
       const rows = -1;
        //l'URL De notre database, la partie &q=%23startswith(city,' permet de rechercher dans l'API via l'URL
        let url =  urlBase+'?dataset='+dataset+'&q=%23startswith(city,'+city+')&'+facets+"&rows="+rows;
        fetch(url).
        then((response) => response.json()).
        then(data => {
            // on recupere la valeur stockée comme nom de ville dans l'API
            this.villes = data.records.map(item => item.fields).
            map(obj => new Ville(obj.city));
            resolve(this.villes);
        }).
        catch(()=> {
            this.villes = new Array();
            reject(this.villes);
        });

    })};

    toString(){
        let accumulator ='';
        return this.villes.reduce((accumulator, ville) =>accumulator+ville+', ' );
    }
}


export  {Ville, Villes};









