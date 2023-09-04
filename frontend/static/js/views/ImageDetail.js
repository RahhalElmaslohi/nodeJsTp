import AbstractView from "./AbstractView.js";
import {API_KEY, recherche } from './Images.js';

export default class extends AbstractView {
  constructor(params){
    super(params)
    this.setTitle('Image detail');
  }

  async getHtml() {
    const nu = Number(this.params.id);
    
    const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(recherche);

    let data;

    try {
      const response = await fetch(URL);
      data = await response.json();

      if (parseInt(data.totalHits) > 0) {
        data.hits.forEach(hit => {
          console.log(hit.pageURL);
        });
      } else {
        console.log('No hits');
      }
    } catch (error) {
      console.error(error);
      return "An error occurred while fetching data.";
    }

    const image = data.hits.find(item => item.id === nu);

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
