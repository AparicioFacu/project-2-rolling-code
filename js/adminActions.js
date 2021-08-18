// Elemento del HTML 
const verPerfil = document.getElementById('verPerfil')

// Tremos los usuarios del local storage 
const usuariosJSON = localStorage.getItem('usuarios');
let usuarios = JSON.parse(usuariosJSON) || [];

console.log(usuarios);

const userLog = JSON.stringify(usuarios);
localStorage.setItem('usuarios', userLog);

// funcion para ver perfil logeado

  const contenido = `
          <p><b>Nombre</b>: ${userLog.fullname} </p>
          <p><b>Email</b>: ${userLog.email}</p>
      `;
  verPerfil.innerHTML = contenido;



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