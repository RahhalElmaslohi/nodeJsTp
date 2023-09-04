import AbstractView from "./AbstractView.js";
export const API_KEY = '39077658-4ae1115a798a3457fa5c6c818';
export const recherche = 'Jaguar';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle('Images');
    }

    async getHtml() {
        
        const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(recherche);

        try {
            const response = await fetch(URL);
            const data = await response.json();

            if (parseInt(data.totalHits) > 0) {
                data.hits.forEach(hit => {
                    console.log(hit.pageURL);
                });
            } else {
                console.log('No hits');
            }

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

            return listImages;
        } catch (error) {
            console.error(error);
            return "An error occurred while fetching data.";
        }
    }
}
