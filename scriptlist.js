//Constant variables
const pokemonCount = 300;
const initialPokemonCount = 10;
var loadedPokemonCount = 0;
var pokedex = {};
var currentPokemonId = 1; // Keep track of the currently displayed Pokemon

//capitalizes first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//appears on window load
window.onload = async function () {
    //gets the first 10 pokemon
    for (let i = 1; i <= initialPokemonCount; i++) {
        await getPokemon(i);
        createPokemonCard(i);
    }
    //more details about pokemon
    document.getElementById("height").innerHTML = 'Height: ' + pokedex[1].height;
    document.getElementById("pokemon-description").innerText = pokedex[1].desc;
    document.getElementById("name").innerHTML = 'Name: ' + capitalizeFirstLetter(pokedex[1].name);
    document.getElementById("weight").innerHTML = 'Weight: ' + pokedex[1].weight;
    document.getElementById("load-more-button").addEventListener("click", loadMorePokemon);
    console.log(pokedex);
}

//get pokemon fxn
async function getPokemon(num) {
    //gets url based on id num
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonWeight = pokemon["weight"];
    let pokemonHeight = pokemon["height"];

    let pokemonStat = pokemon["stats"][0]["base_stat"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();
    //declares needed info
    pokemonDesc = pokemonDesc["flavor_text_entries"][8]["flavor_text"];
    pokedex[num] = {
        "name": pokemonName,
        "img": pokemonImg,
        "types": pokemonType,
        "desc": pokemonDesc,
        "weight": pokemonWeight,
        "height": pokemonHeight,

    };
}

//creates the cards of pokemon
function createPokemonCard(pokemonId) {
    let pokemon = document.createElement("div");
    pokemon.id = pokemonId;
    //html format for cards 
    pokemon.innerHTML = `
    <div class="maincard">
      <div class="card-body">
        <img id="pokemon-img" class="img" src="${pokedex[pokemonId].img}" alt="Pokemon name"/>
        <h5>${capitalizeFirstLetter(pokedex[pokemonId].name)}</h5>
        <p>ID Number: ${pokemonId}</p>
        <p>Type: ${capitalizeFirstLetter(pokedex[pokemonId].types[0].type.name)}</p>
        <p>Weight: ${pokedex[pokemonId].weight}</p>
      </div>
    </div>`;
    pokemon.classList.add("pokemon-name");
    pokemon.addEventListener("click", updatePokemon);
    document.getElementById("pokemon-list").append(pokemon);
}

//loads the remaining number of pokemons
function loadMorePokemon() {
    const loadButton = document.getElementById("load-more-button");
    loadButton.disabled = true;
    loadButton.textContent = "Loading...";

    const loadCount = pokemonCount - initialPokemonCount; //decrements number of pokemon left to load

    for (let i = 1; i <= loadCount; i++) {
        const pokemonId = initialPokemonCount + i;
        getPokemon(pokemonId)
            .then(() => {
                createPokemonCard(pokemonId);

                loadedPokemonCount++;
                if (loadedPokemonCount === pokemonCount) {
                    loadButton.style.display = "none"; 
                }
                //makes the load more button disappear
                loadButton.style.display = "none";
            })
            .catch((error) => {
                console.error("Error loading Pokemon:", error);

            });
    }
}


function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
    //updates the pokemon information
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //updates types 
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = capitalizeFirstLetter(types[i]["type"]["name"]);
        type.classList.add("type-box");
        typesDiv.append(type);
    }

    //updates description

    document.getElementById("pokemon-description").innerHTML = pokedex[this.id]["desc"];
    document.getElementById("height").innerHTML = 'Height: ' + pokedex[this.id]["height"];
    document.getElementById("name").innerHTML = 'Name: ' + capitalizeFirstLetter(pokedex[this.id]["name"]);
    document.getElementById("weight").innerHTML = 'Weight: ' + pokedex[this.id]["weight"];

}


