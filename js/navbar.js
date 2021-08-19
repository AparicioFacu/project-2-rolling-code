
// JS de la BARRA LATERAL NAV

const sidebar = document.querySelector(".sidebar");
const botonCerrar = document.getElementById("btn");
const botonBuscar = document.getElementById("buscador");
const usuarioLogueado = document.getElementById("usuario-logeado");

botonCerrar.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

botonBuscar.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
const notaJson = JSON.stringify(usuarios);
localStorage.setItem('usuarios', notaJson);
console.log('usuarios', usuarios);

function mostrarName(id){
  let usuarioActual = usuarios[usuarios.length - 1];
  console.log('usuarioactual',usuarioActual);
  const contenido = `
   Hola ${usuarioActual.fullname} 
`;
usuarioLogueado.innerHTML = contenido;
}
mostrarName();
