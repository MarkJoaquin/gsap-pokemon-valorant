$(() => {
  let offset = 0;

  // Fetch data from the PokeAPI

  const fetchPokemonData = () =>
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`,
      success: (data) => {
        // console.log(data.results.name[0][1]);
      },
      error: () => {
        console.log("error fetching data");
      },
    });

  const displayPokemonName = (pokemonName) =>
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`,
      success: (data) => {
        console.log(data);
        const pokemonCard = $(
          `<div class="pokemon__card" id="pokemon__card${data.id}"><p class="pokemon__name">${data.name}</p></div>`
        );

        $(".pokemon__container").append(pokemonCard);
        // console.log(`#pokemon__card${data.id}`);

        gsap.from(`#pokemon__card${data.id}`, {
          opacity: 0,
          y: -100,
          duration: 1.5,
          ease: "power4.inOut",
        });

        gsap.to(".pokemon__name", {
          delay: 1.5,
          duration: 1.5,
          y: -20,
          ease: "back.in(1.7)",
          scale: 1.1,
        });

        pokemonCard.on("click", () => {
          displayPokemonImage(pokemonName, pokemonCard);
        });
      },
      error: () => {
        console.log("error displaying name");
      },
    });

  const displayPokemonImage = (pokemonName, pokemonCard) =>
    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`,
      success: (data) => {
        // console.log(data);

        pokemonCard
          .append(
            `<div class="pokemon__image" id="pokemon__image${data.id}"><img src="${data.sprites.front_default}"></div>`
          )
          .off();

        gsap.from(`#pokemon__image${data.id}`, {
          opacity: 0,
          y: -100,
          duration: 1.2,
          ease: "bounce.out",
          scale: 15,
        });

        gsap.to(`#pokemon__image${data.id}`, {
          delay: 1.5,
          duration: 1.5,
          ease: "power1.inOut",
          scale: 1.6,
        });


      },
      error: () => {
        console.log("error displaying image");
      },
    });

  $("#fetch").on("click", async () => {
    const pokemonData = await fetchPokemonData(offset);
    console.log(pokemonData);

    $.each(pokemonData.results, (index, pokemon) => {
      // console.log(pokemon.name);
      displayPokemonName(pokemon.name);
    });

    $(".gif_container").css({
      index: -1,
      display: "none",
    });

    offset += 10;
  });
});
