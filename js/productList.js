const contenedorCards = document.getElementById('contenedor-cards')
//Necesito crear un array de productos que me permita simular lo del localStorage
// const productosHarcodeados = [
//     {
//         id: '1',
//         titulo: 'Fifa',
//         descripcion: 'El mejor video game de futbol ever',
//         precio: '150',
//         url: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
//     },
//     {
//         id: '2',
//         titulo: 'Counter Strike',
//         descripcion: 'No campees fule!',
//         precio: '200',
//         url: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
//     },
//     {
//         id: '3',
//         titulo: 'Mario Bros',
//         descripcion: 'Juego de aventura',
//         precio: '120',
//         url: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
//     },
//     {
//         id: '4',
//         titulo: 'Guitar Hero',
//         descripcion: 'Tas listo pa rockear?',
//         precio: '180',
//         url: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
//     },
//     {
//         id: '5',
//         titulo: 'call of duty',
//         descripcion: 'El mejor juego de guerra ever',
//         precio: '250',
//         url: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
//     },
//     {
//         id: '6',
//         titulo: 'GTA',
//         descripcion: 'El juego mas vendido de la historia',
//         precio: '350',
//         url: 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'
//     }
// ]
// //para simular que verdaderamente viene de local storage pusheamos y luego traemos
// localStorage.setItem('productos', JSON.stringify(productosHarcodeados))
const productosJSON = localStorage.getItem('productos');
let productos = JSON.parse(productosJSON) || [];//Estoy tomando estos productos de LS

console.log(productos)

//Necesito crear una funcion que me renderice todos los productos pero con esa modificacion de boton editar y boton borrar
function mostrarProductosAdmin() {
    const contenido = productos.map(producto => {
        // console.log(usuario.id);
        console.log(producto.url);
        return `<div class="col mb-5">
                    <div class="card h-100">
                        <!-- Product image-->
                         <img class="card-img-top" src="../html/${producto.url}" alt="..." />
                         <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">${producto.titulo}</h5>
                                <!-- Product price-->
                                <p>${producto.descripcion}</p>
                                <p>${producto.precio}</p>
                             </div>
                        </div>
                     <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent delete-update-container">
                    <div onclick="actualizarProducto('${producto.id}')" class="text-center background-btn-edit-delete" data-bs-toggle="modal" data-bs-target="#exampleModal"><a class="btn btn-outline-dark mt-auto icon-color" href="javascript:void(0)"><i class="far fa-edit"></i></a></div>
                    <div onclick="borrarProducto('${producto.id}')" class="text-center background-btn-edit-delete"><a class="btn btn-outline-dark mt-auto icon-color" href="javascript:void(0)"><i class="fas fa-trash-alt"></i></a></div>
                </div>
        </div>
    </div>`
    })
    console.log(contenido.join(''));
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
    const tituloEditado = document.getElementById('titulo-editado')
    const descripcionEditado = document.getElementById('descripcion-editado')
    const precioEditado= document.getElementById('precio-editado')
    const imagenPrecargada = document.getElementById('imagen-precargada')
    const imagenInput = document.getElementById('imgInp-editado')
    imagenInput.onchange = evt => {
        const [file] = imagenInput.files
        if (file) {
          imagenPrecargada.src = URL.createObjectURL(file)
        }
    }
    console.log(tituloEditado, descripcionEditado, precioEditado)
    //Asignar a cada uno de estos elementos el contenido del producto id en cuestion
    const productoActual = productos.find(producto => producto.id === productoId)
    tituloEditado.value = productoActual.titulo;
    descripcionEditado.value = productoActual.descripcion;
    precioEditado.value = productoActual.precio;
    imagenPrecargada.src = productoActual.url
    
}

const borrarProducto = (productoId) => {
    console.log(productoId);
    console.log("borrar producto");
    const listaUsuariosModificada = JSON.parse(localStorage.getItem('productos')).filter( producto => producto.id !== productoId);
    localStorage.setItem('productos', JSON.stringify(listaUsuariosModificada))
    productos = JSON.parse(localStorage.getItem('productos'))
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