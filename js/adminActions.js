// elementos del html
const btnNewProduct = document.getElementById('new-product-btn');
const btnListsProducts = document.getElementById('list-products-btn');
const mostrarFormNuevoProducto = () => {
    console.log('Abrir form de nuevo producto');
    const inputImage = document.getElementById('imgInp')
    inputImage.addEventListener("change", function() {
        console.log(this);
        const reader = new FileReader();
        reader.addEventListener("load", ()=>{
            localStorage.setItem("recent-image", reader.result)
        })
        reader.readAsDataURL(this.files[0]);
    })
}
//Funcion que nos traslada al html que muestra la lista de productos
const listarTodosLosProductos = () => {
    console.log("Listar los productos");
    window.location.href = "../html/productList.html";
}

btnNewProduct.addEventListener('click', mostrarFormNuevoProducto)
btnListsProducts.addEventListener('click', listarTodosLosProductos)

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

//Traemos todos los productos si es que los hay de local storage y si no creamos una array vacio
const productosJSON = localStorage.getItem('productos');
let productos = JSON.parse(productosJSON) || [];

//Guarda el producto en local storage
function guardarProducto() {
    localStorage.setItem('productos', JSON.stringify(productos))
}

//Funcion que maneja el submit del formulario para dar de alta un nuevo producto
const createNewProduct = (event) => {
    event.preventDefault();
    console.log("submit new product");
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    url = localStorage.getItem("recent-image");
    // guardarProducto()
    //Evento que maneja la suba de archivos

    const nuevoProducto = {
        id: create_UUID(),
        titulo,
        descripcion,
        precio,
        url,
    }
    console.log(nuevoProducto);
    productos.push(nuevoProducto);//Metemos dentro del array producto el nuevo producto;
    //debemos actualizar la base de datos
    localStorage.setItem('productos', JSON.stringify(productos))
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
}


const limpiarFormulario = () => {
    document.getElementById('titulo').value = "";
    document.getElementById('descripcion').value = "";
    document.getElementById('precio').value = "";
    document.getElementById('imgInp').value = null;
}

