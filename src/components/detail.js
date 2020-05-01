import useBeerApi from "../api.js";

Vue.component('detail', {
    props: ["breweryId"],
    template: `
    <div>
    <p v-show="noBeer"> Pas de bière pour cette brasserie </p>
    <table class="responsive-table" v-show="display">
        <tr colspan="3"><th>Bière disponible à {{name}}</th></tr>
        <tr>
            <td>Nom</td>
            <td>Degré</td>
            <td>Style</td>
        </tr>
       <tbody v-for="beer in beers">
            <tr>
                <td>{{beer.fields.name}}</td>
                <td>{{beer.fields.abv}}°</td>
                <td>{{beer.fields.style_name}}</td>
            </tr>
      </tbody>
  </table>
  </div>`,
    data : function() {
        return {
            beers : [],//tableau de bières
            name: "",//nom de la brasserie
            display: false,//affichage ou non du tableau descriptif des bières
            noBeer: false//si aucune bières n'existe
        }
    },
    mounted(){
        if (this.breweryId != undefined) {
            useBeerApi.byId(this.breweryId).then(data => {
                if(data.nhits != 0){//Si la brasserie possède des bières
                    this.beers = data.records;
                    this.name = this.beers[0].fields.name_breweries;//affecte le nom de la brasserie
                    this.display = !this.display;
                    this.$emit('search-finish');//evenement qui gère l'affichage de la barre de chargement
                }else{
                    this.noBeer = true;
                    this.$emit('search-finish');//evenement qui gère l'affichage de la barre de chargement
                }
            });
        }
    }
})