
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