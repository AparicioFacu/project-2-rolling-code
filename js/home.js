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
    compatibilidad1: '<i class="fab fa-windows me-2">',
    compatibilidad2: '<i class="fab fa-apple"></i>',
    //datos para cards
    src: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628380011/Video%20Games/spotlight_image_english_kivm2z.jpg",
    fechaLimite: "19/8/21",
    descuento: "-50%",
    nuevoPrecio: "750.00",
    active: "active",
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
    compatibilidad1: '<i class="fab fa-windows me-2">',
    compatibilidad2: '<i class="fab fa-apple"></i>',
    //datos para cards
    src: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628534013/Video%20Games/pugb-card_kr0rfo.jpg",
    fechaLimite: "19/8/21",
    descuento: "-30%",
    nuevoPrecio: "350.00",
    active: " ",
  },
  {
    //datos para usuario
    id: "3",
    titulo: "AAAAAA",
    precio: "500.00",
    url: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628178941/Video%20Games/pugb1_kwch2r.jpg",
    // datos para carrusel
    src1: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628178948/Video%20Games/pugb2_wm9cuj.jpg",
    src2: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628179322/Video%20Games/pugb3_icejl5.jpg",
    categoria1: "Acción",
    categoria3: "Futuro",
    compatibilidad1: '<i class="fab fa-windows me-2">',
    compatibilidad2: '<i class="fab fa-apple"></i>',
    //datos para cards
    src: "https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628534013/Video%20Games/pugb-card_kr0rfo.jpg",
    fechaLimite: "19/8/21",
    descuento: "-30%",
    nuevoPrecio: "350.00",
    active: " ",
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
              <div class="d-flex flex-column  mx-2 py-2 ">
                  <h3>Oferta del mes</h3>
                  <div class="d-flex justify-content-between alingn-items-center">
                  <h5>¡ Fecha limite ${game.fechaLimite}!</h5>
                  <button class="btn-buy"><b>BUY NOW</b></button>
                  </div>
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

// funcion que me renderice el contenido del carousel
function mostrarCarouselGames() {
  const contenido = games.map((game) => {
    // console.log(usuario.id);
    return ` 
    <div class="carousel-item ${game.active}">
        <div class="row justify-content-center">
            <div id="main-image" class="col-10 col-md-8 game-image"
                data-default-image="${game.url}" >
                <button class="btn-buy"><b>BUY NOW</b></button>
            </div>
            <div class="d-md-flex col-10 col-md-3 game-description row">
                <div class="mt-2 col-12">
                    <h1>${game.titulo}</h1>
                </div>
                <div class="d-none col-5 d-md-flex col-md-12 flex-md-column">
                    <img id="image-1"
                        src="${game.src1}"
                        alt="img1">
                    <img id="image-2"
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
       
  });
  console.log(contenido.join(""));
  const allHtmlcontent = contenido.join("");
  gamesCarousel.innerHTML = allHtmlcontent;
}
mostrarCarouselGames();
// Funcion para cambiar imagen con hover y  establecer imagen de fondo 
//ME FALTA HACER QUE ESTA FUNCION GIRE POR TODOS LOS ELEMNTOS DEL ARRAY Y NO SOLO FUNCIONE CON EL PRIMERO.
function cambiarImagen() {
  const mainImage = document.getElementById("main-image");
  const image1 = document.getElementById("image-1");
  const image2 = document.getElementById("image-2");

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
}
cambiarImagen();
