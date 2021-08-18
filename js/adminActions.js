
const verPerfil = document.getElementById('verPerfil')

// Tremos los usuarios del local storage 
const usuariosJSON = localStorage.getItem('usuarios');
let usuarios = JSON.parse(usuariosJSON) || [];

console.log(usuarios);



// funcion para ver perfil logeado
function verDetallePerfil() {

  // function usuarioFind(usuario) {
  //   return usuario.id === id;
  // };
  // let fecha = new Date(usuarioEncontrado.creacion)
  // const usuarioEncontrado = usuarios.find(usuarioFind);
  const contenido = `
  <p><b>Fecha</b>: ${fecha.toLocaleString()} </p>
          <p><b>Nombre</b>: ${usuario.fullname} </p>
          <p><b>Email</b>: ${usuario.email}</p>
          <p><b>Rol</b>: ${usuario.role} </p>
          <p><b>Password</b>: ${usuario.pass} </p>
      `;
  verPerfil.innerHTML = contenido;
}

// JS de la BARRA LATERAL NAV

const sidebar = document.querySelector(".sidebar");
const botonCerrar = document.getElementById("btn");
const botonBuscar = document.getElementById("buscador");

botonCerrar.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

botonBuscar.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});