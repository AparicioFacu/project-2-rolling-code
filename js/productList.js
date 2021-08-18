const contenedorCards = document.getElementById('contenedor-cards')
const contenedorPrincipal = document.getElementById('section-contenido-ppal');
const firstCardsContainer = document.getElementById('first-contenedor-cards');
const tagUserLogged = document.getElementById('usuario-logueado');
const productosJSON = localStorage.getItem('games');
let productos = JSON.parse(productosJSON) || [];//Estoy tomando estos productos de LS

console.log(productos.length)

//Necesito crear una funcion que me renderice todos los productos pero con esa modificacion de boton editar y boton borrar
function mostrarProductosAdmin() {
    if(productos.length === 0){
        const noTienesProductos = document.createElement('h2');
        console.log(noTienesProductos);
        noTienesProductos.innerText="No tienes productos en tu catalogo"
        noTienesProductos.setAttribute('class', 'text-center')
        noTienesProductos.setAttribute('id', 'msj-no-products')
        contenedorPrincipal.insertBefore(noTienesProductos, firstCardsContainer);
        console.log("no tienes productos agrega uno");
        contenedorCards.innerHTML = `
        <section class="py-5">
            <div class="col mx-2 mb-5 option-styles-container">
                <p class="text-center">Add new product</p>
                <div id="new-product-btn" class="new-product-container" data-bs-toggle="modal"
                    data-bs-target="#modalNewProduct"><i class="fas fa-plus-circle"></i></div>
            </div>  
        </section>
        `;
    }else{
        const h2 = document.getElementById('msj-no-products')
        if(h2){
            console.log("entre aqui");
            contenedorPrincipal.removeChild(h2)
        }
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
    categoria2Editado.value = productoActual.categoria2;
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
    const titulo = document.getElementById('titulo-editado').value;
    const precio = document.getElementById('precio-editado').value;
    const url = document.getElementById('url-editado').value;
    const src = document.getElementById('src-editado').value;
    const src1 = document.getElementById('src1-editado').value;
    const src2 = document.getElementById('src2-editado').value;
    const categoria1 = document.getElementById('categoria1-editado').value;
    const categoria2 = document.getElementById('categoria2-editado').value;
    const fechaLimite = document.getElementById('fecha-limite-editado').value;
    const descuento = document.getElementById('descuento-editado').value;
    //Producto editado
    const productoEditado = {
        titulo,
        precio,
        url,
        src,
        src1,
        src2,
        categoria1,
        categoria2,
        fechaLimite,
        descuento
    }
   // Necesito trear el producto actual guardado en LS
    const productoSeleccionado = JSON.parse(localStorage.getItem('games')).find(producto => producto.id === productIdEnCuestion);
    // console.log(`Estas editando este producto ${productoSeleccionado}`);
    const productosActualizados = productos.map(producto => {
        if(producto.id === productIdEnCuestion){
        return {...producto, ...productoEditado};
        }else{
        return producto;
        }
    })
    // console.log(productosActualizados);
    productos = productosActualizados;
    mostrarProductosAdmin();
    const productosJSON = JSON.stringify(productos)
    localStorage.setItem('games', productosJSON)
    const btnCierraEdit = document.getElementById("btn-close-form-2");
    btnCierraEdit.click();
}

/*Vamos a trear aqui la funcionalidad de crear nuevo producto tambien */
//Funcion que genera un id unico para cada elemento
function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

//Funcion que maneja el submit del formulario para dar de alta un nuevo producto
const createNewProduct = (event) => {
    event.preventDefault();
    console.log("submit new product");
    const titulo = document.getElementById('titulo').value;
    const precio = document.getElementById('precio').value;
    const url = document.getElementById('url').value;
    const src = document.getElementById('src').value;
    const src1 = document.getElementById('src1').value;
    const src2 = document.getElementById('src2').value;
    const categoria1 = document.getElementById('categoria1').value;
    const categoria2 = document.getElementById('categoria2').value;
    const fechaLimite = document.getElementById('fecha-limite').value;
    const descuento = document.getElementById('descuento').value;
    // guardarProducto()
    //Evento que maneja la suba de archivos

    const nuevoProducto = {
        id: create_UUID(),
        titulo,
        precio,
        url,
        src,
        src1,
        src2, 
        categoria1,
        categoria2,
        fechaLimite, 
        descuento
    }
    console.log(nuevoProducto);
    productos.push(nuevoProducto);
    localStorage.setItem('games', JSON.stringify(productos));
    //limpiar formulario
    limpiarFormulario();
    //Mostrar elmsj de producto creado exitosamente
    const msjError = document.getElementById('msj-error-login')
    msjError.innerHTML = "Producto creado exitosamente"
    msjError.setAttribute('class', 'alert alert-success');
    setTimeout(() => {
        msjError.setAttribute('class', 'd-none')
        const btnCloseForm = document.getElementById('btn-close-form');
        btnCloseForm.click();
    }, 1500);
    mostrarProductosAdmin()
}


const limpiarFormulario = () => {
    document.getElementById('titulo').value = "";
    document.getElementById('precio').value = "";
    document.getElementById('url').value = "";
    document.getElementById('src').value = "";
    document.getElementById('src1').value = "";
    document.getElementById('src2').value = "";
    document.getElementById('categoria1').value = "";
    document.getElementById('categoria2').value = "";
    document.getElementById('fecha-limite').value = "";
    document.getElementById('descuento').value = "";
}

const escribirNombreUsuarioLogueado = () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    console.log(usuarioLogueado.fullname)
    console.log(usuarioLogueado);
    tagUserLogged.innerText = usuarioLogueado.fullname;
}

escribirNombreUsuarioLogueado();