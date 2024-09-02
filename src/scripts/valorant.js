$(() => {
  const fetchValorantData = () => {
    $.ajax({
      url: "https://valorant-api.com/v1/agents",
      type: "GET",
      success: (data) => {
        console.log(data);
        // valorantCard = $(`<div class='valorant__card${i}'> </div>`);
        $.each(data.data, (i, agent) => {
          console.log(agent);

          let valoranCard = $(
            `<div class="valorant__card" id="valorant__card${i}"><p id="valorant__name${i}">${agent.displayName}</p> </div>`
          );
          // console.log(valoranCard);
          if (agent.isPlayableCharacter === true) {
            /* console.log(agent.displayName);
              console.info(i) */ $(".valorant__container").append(valoranCard);
          }

          gsap.from(`#valorant__card${i}`, {
            y: -1200,
            opacity: 0,
            duration: 1.2,
            ease: "power4.inOut",
          });

          $(`#valorant__card${i}`).on("click", () => {
            $(`#valorant__card${i}`).css({
              display: "flex",
              "flex-direction": "row",
            });
            $(`#valorant__card${i}`)
              .append(
                `<img id="valorant__image${i}" src="${agent.fullPortrait}">`
              )
              .off();

            gsap.from(`#valorant__image${i}`, {
              opacity: 0,
              y: -100,
              duration: 1,
              scale: 10,
              ease: "expo.inOut",
            });

            gsap.to(`#valorant__name${i}`, {
              opacity: 1,
              duration: 3,
              ease: "power4.inOut",
              onStart: function () {
                $(`#valorant__name${i}`).css({
                  "writing-mode": "vertical-rl",
                  "text-orientation": "upright",
                  "font-size": "1.5rem",
                });
              },
              y: 80,
              x: -50,
            });

            gsap.to(`#valorant__image${i}`, {
              opacity: 1,
              y: 0,
              duration: 1,
              scale: 3.5,
              ease: "expo.inOut",
              filter: "drop-shadow(0 0 0.5rem #73777f)",
            });
          });
        });
      },
      error: () => {
        console.log("error fetching data");
      },
    });
  };
  fetchValorantData();
});
