// const gamesCarousel = document.getElementById("games-carousel");
const gamesCards = document.getElementById("games-cards");

// Creo array de games para simular localStorage
const newGamesHarcodeados = [
  {
    //datos para usuario
    id: "1",
    titulo: "DBZ Kakarot",
    precio: "1500.00",
    url: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628382772/Video%20Games/dbz1_dlrgll.jpg",
    // datos para carrusel
    src1: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628383101/Video%20Games/wp5117132_pvxabh.jpg",
    src2: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628382791/Video%20Games/wallpapersden.com_dragon-ball-z-kakarot-game-poster_1920x1080_trerme.jpg",
    categoria1: "Acción",
    categoria2: "Cooperativo",
    categoria3: "Violencia",
    compatibilidad1: '<i class="fab fa-windows me-2">',
    compatibilidad2: '<i class="fab fa-apple"></i>',
    //datos para cards
    src: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628380011/Video%20Games/spotlight_image_english_kivm2z.jpg",
    fechaLimite: "19/8/21",
    descuento: "-50%",
    nuevoPrecio: "750.00",
  },
];

//para simular que verdaderamente viene de local storage pusheamos y luego traemos
localStorage.setItem("games", JSON.stringify(newGamesHarcodeados));
const gamesJSON = localStorage.getItem("games");
let games = JSON.parse(gamesJSON) || [];
//Estoy tomando estos games de LS
console.log(games);

// CARDS DE VIDEO GAMES

// funcion que me renderice los games para mostrar al usario en cards
function mostrarCardsGames() {
  const contenido = games.map((game) => {
    // console.log(usuario.id);
    return `  
    <div class="card-game">
          <div>
              <img src="${game.src}"
                  class="card-img-top" alt="game-img">
          </div>
          <div class="card-description">
              <div class="d-flex flex-column justify-content-center align-items-start mx-2 py-2 ">
                  <h3>Oferta del mes</h3>
                  <h5>¡ Fecha limite ${game.fechaLimite}!</h5>
              </div>
              <div class="m-0 row  ">
                  <div class="col-3 card-oferta d-flex justify-content-center align-items-center">
                      <span>${game.descuento}</span>
                  </div>
                  <div class="col-9 card-precio">
                      <span><s>ARS$ ${game.precio}</s></span>
                      <span><i>ARS$ ${game.nuevoPrecio}</i></span>
                  </div>
              </div>
          </div>
      </div>
       `;
  });
  console.log(contenido.join(""));
  const allHtmlcontent = contenido.join("");
  gamesCards.innerHTML = allHtmlcontent;
}
mostrarCardsGames();

// CAROUSEL VIDEO GAMES

// CREAR CAROUSEL 
