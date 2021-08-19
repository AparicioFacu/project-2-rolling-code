
// JS de la BARRA LATERAL NAV

const sidebar = document.querySelector(".sidebar");
const botonCerrar = document.getElementById("btn");
const botonBuscar = document.getElementById("buscador");
const siderbarUl = document.getElementById ("siderbarUl")
const usuarioLogueado = document.getElementById("usuario-logeado");

botonCerrar.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});
let estadoBoton = false 


if(window.matchMedia("(max-width: 768px)").matches) {
  //Si la pantalla es mayor a 768
  siderbarUl.classList.remove('mostrarUl')
  siderbarUl.classList.add('noMostrarUl')
  botonCerrar.addEventListener("click", () => { 
    if(!estadoBoton){
      siderbarUl.classList.remove('noMostrarUl');
      siderbarUl.classList.add('mostrarUl');
      estadoBoton = !estadoBoton
    } else {
      siderbarUl.classList.remove('mostrarUl')
      siderbarUl.classList.add('noMostrarUl');
      estadoBoton = !estadoBoton
    }
   
  });
}

botonBuscar.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});


function mostrarName(id){
  JSON.parse(localStorage.getItem('usuarioLogueado'));
  usuarioActual = JSON.parse(localStorage.getItem('usuarioLogueado'));
 
  usuarioLogueado.innerHTML =  `Hola ${usuarioActual.fullname}`;
}
mostrarName();
