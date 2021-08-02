//Creamos una variable gral que contendra el current product en cuestion
let productIdEnCuestion = '';

//funcion que precarga todos los datos en el formulario de edicion
const actualizarProducto = (productoId) => {
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
    /*
    const productoActual = productos.find(producto => producto.id === productoId)
    tituloEditado.value = productoActual.titulo;
    descripcionEditado = producto.descripcion;
    precioEditado = producto.precio;
    imagenPrecargada.src = producto.url
    */
}

const borrarProducto = (productoId) => {
    console.log("borrar producto");
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
    //Necesito trear el producto actual guardado en LS
    // const productoSeleccionado = productos.find(producto => producto.id === productIdEnCuestion);
    // console.log(`Estas editando este producto ${productoSeleccionado}`);
    // const productosActualizados = productos.map(producto => {
    //     if(producto.id === productIdEnCuestion){
    //     return {...producto, ...productoEditado};
    //     }else{
    //     return producto;
    //     }
    // })
    // console.log(productoActualizado);
    // productos = productoActualizado;
    // mostrarProductos();
    // const productosJSON = JSON.stringify(productos)
    // localStorage.setItem('productos', productosJSON)
}