// elemento para cards
const gamesCards = document.getElementById("games-cards");
const contenedorCards = document.getElementById("contenedor-cards");
// elemento para carousel
const gamesCarousel = document.getElementById("games-carousel");
const buttonCarousel = document.getElementById("button-carousel");

const gamesJSON = localStorage.getItem("games");
let games = JSON.parse(gamesJSON) || [];
//Estoy tomando estos games de LS
console.log("Array de games :", games);

// CARDS DE VIDEO GAMES

// funcion que me renderice las cards de video juegos
function crearContenedoresCards() {
  const cantidadContenedores = parseInt(Math.ceil(games.length / 3));
  console.log("cantidad de contenedores", cantidadContenedores);
  const contenidohtmlarray = [];
  for (let i = 0; i < cantidadContenedores; i++) {
    const contenedor = `
        <div class="d-flex justify-content-end align-items-center d-lg-none"><span class="me-1">
          Ver más</span><i class="fas fa-arrow-right"></i>
        </div>
        <div id="games-cards-${i}" class="cards-contenedor mb-5 d-flex justify-content-start justify-content-xl-center overflow-auto demoScroll sc5">
        
        </div>
    `;
    contenidohtmlarray.push(contenedor);
  }
  const allHtmlcontent = contenidohtmlarray.join("");
  contenedorCards.innerHTML = allHtmlcontent;
  const arrayContenedoresCollection =
    document.getElementsByClassName("cards-contenedor");
  // console.log(arrayContenedoresCollection);
  const arrayContenedores = [...arrayContenedoresCollection];
  console.log("arrayContenedores", arrayContenedores);
  function mostrarCardsGames(cantidadContenedores) {
    for (let i = 0; i < cantidadContenedores; i++) {
      let y = 3 * i;
      const grupoGames = [];
      for (let j = y; j < y + 3; j++) {
        console.log("j", j);
        if (!(j >= games.length)) {
          grupoGames.push(games[j]);
        }
      }
      console.log(`grupo ${i}`, grupoGames);

      const contenido = grupoGames.map((game) => {
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
      arrayContenedores[i].innerHTML = allHtmlcontent;
    }
  }
  mostrarCardsGames(cantidadContenedores);
}
crearContenedoresCards();

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
// Funcion que crea los slides button del carousel
function mostrarCarouselButton() {
  let slide = 0;
  const button = games.map((games, index) => {
    slide ++
    if (index === 0) {
      console.log();
      return `
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
      aria-label="Slide 1" class="active">
      </button>
      `;
    } else {
      return `
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${slide - 1}"
      aria-label="Slide ${slide}">
      </button>
      `;

    }
    
  });
  const allHtmlcontent = button.join("");
  buttonCarousel.innerHTML = allHtmlcontent;
}
mostrarCarouselButton();

// Funcion para cambiar imagen con hover y  establecer imagen de fondo
function cambiarImagen() {
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
