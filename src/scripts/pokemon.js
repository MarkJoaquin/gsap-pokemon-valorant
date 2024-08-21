$(() => {
  let offset = 0;

  // Fetch data from the PokeAPI

  const fetchPokemonData = () =>
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`,
      success: (data) => {
        // console.log(data.results.name[0][1]);
      },
    });

  const displayPokemonName = (pokemon) =>
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/`,
      success: (data) => {
        // console.log(data);
        const pokemonCard = $(
          `<div class="pokemon__card"><p>${data.name}</p></div>`
        );

        $(".pokemon__container").append(pokemonCard);

        pokemonCard.on("click", () => {
          displayPokemonImage(pokemon, pokemonCard);
        });
      },
    });

  const displayPokemonImage = (pokemon, pokemonCard) =>
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/`,
      success: (data) => {
        // console.log(data);

        pokemonCard.prepend(
          `<div class="pokemon__image"><img src="${data.sprites.front_default}"></div>`
        );
      },
    });

  $("#fetch").on("click", async () => {
    const pokemonData = await fetchPokemonData(offset);
    console.log(pokemonData);

    $.each(pokemonData.results, (index, pokemon) => {
      // console.log(pokemon.name);
      displayPokemonName(pokemon.name);
    });
    offset += 10;
  });
});
