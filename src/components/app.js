Vue.component('app', {//description du template
    template: `<div  id="app"> 
                    <search @search-begin="searchBegin" @search-done="searchCompleted($event)"> </search>
                    <div v-show="load" class="progress">
                        <div class="indeterminate"></div>
                    </div>
                    <br/>
                    <div class="col s7">
                        <div class="row">
                            <brewery v-for="brewery in beweries" v-bind:key="brewery.fields.id" :brewery=brewery @search-begin="searchBegin" v-on:brewery-selected="brewerySelected($event)"> </brewery>
                        </div>
                    </div>
                    <div class="col s5">
                        <div class="row">
                            <detail v-bind:breweryId="selectedId" :key="selectedId" @search-finish="searchFinish()"> </detail>
                        </div>
                    </div>
               </div>`,
    data : function () {
        return {
            beweries: [],//ensembles des brasseries
            selectedId: null,//id de la brasserie selectionné
            load: false//variable d'affichage de la bar de recherche
    }},
    methods: {
        searchBegin : function(){//méthode de gestion d'affichage de la bar de recharge
          this.load = true;
        },
        searchFinish: function(){//méthode de gestion d'affichage de la bar de recharge
            this.load = false;
        },
        searchCompleted : function(data) {//méthode qui remplit le tableau de brasserie
           if (data != undefined) {
                this.beweries = removeDuplicates(data,"id");
                this.selectedId = null;
                this.searchFinish();
           }
        },
        brewerySelected : function(id){//fonction pour la bière
            this.selectedId=id;
        }}
})

function removeDuplicates(originalArray, prop) {//fonction pour supprimer les doublons
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}