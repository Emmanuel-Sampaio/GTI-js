const pokemonId = 1;


const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;


fetch(apiUrl)
  .then(response => {
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
 
    return response.json();
  })
  .then(data => {
   
    console.log('Dados do Pokémon:', data);
  })
  .catch(error => {
    
    console.error('Erro:', error);
  });
