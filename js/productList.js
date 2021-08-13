const contenedorCards = document.getElementById('contenedor-cards')

const productosJSON = localStorage.getItem('games');
let productos = JSON.parse(productosJSON) || [];//Estoy tomando estos productos de LS

console.log(productos)

//Necesito crear una funcion que me renderice todos los productos pero con esa modificacion de boton editar y boton borrar
function mostrarProductosAdmin() {
    const contenido = productos.map(game => {   
        // console.log(usuario.id);
        return `<div class="card-game">
                    <div>
                        <img src="${game.src}"
                        class="card-img-top card-image" alt="game-img">
                    </div>
                    <div class="card-description">
                        <div class="d-flex flex-column  mx-2 py-2 ">
                             <h3>Oferta del mes</h3>
                             <div class="d-flex justify-content-between alingn-items-center">
                                <h5>¡ Fecha limite ${game.fechaLimite}!</h5>
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
                    <div class="card-footer d-flex justify-content-around">
                        <div onclick="actualizarProducto('${game.id}')" class="text-center background-btn-edit-delete" data-bs-toggle="modal" data-bs-target="#exampleModal"><a class="btn btn-outline-dark mt-auto icon-color" href="javascript:void(0)"><i class="far fa-edit"></i></a></div>
                        <div onclick="borrarProducto('${game.id}')" class="text-center background-btn-edit-delete"><a class="btn btn-outline-dark mt-auto icon-color" href="javascript:void(0)"><i class="fas fa-trash-alt"></i></a></div>
                    </div>
                </div>`
    })
    const allHtmlcontent = contenido.join('');
    contenedorCards.innerHTML = allHtmlcontent;
}

mostrarProductosAdmin();    

//Creamos una variable gral que contendra el current product en cuestion
let productIdEnCuestion = '';

//funcion que precarga todos los datos en el formulario de edicion
const actualizarProducto = (productoId) => {
    console.log(productoId);
    console.log("actualizando producto");
    productIdEnCuestion = productoId;//Hacemos general el id para tener acceso a el en todas las funciones
    const tituloEditado = document.getElementById('titulo-editado');
    const precioEditado = document.getElementById('precio-editado');
    const urlEditado = document.getElementById('url-editado');
    const srcEditado = document.getElementById('src-editado');
    const src1Editado = document.getElementById('src1-editado');
    const src2Editado = document.getElementById('src2-editado');
    const categoria1Editado = document.getElementById('categoria1-editado');
    const categoria2Editado = document.getElementById('categoria2-editado');
    const fechaLimiteEditado = document.getElementById('fecha-limite-editado');
    const descuentoEditado = document.getElementById('descuento-editado');
    //Asignar a cada uno de estos elementos el contenido del producto id en cuestion
    const productoActual = productos.find(producto => producto.id === productoId)
    console.log(productoActual);
    tituloEditado.value = productoActual.titulo;
    precioEditado.value = productoActual.precio;
    srcEditado.value = productoActual.src;
    src1Editado.value = productoActual.src1;
    src2Editado.value = productoActual.src2;
    urlEditado.value = productoActual.url;
    categoria1Editado.value = productoActual.categoria1;
    categoria2Editado.value = productoActual.categoria2Editado;
    fechaLimiteEditado.value = productoActual.fechaLimite;
    descuentoEditado.value =productoActual.descuento;
}

const borrarProducto = (productoId) => {
    console.log(productoId);
    console.log("borrar producto");
    const listaUsuariosModificada = JSON.parse(localStorage.getItem('games')).filter( producto => producto.id !== productoId);
    localStorage.setItem('games', JSON.stringify(listaUsuariosModificada))
    productos = JSON.parse(localStorage.getItem('games'))
    mostrarProductosAdmin()
}

//Tener cuenta que en nuestro caso tenemos que crear los elementos con js y pasar el id a la funcion de la sgte manera
/*
                      <div onclick="actualizarProducto('${producto.id}')" class="text-center background-btn-edit-delete"><a class="btn btn-outline-dark mt-auto icon-color" href="javascript:void(0)"><i class="far fa-edit"></i></a></div>
                    <div onclick="borrarProducto('${producto.id}')" class="text-center background-btn-edit-delete"><a class="btn btn-outline-dark mt-auto icon-color" href="javascript:void(0)"><i class="fas fa-trash-alt"></i></a></div>

    const actualizarProducto= (productoId) => {
        console.log(productoId)
    } 
    const borrarProducto= (productoId) => {
        console.log(productoId)
    } 
*/

//funcion que maneja el onSubmit del formulario de edicion;
const editProduct = (event) => {
    event.preventDefault();
    console.log("submiteando en la edicion");
    //Agarramos los datos que vienen y los condesamos en un objeto
    const tituloEditado = document.getElementById('titulo-editado').value;
    const descripcionEditado = document.getElementById('descripcion-editado').value;
    const precioEditado= document.getElementById('precio-editado').value;
    const imagenPrecargada = document.getElementById('imagen-precargada');
    //Debo chequear si el usuario cargo una nueva imagen
    const imagen = document.getElementById('imgInp-editado')
    console.log(imagen.value)
    const [file]=imagen.files;
    let url = '';
    if(file) {
        console.log("se subio un nuevo file");
        url = URL.createObjectURL(file);
        imagenPrecargada.src = url;
    }else {
        console.log("se mantuvo la imagen");
        url = imagenPrecargada.src;
    }
    //Producto editado
    const productoEditado = {
        titulo: tituloEditado,
        descripcion: descripcionEditado,
        precio: precioEditado,
        url: url
    }
    console.log(productoEditado)
   // Necesito trear el producto actual guardado en LS
    const productoSeleccionado = JSON.parse(localStorage.getItem('productos')).find(producto => producto.id === productIdEnCuestion);
    console.log(`Estas editando este producto ${productoSeleccionado}`);
    const productosActualizados = productos.map(producto => {
        if(producto.id === productIdEnCuestion){
        return {...producto, ...productoEditado};
        }else{
        return producto;
        }
    })
    console.log(productosActualizados);
    productos = productosActualizados;
    mostrarProductosAdmin();
    const productosJSON = JSON.stringify(productos)
    localStorage.setItem('productos', productosJSON)
    var myModalEl = document.getElementById('exampleModal')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide()
}