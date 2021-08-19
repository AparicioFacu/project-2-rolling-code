const tablebody = document.querySelector('.tablebody');
const show = document.getElementById('show');
const paginacionTabla = document.getElementById('paginacionTabla');
const detalleUsuarioBody = document.getElementById('detalleUsuarioBody');
/**modal Editar */
const editarNombreInput = document.getElementById('editarNombreInput');
const editarRolesSelect = document.getElementById('editarRolesSelect');
const editarCuentaInput = document.getElementById('editarCuentaInput');
const buttonCuenta = document.getElementById('buttonCuenta');

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const notaJson = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', notaJson);

function eliminarUsuario(id) {
    function usuariosFilter(usuario) {
        return usuario.id !== id;
    };
    const usuariosFiltrados = usuarios.filter(usuariosFilter);
    usuarios = usuariosFiltrados;
    const notaJson = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', notaJson);
    mostrarUsuariosPag(usuarios,tablebody,cantidadElement,pagActual);
}

function detalleUsuario(id){
    function usuarioFind(usuario) {
        return usuario.id === id;
    };
    const usuarioEncontrado = usuarios.find(usuarioFind);
    let cuenta;
    if(usuarioEncontrado.active === true){
        cuenta = "Activa";
    }else{
        cuenta = "Inactiva";
    }    
    const contenido = `
            <p><b>Nombre</b>: ${usuarioEncontrado.fullname} </p>
            <p><b>Email</b>: ${usuarioEncontrado.email}</p>
            <p><b>Rol</b>: ${usuarioEncontrado.role} </p>
            <p><b>Cuenta</b>: ${cuenta} </p>
        `;
    detalleUsuarioBody.innerHTML = contenido;
}
function buscarUsuarios() {
    const busquedaInput = document.getElementById('busquedaInput');
    const tabla = document.getElementById('tabla');
    const tr = tabla.getElementsByTagName('tr');
    for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[0];
        if(td){
            const textValue = td.textContent || td.innerText;
            if(textValue.toUpperCase().indexOf(busquedaInput.value.toUpperCase()) > -1 ){
                tr[i].style.display = "";
            }else{
                tr[i].style.display = 'none';
            }
        }
    }
}
let notaID = '';
let cuenta;
function mostrarModalEditar(id){
    function usuarioFind(usuario) {
        return usuario.id === id;
    };  
    const usuarioEncontrado = usuarios.find(usuarioFind);    
    if(usuarioEncontrado.active === true){
        cuenta = "Activa";
        buttonCuenta.innerHTML = "Desactivar";
    }else{
        cuenta = "Inactiva";
        buttonCuenta.innerHTML = "Activar";
    }  
    editarNombreInput.value = usuarioEncontrado.fullname;
    editarRolesSelect.value = usuarioEncontrado.role;
    editarCuentaInput.value = cuenta;
    notaID = id;
}
const btnEditar = document.getElementById('btnEditar');   
btnEditar.addEventListener('click', function editarUsuario(event){
    event.preventDefault();
    const nombreEditado = editarNombreInput.value;
    const rolEditado = editarRolesSelect.value;
    let cuentaEditada;
    console.log(cuenta);
    if(cuenta === 'Inactiva'){
        cuentaEditada = !!cuenta;
    }else{
        cuentaEditada = !cuenta;
    } 
    console.log(cuentaEditada)
    const usuarioEditado = {
        fullname: nombreEditado,
        role: rolEditado,
        active: cuentaEditada
    };
    function actualizarUsuario(usuario){
        if(usuario.id === notaID){
            return{...usuario, ...usuarioEditado};
        }else{
            return usuario;
        }
    } 
    const usuarioActualizado = usuarios.map(actualizarUsuario);
    usuarios = usuarioActualizado;
    const notaJson = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', notaJson);
    var myModal = bootstrap.Modal.getInstance(document.getElementById('editarUsuarios'));
    myModal.hide();
    mostrarUsuariosPag(usuarios,tablebody,cantidadElement,pagActual);
});
function activarCuentaUsuario(){
    if(buttonCuenta.innerHTML === 'Desactivar'){
        buttonCuenta.innerHTML = 'Activar';
        editarCuentaInput.value = 'Inactiva';
    }else{
        buttonCuenta.innerHTML = 'Desactivar';
        editarCuentaInput.value = 'Activa';       
    }
    return buttonCuenta.innerHTML;
}

/** Paginacion */
let pagActual = 1;
/**cantidad de filas a mostrar en la tabla */
let cantidadElement = 4;
function mostrarUsuariosPag(usuarios,tabla,filasPorPag,numPag){
    // tabla.innerHTML = "";
    numPag--;
    let inicio = filasPorPag * numPag;
    let fin = inicio + filasPorPag;   
    let elementoPag =  usuarios.slice(inicio,fin);
    let contenido = [];
    for (let i = 0; i < elementoPag.length; i++){
        let usuario = elementoPag[i];
        const fila = `
        <tr>
            <td>${usuario.fullname}</td>
            <td>${usuario.role}</td>
            <td>
                <button onclick="detalleUsuario('${usuario.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detalleModal" data-bs-whatever="@mdo"><i class="fas fa-info-circle"></i></button>
                <button onclick="mostrarModalEditar('${usuario.id}')" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editarUsuarios" data-bs-whatever="@mdo"><i class="fas fa-edit"></i></button>
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
const tagUserLogged = document.getElementById('usuario-logueado');
const escribirNombreUsuarioLogueado = () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    console.log(usuarioLogueado.fullname)
    console.log(usuarioLogueado);
    tagUserLogged.innerText = usuarioLogueado.fullname;
}

escribirNombreUsuarioLogueado();