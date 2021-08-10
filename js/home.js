// const gamesCarousel = document.getElementById("games-carousel");
const gamesCards = document.getElementById("games-cards");
const gamesCarousel = document.getElementById("games-carousel");
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
    categoria2: "Anime",
    //datos para cards
    src: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628380011/Video%20Games/spotlight_image_english_kivm2z.jpg",
    fechaLimite: "19/8/21",
    descuento: 50,
  },
  {
    //datos para usuario
    id: "2",
    titulo: "Pubg",
    precio: "500.00",
    url: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628178941/Video%20Games/pugb1_kwch2r.jpg",
    // datos para carrusel
    src1: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628178948/Video%20Games/pugb2_wm9cuj.jpg",
    src2: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628179322/Video%20Games/pugb3_icejl5.jpg",
    categoria1: "Acción",
    categoria2: "Cooperativo",
    //datos para cards
    src: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628534013/Video%20Games/pugb-card_kr0rfo.jpg",
    fechaLimite: "19/8/21",
    descuento: 30,
  },
  {
    //datos para usuario
    id: "3",
    titulo: "Mortal Kombat",
    precio: "2000.00",
    url: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628620290/Video%20Games/mortalkombat/mortalkombaturl_1_kjuf4z.jpg",
    // datos para carrusel
    src1: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628620364/Video%20Games/mortalkombat/mortalkombatSRC1_pe7qit.jpg",
    src2: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628620241/Video%20Games/mortalkombat/mortalkombatSRC2_dhmn0w.jpg",
    categoria1: "Acción",
    categoria2: "Versus",
    //datos para cards
    src: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628619786/Video%20Games/mortalkombat/mortalkombat_cv9q5s.jpg",
    fechaLimite: "19/8/21",
    descuento: 5,
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
                  class="card-img-top card-image" alt="game-img">
          </div>
          <div class="card-description">
              <div class="d-flex flex-column  mx-2 py-2 ">
                  <h3>Oferta del mes</h3>
                  <div class="d-flex justify-content-between alingn-items-center">
                  <h5>¡ Fecha limite ${game.fechaLimite}!</h5>
                  <button class="btn-buy"><b>BUY NOW</b></button>
                  </div>
              </div>
              <div class="m-0 row  ">
                  <div class="col-3 card-oferta d-flex justify-content-center align-items-center">
                      <span>-${game.descuento}%</span>
                  </div>
                  <div class="col-9 card-precio">
                      <span><s>ARS$ ${game.precio}</s></span>
                      <span><i>ARS$ ${
                        game.precio - (game.descuento * game.precio) / 100
                      }</i></span>
                  </div>
              </div>
          </div>
      </div>
       `;
  });
  const allHtmlcontent = contenido.join("");
  gamesCards.innerHTML = allHtmlcontent;
}
mostrarCardsGames();

// CAROUSEL VIDEO GAMES

// CREAR CAROUSEL

// funcion que me renderice el contenido del carousel
function mostrarCarouselGames() {
  const contenido = games.map((game, index) => {
    // console.log(usuario.id);
    if (index === 0) {
      return ` 
      <div class="carousel-item active">
          <div class="row justify-content-center">
              <div id="main-image-${game.id}" class="col-10 col-md-8 game-image"
                  data-default-image="${game.url}" >
                  <button class="btn-buy"><b>BUY NOW</b></button>
              </div>
              <div class="d-md-flex col-10 col-md-3 game-description row">
                  <div class="mt-2 col-12">
                      <h1>${game.titulo}</h1>
                  </div>
                  <div class="d-none col-5 d-md-flex col-md-12 flex-md-column">
                      <img id="image-1-${game.id}"
                          src="${game.src1}"
                          alt="img1">
                      <img id="image-2-${game.id}"
                          src="${game.src2}"
                          alt="img2">
                  </div>
                  <div class="d-none d-md-flex">
                      <h4>Ya disponible</h4>
                  </div>
                  <div class="flex-wrap d-md-flex mt-1">
                      <span>${game.categoria1}</span>
                      <span>${game.categoria2}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                      <p><i>ARS$ ${game.precio}</i></p>
                      <h5><i class="fab fa-apple me-2"></i><i class="fab fa-windows"></i></h5>
                  </div>
              </div>
          </div> 
     </div>
         `;
    } else {
      return ` 
      <div class="carousel-item ">
          <div class="row justify-content-center">
              <div id="main-image-${game.id}" class="col-10 col-md-8 game-image"
                  data-default-image="${game.url}" >
                  <button class="btn-buy"><b>BUY NOW</b></button>
              </div>
              <div class="d-md-flex col-10 col-md-3 game-description row">
                  <div class="mt-2 col-12">
                      <h1>${game.titulo}</h1>
                  </div>
                  <div class="d-none col-5 d-md-flex col-md-12 flex-md-column">
                      <img id="image-1-${game.id}"
                          src="${game.src1}"
                          alt="img1">
                      <img id="image-2-${game.id}"
                          src="${game.src2}"
                          alt="img2">
                  </div>
                  <div class="d-none d-md-flex">
                      <h4>Ya disponible</h4>
                  </div>
                  <div class="flex-wrap d-md-flex mt-1">
                      <span>${game.categoria1}</span>
                      <span>${game.categoria2}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                      <p><i>ARS$ ${game.precio}</i></p>
                      <h5><i class="fab fa-apple me-2"></i><i class="fab fa-windows"></i></h5>
                  </div>
              </div>
          </div> 
     </div>
         `;
    }
  });
  const allHtmlcontent = contenido.join("");
  gamesCarousel.innerHTML = allHtmlcontent;
}
mostrarCarouselGames();
// Funcion para cambiar imagen con hover y  establecer imagen de fondo
//ME FALTA HACER QUE ESTA FUNCION GIRE POR TODOS LOS ELEMNTOS DEL ARRAY Y NO SOLO FUNCIONE CON EL PRIMERO.
function cambiarImagen() {
  // let imagenes = [];
  // for (let i = 0; i < 3; i++) {
  //   imagenes[i] = (document.getElementById(`main-image-${i+1}`));
  // }
  // let imagenesHover = [];
  // for (let i = 0; i < (3); i++) {
  //   // console.log(i);
  //   for (let j = 0; j < (2) ; j++) {
  //     // console.log(j);
  //     imagenesHover.push(document.getElementById(`image-${j+1}-${i+1}`))
  //   }
  // }
  // console.log(imagenesHover);
  // console.log(imagenes);
  // for (let i = 0; i < imagenes.length; i++) {
  //   imagenes[i].style.backgroundImage = `url(${imagenes[i].dataset.defaultImage})`;
  //   console.log("soy imagenes main", imagenes[i])
  // }
  const imagenes = games.map((game) => {
    const mainImage = document.getElementById(`main-image-${game.id}`);
    const image1 = document.getElementById(`image-1-${game.id}`);
    const image2 = document.getElementById(`image-2-${game.id}`);
    mainImage.style.backgroundImage = `url(${mainImage.dataset.defaultImage})`;
    image1.addEventListener("mouseover", () => {
      mainImage.style.backgroundImage = `url(${image1.src})`;
    });
    image1.addEventListener("mouseleave", () => {
      mainImage.style.backgroundImage = `url(${mainImage.dataset.defaultImage})`;
    });
    image2.addEventListener("mouseover", () => {
      mainImage.style.backgroundImage = `url(${image2.src})`;
    });
    image2.addEventListener("mouseleave", () => {
      mainImage.style.backgroundImage = `url(${mainImage.dataset.defaultImage})`;
    });
  });
}
cambiarImagen();
