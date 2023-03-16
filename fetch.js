const body = document.querySelector('body');
const main = document.querySelector('main')

const libraryContainer = document.createElement('div')
libraryContainer.classList = "flex w-100";
const pokeLibrary = document.createElement('section')
pokeLibrary.classList= "grid p-3";
const searchContainer = document.createElement('aside')
searchContainer.classList = "p-3";

main.append(libraryContainer);
libraryContainer.append(searchContainer);
libraryContainer.append(pokeLibrary);

const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=20`)
        .then(response => response.json())
        .then(data => {
            const pokemons = data.results.map(async pokemon => {
                const response = await fetch(pokemon.url);
                const data = await response.json();
                return ({
                    id: data.id,
                    name: data.name,
                    types: data.types.map(type => type.type.name),
                    sprite: data.sprites['front_default'],
                });
            });
            return Promise.all(pokemons);
        })
        .then(pokemons => {
            pokemons.forEach(pokemon => {
                const article = document.createElement('article');
                article.innerHTML = `
                <img src="${pokemon.sprite}" alt="">
                <a href="details.html?name=${pokemon.name}"><h2 class="article-title">${pokemon.name}</h2></a>
                <div class="type-container flex">${pokemon.types.map(type => `<div class="type ${type}">${type}</div>`).join("")}</div>
                `;
                pokeLibrary.append(article)
                article.setAttribute('id', `${pokemon.name}`)
                article.classList.add("card")
            })
            searchContainer.innerHTML = `
                <form class="searchfilter">
                    <input type="search" id="search" placeholder="Search Pokemon" data-search>
                </form>
            `;

            const searchInput = document.querySelector('[data-search]')
            
            searchInput.addEventListener("input", e => {
                const value = e.target.value;
                pokemons.forEach(pokemon => {
                    const isVisible = pokemon.name.includes(value);
                    const pokemonElement = document.getElementById(`${pokemon.name}`);
                    pokemonElement.classList.toggle("hide", !isVisible);
                })
            })
        })
        .catch(error => console.error(error));
}

fetchPokemon();


