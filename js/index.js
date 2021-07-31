const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');
const nombreInput = document.getElementById('nombre');
const roleInput = document.getElementById('role')
const emailInputUp = document.getElementById('emailEditado');
const passInputUp = document.getElementById('passEditado');
const nombreInputUp = document.getElementById('nombreEditado');
const roleInputUp = document.getElementById('roleEditado')
const tabla = document.getElementById('tabla-contenido');
const bodyModal = document.getElementById('contenedor-detalle-usuario');
const btnFormUpdate = document.getElementById('formUpdateCloseBtn')
console.log(emailInput, passInput, nombreInput, roleInput, tabla);
const usuariosJSON = localStorage.getItem('usuarios');
console.log(usuariosJSON);
let usuarios = JSON.parse(usuariosJSON) || [];
console.log(bodyModal);
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

console.log(create_UUID());

mostrarUsuarios()
function agregarUsuario(event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passInput.value;
    const nombre = nombreInput.value;
    const role = roleInput.value;
    const nuevoUsuario = {id: create_UUID(), email, password, nombre, role, date: Date.now()}
    console.log(nuevoUsuario);
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
    console.log(usuarios);
    limpiarFormulario();
    mostrarUsuarios()
}

function limpiarFormulario () {
    emailInput.value = ""
    passInput.value = ""
    nombreInput.value="" 
    roleInput.value=""
}

const deleteItem = (man) => {
  console.log("hiciste click en editar");
  console.log(man);
  usuarios = usuarios.filter( usuario => usuario.id !== man);
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
  usuarios = JSON.parse(localStorage.getItem('usuarios'))
  mostrarUsuarios()
}

const mostrarDetallesUsuario = (usuarioId) => {
  console.log(usuarioId);
  const usuarioEnCuestion = usuarios.find(usuario => usuario.id === usuarioId);
  console.log(usuarioEnCuestion);
  console.log(usuarioEnCuestion.date);
  console.log(new Date(usuarioEnCuestion.date).toLocaleDateString(undefined, options));
  const contenido = `
  <p>Nombre: ${usuarioEnCuestion.nombre}</p>
  <p>Email: ${usuarioEnCuestion.email}</p>
  <p>Role: ${usuarioEnCuestion.role}</p>
  <p>Fecha de registro: ${new Date(usuarioEnCuestion.date).toLocaleDateString(undefined, options)}</p>
  `
  console.log("hello");
  console.log(contenido);
  bodyModal.innerHTML = contenido;
}

let usuarioEditadoId = '';

const updateItem = (usuarioId) => {
  console.log(usuarioId);
  usuarioEditadoId = usuarioId;
  const usuarioSeleccionado = usuarios.find(usuario => usuario.id === usuarioId);
  console.log(usuarioSeleccionado);
  emailInputUp.value = usuarioSeleccionado.email;
  roleInputUp.value = usuarioSeleccionado.role;
  nombreInputUp.value = usuarioSeleccionado.nombre;
  passInputUp.value = usuarioSeleccionado.password
}

const editarUsuarioForm = (event) =>{
  event.preventDefault()
  console.log("estas haciendo submit al form editar");
  const usuarioSeleccionado = usuarios.find(usuario => usuario.id === usuarioEditadoId);
  console.log("estas editando este usuario");
  const emailEditado = emailInputUp.value;
  const passEditado = passInputUp.value;
  const nombreEditado = nombreInputUp.value;
  const roleEditado = roleInputUp.value;
  const nuevoObjeto = {email: emailEditado, password: passEditado, nombre: nombreEditado, role: roleEditado}
  const usuariosActualizado = usuarios.map(usuario => {
    if(usuario.id === usuarioEditadoId){
      return {...usuario, ...nuevoObjeto};
    }else{
      return usuario;
    }
  })

  console.log(usuariosActualizado);
  usuarios = usuariosActualizado;
  mostrarUsuarios();
  const usuariosJSON = JSON.stringify(usuarios)
  localStorage.setItem('usuarios', usuariosJSON)
  // btnFormUpdate.click();
  var myModalEl = document.getElementById('ModalEditarUsuario')
var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
  modal.hide()
}

function mostrarUsuarios() {
    const contenido = usuarios.map(usuario => {
        // console.log(usuario.id);
        return `<tr>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.role}</td>
                    <td>
                      <button type="button" onclick="mostrarDetallesUsuario('${usuario.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalUsuario">
                        Ver detalles
                      </button>
                      <button onclick="deleteItem('${usuario.id}')" class="btn btn-danger mx-2">Borrar</button>
                      <button onclick="updateItem('${usuario.id}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#ModalEditarUsuario">Editar</button>
                      </td>
                </tr>`
    })
    console.log(contenido.join(''));
    const primeraParte = `<thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Role</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button onclick="deleteItem()" class="btn btn-danger mx-2">Borrar</button><button onclick="deleteItem()" class="btn btn-warning">Editar</button></td>
    </tr>
  </tbody>`
  const segundaParte = contenido.join('');
  const theWholeContent = primeraParte + segundaParte;
    tabla.innerHTML = theWholeContent;
}
