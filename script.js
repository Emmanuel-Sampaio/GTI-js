const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

function displayPokemon(pokemon) {
  const pokemonDiv = document.createElement('div');
  pokemonDiv.classList.add('pokemon');

  const anchorElement = document.createElement('a');
  anchorElement.href = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`;

  const imageUrl = pokemon.sprites.front_default;
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.classList.add('pokemon-image');
  anchorElement.appendChild(imgElement);

  const nameElement = document.createElement('p');
  nameElement.textContent = `Name: ${pokemon.name}`;
  anchorElement.appendChild(nameElement);

  const typeElement = document.createElement('p');
  typeElement.textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;
  anchorElement.appendChild(typeElement);

 
  let isGrass = false;
  pokemon.types.forEach(type => {
    const typeClass = type.type.name.toLowerCase();
    pokemonDiv.classList.add(typeClass);

    
    if (type.type.name === 'grass') {
      isGrass = true;
    }
  });

 
  if (isGrass) {
    pokemonDiv.classList.remove('poison');
  }

  pokemonDiv.appendChild(anchorElement);

  return pokemonDiv;
}

async function fetchAndDisplayAllPokemon(url) {
  const container = document.createElement('div');
  container.classList.add('pokemon-container');

  try {
    let nextUrl = url;

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

        
        if (pokemonData.id <= 151) {
          const pokemonElement = displayPokemon(pokemonData);
          container.appendChild(pokemonElement);
        }
      }

      nextUrl = data.next;
    }

    document.body.appendChild(container);
  } catch (error) {
    console.error('Erro ao carregar lista de Pokémon:', error);
  }
}


fetchAndDisplayAllPokemon(apiUrl);
