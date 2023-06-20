//functions for formatting
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}


document.querySelector("#search").addEventListener("click", getPokemons);


function getPokemons(e) {
  const name = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(name);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      //Formatting for data fetched thru html
      document.querySelector(".pokemonBox").innerHTML = `
      <div>
        <img class ="pokemonInfosImg"
          src="${data.sprites.front_default}"
          alt="Pokemon name"
        />
      </div>
      <div class="pokemonInfos">
        <h1>${capitalizeFirstLetter(data.name)}</h3>
        <p>ID Number: ${data.id}</p>
        <p>Type: ${capitalizeFirstLetter(data.types[0].type.name)}</p>
        <p>Weight: ${data.weight}</p>
      </div>`;
      document.querySelector("#clearButton").style.display = "block";
    })
    .catch((err) => {
      document.querySelector(".pokemonBox").innerHTML = `
      <h4>Error! Pokemon Not Found!</h4>
      `;
      console.log("Pokemon not found.", err);
    });

  e.preventDefault();
}


document.querySelector("#clearButton").addEventListener("click", clearPokemon);

//After search, makes the button disappear along with the query 
function clearPokemon() {
  document.querySelector(".pokemonBox").innerHTML = "";
  document.querySelector("#pokemonName").value = "";
  document.querySelector("#clearButton").style.display = "none";
}
