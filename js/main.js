const form = document.getElementById("pokemon-form");
const input = document.getElementById("pokemon-id");
const container = document.getElementById("pokemon-container");

const fetchPokemon = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) throw new Error("Pokémon no encontrado");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const createPokemonCard = (pokemon) => {
  const types = pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ");
  const height = (pokemon.height / 10).toFixed(1);
  const weight = (pokemon.weight / 10).toFixed(1);

  return `
    <div class="pokemon-card">
      <h2>${pokemon.name.toUpperCase()}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p><strong>Tipo:</strong> ${types}</p>
      <p><strong>Altura:</strong> ${height} m</p>
      <p><strong>Peso:</strong> ${weight} kg</p>
    </div>
  `;
};

const renderError = (message) => {
  container.innerHTML = `<p style="color: red;">${message}</p>`;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const pokemonId = input.value.trim();

  if (!pokemonId) {
    renderError("Por favor, ingresa un ID válido.");
    return;
  }

  try {
    const pokemon = await fetchPokemon(pokemonId);
    container.innerHTML = createPokemonCard(pokemon);
  } catch (error) {
    renderError("No se encontró el Pokémon. Intenta con otro ID.");
  }
});