const url = localStorage.getItem("recent-image");
console.log(url);

const imagenPrueba = document.getElementById("img-test");

setTimeout(()=> {
    imagenPrueba.src= url;
}, 1500)