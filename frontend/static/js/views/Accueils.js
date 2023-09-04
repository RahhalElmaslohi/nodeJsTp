// Import de la classe AbstractView depuis le module "AbstractView.js"
import AbstractView from "./AbstractView.js";

// Définition de la classe d'une vue spécifique pour la page d'accueil
export default class extends AbstractView {

    constructor(){
        super(); // Appel du constructeur de la classe parente AbstractView
        // Définition du titre de la page
        this.setTitle('Accueils');
    }

    // Méthode asynchrone pour générer le contenu HTML de la vue
    async getHtml() {
        return `
        <!-- En-tête de la page -->
        <header class="hero">
            <h1>Bienvenue sur notre site d'images</h1>
            <p>Découvrez des images magnifiques de notre collection</p>
        </header>

        <main>
            <!-- Titres informatifs -->
            <h1>College Maisonneuve</h1>
            <h2>Rahhal El Maslohi</h2>
            <h2>Projet Application en Node.js</h2>
            <h3>Professeur: Marcos Vinicius Sanches</h3>
        </main>

        <!-- Pied de page -->
        <footer>
            <p>&copy; 2023 Rahhal El maslohi. Tous droits réservés.</p>
        </footer>
        `;
    }
}
