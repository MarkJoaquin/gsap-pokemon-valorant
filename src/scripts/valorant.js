$(() => {

  const fetchValorantData = 
    () => {
      $.ajax({
        url: "https://valorant-api.com/v1/agents",
        type: "GET",
        success: (data) => {
          console.log(data);
          // valorantCard = $(`<div class='valorant__card${i}'> </div>`);
          $.each(data.data, (i, agent)=>{

            let valoranCard = $(`<div class="valorant__card" id="valorant__card${i}"><p>${agent.displayName}</p> </div>`);
            // console.log(valoranCard);
            if(agent.isPlayableCharacter === true){  
              /* console.log(agent.displayName);
              console.info(i) */;
              $('.valorant__container').append(valoranCard);
            }

            gsap.from(`#valorant__card${i}`, {
              y: -1200,
              opacity: 0,
              duration: 1.2,
              ease: "power4.inOut",
              
            })

            $(`#valorant__card${i}`).on('click', ()=>{
              $(`#valorant__card${i}`).append(`<img id="valorant__image${i}" src="${agent.displayIcon}">`).off();

              gsap.from(`#valorant__image${i}`, {
                opacity: 0,
                y: -100,
                duration: 1,
                scale: 10,
                ease: "expo.inOut",
              })
            });

          })
        },
        error: () => {
          console.log("error fetching data");
        },
      });
    };
    fetchValorantData();
});
