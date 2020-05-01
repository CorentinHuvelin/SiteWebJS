Vue.component('brewery', {
    props: ["brewery"],//template
    template: `
    <div class="col l5 s10 m6">
        <div class="card medium z-depth-5"> 
            <div class="card-image ">
                <img src="../../assets/img/bistro.png" alt="">
            </div>      
            <div class="card-content">
                <p>Nom : {{brewery.fields.name_breweries}}</p>
                <br/>
                <div class="col s2 offset-s10">
                    <a class="btn-floating btn-small"><i class="material-icons right activator">more_vert</i></a>
                </div>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">{{brewery.fields.name_breweries}} <a class="btn-floating btn-small"><i class="material-icons right">close</i></a></span>
                <p>Pays : {{brewery.fields.country}}</p>
                <p>Ville : {{brewery.fields.city}}</p>
                <p>Adress : {{brewery.fields.address1}}</p>     
                <p>Téléphone : {{brewery.fields.phone}}</p>
            </div>
            <div class="card-action">
                <a href="#app" @click="handleSelected">Bière disponible à cette brasserie</a>
            </div>
        </div>
    </div>`,
    methods : {
        handleSelected : function() {
            this.$emit('search-begin')//evenement qui gère la barre de recherche
            this.$emit('brewery-selected',this.brewery.fields.id);
        }
    },

})