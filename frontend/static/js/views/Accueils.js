import AbstractView from "./AbstractView.js"

export default class extends AbstractView {

    constructor(){
        super()
        this.setTitle('Accueils')
    }

    async getHtml() {
        return `
        
    <header class="hero">
        <h1>Bienvenue sur notre site d'images</h1>
        <p>Découvrez des images magnifiques de notre collection</p>
    </header>

    <main>
    <h1>College Maisonneuve</h1>
    <h2>Rahhal El Maslohi</h2>
    <h2>Projet Application en Node.js</h2>
    <h3>Professeur: Marcos Vinicius Sanches</h3>

    
   </main>


    <footer>
        <p>&copy; 2023 Rahhal El maslohi. Tous droits réservés.</p>
    </footer>


        `
    }
}