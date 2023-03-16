const body = document.querySelector('body');
const main = document.querySelector('main')

const libraryContainer = document.createElement('div')
libraryContainer.classList = "flex w-100 border-t";
const pokeLibrary = document.createElement('section')
pokeLibrary.classList= "grid p-3";
const searchContainer = document.createElement('aside')
searchContainer.classList = "p-3";

main.append(libraryContainer);
libraryContainer.append(searchContainer);
libraryContainer.append(pokeLibrary);

const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=40`)
        .then(response => response.json())
        .then(data => {
            const pokemons = data.results.map(async pokemon => {
                const response = await fetch(pokemon.url);
                const data = await response.json();
                return ({
                    id: data.id,
                    name: data.name,
                    types: data.types.map(type => type.type.name),
                    sprite: data.sprites['front_default']
                });
            });
            return Promise.all(pokemons);
        })
        .then(pokemons => {
            console.log(pokemons);
            pokemons.forEach(pokemon => {
                const article = document.createElement('article');
                article.innerHTML = `
                <img src="${pokemon.sprite}" alt="">
                <h2 class="article-title">${pokemon.name}</h2>
                <div class="type-container flex">${pokemon.types.map(type => `<div class="type ${type}">${type}</div>`).join("")}</div>
                `;
                pokeLibrary.append(article)
                article.classList = "card";
            })
        })
        .then(pokemons => {
            console.log(pokemons);
            searchContainer.innerHTML = `
                <form class="searchfilter">
                    <input type="search" name="search" placeholder="Search Pokemon">
                </form>
                <ul>
                
                </ul>
            `;
        })
        .catch(error => console.error(error));
}

fetchPokemon();

