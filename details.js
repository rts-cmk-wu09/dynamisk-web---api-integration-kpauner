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

const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data => {
            const species = data.species.url;
            fetch(species)
                .then(response => response.json())
                .then(speciesData => {
                
                    const article = document.createElement('article');
                    article.innerHTML = `
                    <img src="${data.sprites['front_default']}" alt="${data.name} image">
                    <span class="id">#${data.id}</span>
                    <h2 class="article-title">${data.name}</h2>
                    <div class="type-container flex">
                        <div class="type-container flex">
                            ${data.types.map(type => `<div class="${type.type.name} type">${type.type.name}</div>`).join("")}
                        </div>
                    </div>
                    <h3 class="entry">Pokedex Entry</h3>
                    <p class="description">${speciesData.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g,' ')}</p>
                    <h3 class="entry">Data</h3>
                    <div class="info-container">
                        <div class="info">
                            <span class="info-title">Weight</span>
                            <p class="data">${data.weight}</p>
                        </div>
                        <div class="info">
                            <span class="info-title">Experience</span>
                            <p class="data">${data.base_experience}</p>
                        </div>
                    </div>
                    `;
                    pokeLibrary.append(article)
                    article.setAttribute('id', `${data.name}`)
                    article.classList.add("details");
                })
        })
        .catch(error => console.error(error));
}

fetchPokemon();


