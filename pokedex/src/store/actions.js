export const fetchPoke = () => {
  return function (dispatch) {
    const promises = [];
    for (let i = 1; i <= 40; i++) {
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`, {
          headers: { "Content-type": "application/json" },
        }).then((res) => res.json())
      );
    }
    Promise.all(promises)
    .then((results) => {
      const pokemon = results.map((data) => ({
        name : data.name,
        id : data.id,
        image : data.sprites.other["official-artwork"]["front_default"],
        type : data.types.map(e => e.type.name),
      }))
        pokemon.forEach((e) => {
          if (e.type === "bug") {
            e.bg =
              "https://cdn.discordapp.com/attachments/956894472120205352/1022172306694484109/bug.jpg";
          } else if (e.type[0] === "electric" || e.type[1] === "electric") {
            e.bg =
              "https://cdn.discordapp.com/attachments/956894472120205352/1022172307164237834/electric.jpg";
          } else if (e.type[0] === "fire" || e.type[1] === "fire") {
            e.bg =
              "https://cdn.discordapp.com/attachments/956894472120205352/1022172307520757852/fire.jpg";
          } else if (e.type[0] === "flying" || e.type[1] === "flying") {
            e.bg =
              "https://cdn.discordapp.com/attachments/956894472120205352/1022172314432979045/flying.jpg";
          } else if (e.type[0] === "grass" || e.type[1] === "grass") {
            e.bg =
              "https://cdn.discordapp.com/attachments/956894472120205352/1022172315221504080/grass.jpg";
          } else if (e.type[0] === "poison" || e.type[1] === "poison") {
            e.bg =
              "https://cdn.discordapp.com/attachments/956894472120205352/1022172315989069864/poison.jpg";
          } else if (e.type[0] === "water" || e.type[1] === "water") {
            e.bg =
              "https://cdn.discordapp.com/attachments/956894472120205352/1022172316425269248/water.jpg";
          } else {
            e.bg =
              "https://cdn.discordapp.com/attachments/956894472120205352/1022172315590606928/other.jpg";
          }
        });
      dispatch({
        type: "fetch/success",
        payload: pokemon,
      });
    });
  };
};

export const fetchDetail = (id) => {
 
  return function (dispatch) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
       const about = {
         species: data.species.name,
         height: data.height,
         weight: data.weight,
         abilities: data.abilities.map((e) => e.ability.name),
       };
       const baseStats = data.stats;
       const moves = data.moves[0].move.name;
       const zip = [about, baseStats, moves]
        dispatch({
          type: "byid/success",
          payload: zip,
        });
      });
  };
};