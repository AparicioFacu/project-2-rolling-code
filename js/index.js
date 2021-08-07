const productosCarousel = document.getElementById('productos-carousel');


function mostrarProductos() {
    const contenido = productos.map(producto => {
        // console.log(usuario.id);
        return `  
        <div class="row justify-content-center">
        <div id="main-image" class="col-10 col-md-8 game-image"
            data-default-image="https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628178941/Video%20Games/pugb1_kwch2r.jpg">
            <button><b>BUY NOW</b></button>
        </div>
        <div class="d-md-flex col-10 col-md-3 game-description row">
            <div class="mt-2 col-12">
                <h1>Pugb</h1>
            </div>
            <div class="d-none col-5 d-md-flex col-md-12 flex-md-column">
                <img id="image-1"
                    src="https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628178948/Video%20Games/pugb2_wm9cuj.jpg"
                    alt="img-pugb">
                <img id="image-2"
                    src="https://res.cloudinary.com/dcx1rcwvu/image/upload/v1628179322/Video%20Games/pugb3_icejl5.jpg"
                    alt="img-pugb">
            </div>
            <div class="d-none d-md-flex">
                <h4>Ya disponible</h4>
            </div>
            <div class="flex-wrap d-md-flex mt-1">
                <span>Violencia</span>
                <span>Acción</span>
                <span>Cooperativo</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <p><i>ARS$ 1500.00</i></p>
                <h5><i class="fab fa-windows"></i></h5>
            </div>
        </div>
    </div>
       `;
    })
    console.log(contenido.join(''));
    const allHtmlcontent = contenido.join('');
    productosCarousel.innerHTML = allHtmlcontent;
}
// cuando no este hover en ninguna de las imagenes, la imagen mainImage continue de background.
// si el estado de hover es fals, etonces la imagen mostrada es mainImage

function cambiarImagen() {
    const mainImage = document.getElementById('main-image');
    const image1 = document.getElementById('image-1');
    const image2 = document.getElementById('image-2');
    
    image1.addEventListener('mouseover', ()=>{
        mainImage.style.backgroundImage = `url(${image1.src})`; 
    })
    image1.addEventListener('mouseleave', ()=>{
        console.log(mainImage.dataset.defaultImage);
        mainImage.style.backgroundImage = `url(${mainImage.dataset.defaultImage})`;
    })
    image2.addEventListener('mouseover', ()=>{
        mainImage.style.backgroundImage = `url(${image2.src})`;
    })
    image2.addEventListener('mouseleave', ()=>{
        console.log(mainImage.dataset.defaultImage);
        mainImage.style.backgroundImage = `url(${mainImage.dataset.defaultImage})`;
    })
}
cambiarImagen();

