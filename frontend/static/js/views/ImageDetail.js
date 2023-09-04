// Import de la classe AbstractView depuis le module "AbstractView.js"
import AbstractView from "./AbstractView.js";

// Import des constantes API_KEY et recherche depuis le module "Images.js"
import { API_KEY, recherche } from './Images.js';

// Définition de la classe d'une vue spécifique pour les détails d'une image
export default class extends AbstractView {
  constructor(params) {
    super(params);
    // Définition du titre de la page
    this.setTitle('Image detail');
  }

  // Méthode asynchrone pour générer le contenu HTML de la vue
  async getHtml() {
    // Conversion de l'ID passé en paramètre en nombre
    const nu = Number(this.params.id);
    
    // Construction de l'URL de l'API Pixabay en utilisant l'API Key et la recherche
    const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(recherche);

    let data;

    try {
      // Envoi d'une requête à l'URL de l'API et attente de la réponse
      const response = await fetch(URL);
      // Conversion de la réponse en format JSON
      data = await response.json();

      // Vérification s'il y a des résultats (hits) dans la réponse
      if (parseInt(data.totalHits) > 0) {
        // Parcours de chaque résultat (hit) et affichage de l'URL de la page
        data.hits.forEach(hit => {
          console.log(hit.pageURL);
        });
      } else {
        console.log('No hits');
      }
    } catch (error) {
      // Gestion des erreurs en cas de problème lors de la requête
      console.error(error);
      return "An error occurred while fetching data.";
    }

    // Recherche de l'image correspondant à l'ID dans les données de l'API
    const image = data.hits.find(item => item.id === nu);

    // Construction de la structure HTML pour afficher les détails de l'image
    return `
      <li>
          <img src="${image.webformatURL}" alt="Image ${image.id}" data-link>
          <div class="info">
              <p>User: ${image.user}</p>
              <p>Likes: ${image.likes}</p>
              <p>Tags: ${image.tags}</p>
          </div>
      </li>
    `;
  }
}
