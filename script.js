const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const selectedPokemons = [];

function toggleSelection(pokemon) {
  const index = selectedPokemons.findIndex(p => p.id === pokemon.id);

  if (index === -1) {
    if (selectedPokemons.length < 6) {
      selectedPokemons.push(pokemon);
    } else {
      alert('Você já selecionou 6 Pokémon!');
    }
  } else {
    selectedPokemons.splice(index, 1);
  }

  updatePokemonSelection(pokemon);
}

function updatePokemonSelection(pokemon) {
  const pokemonDiv = document.getElementById(`pokemon-${pokemon.id}`);
  const imgElement = pokemonDiv.querySelector('.pokemon-image');

  if (selectedPokemons.find(p => p.id === pokemon.id)) {
    pokemonDiv.classList.add('selected');
    imgElement.classList.add('selected-image');
  } else {
    pokemonDiv.classList.remove('selected');
    imgElement.classList.remove('selected-image');
  }
}

async function fetchAndDisplayAllPokemon(url) {
  const container = document.getElementById('pokemonContainer');

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
  } catch (error) {
    console.error('Erro ao carregar lista de Pokémon:', error);
  }
}

function displayPokemon(pokemon) {
  const pokemonDiv = document.createElement('div');
  pokemonDiv.classList.add('pokemon');
  pokemonDiv.id = `pokemon-${pokemon.id}`;
  pokemonDiv.style.cursor = 'pointer'; 

 
  pokemonDiv.addEventListener('click', () => toggleSelection(pokemon));

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

  return pokemonDiv;
}

fetchAndDisplayAllPokemon(apiUrl);

function adicionarPokemons() {
  if (selectedPokemons.length > 0) {
    const dialog = document.createElement('div');
    dialog.classList.add('pokemon-dialog');

    selectedPokemons.forEach(pokemon => {
      const pokemonInfo = document.createElement('div');
      pokemonInfo.innerHTML = ` 
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Name: ${pokemon.name}</p>
        <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
      `;
      dialog.appendChild(pokemonInfo);
    });

   
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;'; 
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', fecharAlerta);
    dialog.appendChild(closeButton);

    document.body.appendChild(dialog);

    function fecharAlerta() {
      document.body.removeChild(dialog);
    }
  } else {
    alert('Nenhum Pokémon selecionado.');
  }
}





