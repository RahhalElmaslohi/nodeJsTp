// Import de la classe AbstractView depuis le module "AbstractView.js"
import AbstractView from "./AbstractView.js";

// Définition des constantes pour l'API Key et la recherche
export const API_KEY = '39077658-4ae1115a798a3457fa5c6c818';
export const recherche = 'dogs';



export default class extends AbstractView {
    constructor() {
        super();
        // Définition du titre de la page
        this.setTitle('Images');
    }

    // Méthode asynchrone pour générer le contenu HTML de la vue
    async getHtml() {
        // Construction de l'URL de l'API Pixabay en utilisant l'API Key et la recherche
        const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(recherche);

        try {
            // Envoi d'une requête à l'URL de l'API et attente de la réponse
            const response = await fetch(URL);
            // Conversion de la réponse en format JSON
            const data = await response.json();

            // Vérification s'il y a des résultats (hits) dans la réponse
            if (parseInt(data.totalHits) > 0) {
                // Parcours de chaque résultat (hit) et affichage de l'URL de la page
                data.hits.forEach(hit => {
                    console.log(hit.pageURL);
                });
            } else {
                console.log('No hits');
            }

            // Construction d'une liste d'images en HTML en utilisant les données de l'API
            let listImages = "<ul class='image-list'>";
            data.hits.forEach((hit, i) => {
                listImages += `
                    <li>
                    <a href="/image-detail/${data.hits[i].id}" data-link>
                    <img src="${data.hits[i].webformatURL}" alt="Image ${i}">
                   </a>
                   </li>`;
            });

            listImages += "</ul>";

            // Retourne la liste d'images pour affichage dans la vue
            return listImages;
        } catch (error) {
            // Gestion des erreurs en cas de problème lors de la requête
            console.error(error);
            return "An error occurred while fetching data.";
        }
    }

    // Méthode appelée après le rendu HTML dans le DOM
    afterRender() {
        // écouteur de clic sur la liste <ul> pour gérer les liens générés dynamiquement
        const ul = document.querySelector('.image-list');
        ul.addEventListener('click', (e) => {
            if (e.target.matches('a[data-link]')) {
                e.preventDefault();
                const url = e.target.getAttribute('href');
                if (url.startsWith('/image-detail/')) {
                    const id = url.split('/image-detail/')[1];
                    navigateTo(`/image-detail/${id}`); 
                } else {
                    navigateTo(url);
                }
            }
        });
    }
}
