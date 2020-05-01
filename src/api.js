const useBeerApi = {

    bySearch: (search) => new Promise((resolve, reject) => {//Recherche de la brasserie
        const BEER_API_URL = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database-breweries%40public-us&refine.city=${search}`;
       
        fetch(BEER_API_URL)
            .then(response => response.json())
            .then(jsonResponse => resolve(jsonResponse))
            .catch((err) => reject(err))
    }),
    byId : (search) => new Promise((resolve, reject) => {//recherche des bière d'une brasserie spécifique
        const BEER_API_URL = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&refine.brewery_id=${search}`;
        
        fetch(BEER_API_URL)
            .then(response => response.json())
            .then(jsonResponse => resolve(jsonResponse))
            .catch((err) => reject(err))
    })
};

export default useBeerApi;

