const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

function displayPokemon(pokemon) {
  const pokemonDiv = document.createElement('div');
  pokemonDiv.classList.add('pokemon');

  const imageUrl = pokemon.sprites.front_default;
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.classList.add('pokemon-image');
  pokemonDiv.appendChild(imgElement);

  const nameElement = document.createElement('p');
  nameElement.textContent = `Name: ${pokemon.name}`;
  pokemonDiv.appendChild(nameElement);

  const typeElement = document.createElement('p');
  typeElement.textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;
  pokemonDiv.appendChild(typeElement);

  return pokemonDiv;
}

async function fetchAndDisplayAllPokemon(url) {
  const container = document.createElement('div');
  container.classList.add('pokemon-container');

  let nextUrl = url;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      const pokemons = data.results;

      for (const pokemon of pokemons) {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        const pokemonElement = displayPokemon(pokemonData);
        container.appendChild(pokemonElement);
      }

      nextUrl = data.next;
    }

    document.body.appendChild(container);
  } catch (error) {
    console.error('Erro ao carregar lista de Pokémon:', error);
  }
}


fetchAndDisplayAllPokemon(apiUrl);
