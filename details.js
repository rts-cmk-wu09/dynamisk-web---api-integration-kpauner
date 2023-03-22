import axios from "../node_modules/axios/dist/esm/axios.js";

const body = document.querySelector('body');
const main = document.querySelector('main')

const libraryContainer = document.createElement('div')
libraryContainer.classList = "flex w-100";
const pokeLibrary = document.createElement('section')
pokeLibrary.classList= "p-3";

main.append(libraryContainer);
libraryContainer.append(pokeLibrary);

const params = new URLSearchParams(window.location.search);
const pokemonId = params.get('name');

// axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })

const fetchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => {
            const species = response.data.species.url;
            axios.get(species)
                .then(speciesData => {
                
                    const article = document.createElement('article');
                    article.innerHTML = `
                    <img src="${response.data.sprites['front_default']}" alt="${response.data.name} image">
                    <span class="id">#${response.data.id}</span>
                    <h2 class="article-title">${response.data.name}</h2>
                    <div class="type-container flex">
                        <div class="type-container flex">
                            ${response.data.types.map(type => `<div class="${type.type.name} type">${type.type.name}</div>`).join("")}
                        </div>
                    </div>
                    <h3 class="entry">Pokedex Entry</h3>
                    <p class="description">${speciesData.data.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g,' ')}</p>
                    <h3 class="entry">Data</h3>
                    <div class="info-container">
                        <div class="info">
                            <span class="info-title">Weight</span>
                            <p class="data">${response.data.weight}</p>
                        </div>
                        <div class="info">
                            <span class="info-title">Experience</span>
                            <p class="data">${response.data.base_experience}</p>
                        </div>
                    </div>
                    `;
                    pokeLibrary.append(article)
                    article.setAttribute('id', `${response.data.name}`)
                    article.classList.add("details");
                })
        })
        .catch(error => console.error(error));
}

fetchPokemon();


