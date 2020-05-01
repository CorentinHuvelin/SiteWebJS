"use strict";
import {Ville, Villes} from '../data/module2.mjs';
import useBeerApi from "../api.js";
//import
Vue.component('search', {//templates
    template: `<form @submit.prevent="handleSubmit">
                    <label for="textarea1">Ville</label>
                    <div class="input-field">
                    <input type="text" v-model="city" id="textarea1" class="autocomplete materialize-textarea" autocomplete="off">
                    </div>
                    <input type="submit" value="SEARCH" class="waves-light btn pulse"/>
                </form>
                `,
    data : function() {
        return {
            city: ""//input
        }},
    methods : {
        handleSubmit : function() {//méthode qui envoie les données 
            this.$emit('search-begin');//evenement qui gère la barre de recherche
            useBeerApi.bySearch(this.city).then(data => this.$emit('search-done', data.records));
        }        
    },
    mounted: function(){ 
        document.addEventListener('DOMContentLoaded', () => {
            const villes = new Villes();
            //on selectionne notre input pour nos recherches 
            const autocompleteZipCode = document.querySelector('.input-field').querySelector('.autocomplete');
            const options ={
                minLength : 2,
                data : {},
                sortFunction : (a,b) => a.localeCompare(b),
                limit: 10,
                onAutocomplete : (value) => {
                    this.city = value;//affecte la valeur à l'input
                }
            };
            //on initialise notre autocomplete sur notre input avec les options choisies
            const instanceAutoCompleteZipCode = M.Autocomplete.init(autocompleteZipCode, options);
            
            //on rajoute le listener à notre input, afin de modifier et afficher notre autocomplete
            autocompleteZipCode.addEventListener("keyup",function(){
                const ville = autocompleteZipCode.value;
                if (ville.length >= options.minLength) {
                    villes.getFromVille(ville).then(data => {
                       const tmp = data.map(obj => [obj.toString(), null]);
                       instanceAutoCompleteZipCode.updateData(Object.fromEntries(tmp));
                       
                    });
                }
            })
        });
    }
});