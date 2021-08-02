const btnNewProduct = document.getElementById('new-product-btn');
const btnListsProducts = document.getElementById('list-products-btn');
const mostrarFormNuevoProducto = () => {
    console.log('Abrir form de nuevo producto');
}
//Funcion que nos traslada al html que muestra la lista de productos
const listarTodosLosProductos = () => {
    console.log("Listar los productos");
    window.location.href = "../html/productList.html";
}

btnNewProduct.addEventListener('click', mostrarFormNuevoProducto)
btnListsProducts.addEventListener('click', listarTodosLosProductos)
//Funcion que genera un id unico para cada elemento
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
//Funcion que maneja el submit del formulario para dar de alta un nuevo producto
const createNewProduct = (event) => {
    event.preventDefault();
    console.log("submit new product");
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imgInp')
    console.log(imagen.value)
    const [file]=imagen.files;
    const url = URL.createObjectURL(file);
    console.log(url);
    //Evento que maneja la suba de archivos
    const nuevoProducto = {
        id: create_UUID(),
        titulo,
        descripcion,
        precio,
        url
    }
    console.log(nuevoProducto);
    //Guardar el producto en local storage

    //limpiar formulario
    limpiarFormulario();
    //Mostrar elmsj de producto creado exitosamente
    const msjError = document.getElementById('msj-error-login')
    msjError.innerHTML="Producto creado exitosamente"
    msjError.setAttribute('class', 'alert alert-success');
    setTimeout(()=>{
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