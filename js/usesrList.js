const tablebody = document.querySelector('.tablebody');
const show = document.getElementById('show');
const paginacionTabla = document.getElementById('paginacionTabla');
const detalleUsuarioBody = document.getElementById('detalleUsuarioBody');


let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function mostrarUsuarios() {
    function armarFilasDeUsuarios(usuario) {
        const fila = `
            <tr>
                <td>${usuario.fullname}</td>
                <td>${usuario.role}</td>
                <td>
                    <button onclick="detalleUsuario('${usuario.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detalleModal" data-bs-whatever="@mdo"><i class="fas fa-info-circle"></i></button>
                    <button onclick="eliminarUsuario('${usuario.id}')" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                </td>
            </tr>
            `;
        return fila;
    }
    const contenido = usuarios.map(armarFilasDeUsuarios);
    tablebody.innerHTML = contenido.join('');
}
mostrarUsuarios();

function mostrarUsuarioSelect() {
let contenido = [];
for (let i = 0; i < show.value; i++) {
    const usuario = usuarios[i];
    const fila = `
        <tr>
            <td>${usuario.fullname}</td>
            <td>${usuario.role}</td>
            <td>
                <button onclick="detalleUsuario('${usuario.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detalleModal" data-bs-whatever="@mdo"><i class="fas fa-info-circle"></i></button>
                <button onclick="eliminarUsuario('${usuario.id}')" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
            </td>
        </tr>
        `
    contenido.push(fila);
}
tablebody.innerHTML = contenido.join('');
}
function eliminarUsuario(id) {
    function usuariosFilter(usuario) {
        return usuario.id !== id;
    };
    const usuariosFiltrados = usuarios.filter(usuariosFilter);
    usuarios = usuariosFiltrados;
    const notaJson = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', notaJson);
    mostrarUsuarioSelect();
}
function detalleUsuario(id){
    function usuarioFind(usuario) {
        return usuario.id === id;
    };
    const usuarioEncontrado = usuarios.find(usuarioFind);
    const contenido = `
            <p><b>Nombre</b>: ${usuarioEncontrado.fullname} </p>
            <p><b>Email</b>: ${usuarioEncontrado.email}</p>
            <p><b>Rol</b>: ${usuarioEncontrado.role} </p>
        `;
    detalleUsuarioBody.innerHTML = contenido;
}
function buscarUsuarios(event) {
    event.preventDefault();
    const busquedaInput = document.getElementById('busquedaInput');
    const usuariosAll = JSON.parse(localStorage.getItem('usuarios'));

    function filtrarUsuarios(usuario) {
        return usuario.fullname.toLowerCase().includes(busquedaInput.value.toLowerCase());
    }
    const usuarioFiltrado = usuariosAll.filter(filtrarUsuarios);
    usuarios = usuarioFiltrado;
    mostrarUsuarios();
}

/** Paginacion*/
let pagActual = 1;
/**cantidad de filas a mostrar en la tabla */
let cantidadElement = 4;
function mostrarUsuariosPag(usuarios,tabla,filasPorPag,numPag){
    // tabla.innerHTML = "";
    numPag--;
    console.log(filasPorPag);
    console.log(numPag);
    let inicio = filasPorPag * numPag;
    console.log(inicio);
    let fin = inicio + filasPorPag;   
    console.log(fin);
    let elementoPag =  usuarios.slice(inicio,fin);
    console.log(elementoPag);
    let contenido = [];
    for (let i = 0; i < elementoPag.length; i++){
        let usuario = elementoPag[i];
        const fila = `
        <tr>
            <td>${usuario.fullname}</td>
            <td>${usuario.role}</td>
            <td>
                <button onclick="detalleUsuario('${usuario.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detalleModal" data-bs-whatever="@mdo"><i class="fas fa-info-circle"></i></button>
                <button onclick="eliminarUsuario('${usuario.id}')" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
            </td>
        </tr>
        `;
    contenido.push(fila);
    tabla.innerHTML = contenido.join('');
    }
    
}
function paginas(usuarios, paginacion, filasPorPag){
    let contadorPag = Math.ceil(usuarios.length / filasPorPag);
    for (let i = 1; i < contadorPag + 1; i++) {
        let btn = botonPag(i,usuarios);
        paginacion.appendChild(btn);   
    }
}
function botonPag(pag,usuarios){
    let buttonPag = document.createElement('button');
    buttonPag.innerText = pag;

    if(pagActual == pag) buttonPag.classList.add('active');

    buttonPag.addEventListener('click', ()=>{
        pagActual = pag;
        mostrarUsuariosPag(usuarios,tablebody,cantidadElement,pagActual);
        let btnActual = document.querySelector('.paginas button.active');
        btnActual.classList.remove('active');
        buttonPag.classList.add('active');
    });   
    return buttonPag;
}
mostrarUsuariosPag(usuarios,tablebody,cantidadElement,pagActual);
paginas(usuarios,paginacionTabla,cantidadElement);
