
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

let usuarios1 = JSON.parse(localStorage.getItem('usuarios')) || [];
const notaJson1 = JSON.stringify(usuarios1);
localStorage.setItem('usuarios', notaJson1);
console.log('usuarios', usuarios1);

function mostrarName(id){
  let usuarioActual = usuarios1[usuarios1.length - 1];
  console.log('usuarioactual',usuarioActual);
  const contenido = `
   Hola ${usuarioActual.fullname} 
`;
usuarioLogueado.innerHTML = contenido;
}
mostrarName();
