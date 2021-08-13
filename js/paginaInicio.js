//Definimos las constantes que toman los datos del formulario
const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');
const msjError = document.getElementById('msj-error-login');
//Traemos a todos los usuarios ya guardados en DB
const usuariosJSON = localStorage.getItem('usuarios');
let usuarios = JSON.parse(usuariosJSON) || [];

console.log(usuarios);

const loginUsuario  = (event) => {
    event.preventDefault();
    console.log("te estas logueando");
    //tomamos los datos ingresados por el user
    const userTryingLoggin = {
        email: emailInput.value,
        pass: passInput.value
    }
    console.log(userTryingLoggin)
    //Verificamos que sea un usuario valido
    let validUser = false;
    usuarios.forEach(user => {
        if(user.email === userTryingLoggin.email && user.pass === userTryingLoggin.pass){
            //Hubo coincidencia
            validUser = true;
            //Tomamos el role del usuario para poder luego elegir que pantalla mostrar
            userTryingLoggin.role = user.role;
        }
    });
    if(validUser){
        if(userTryingLoggin.role === 'admin'){
            //Muestro directamente pantalla de administrador
            window.location.href = "./html/admin.html";
        }else{
            //Muestro pantalla de usuario basico
            window.location.href = "./home.html";
        }
    }else{
        console.log("mostrar mensaje al usuario - credenciales no validas");
        msjError.innerHTML="El email o password es incorrecto"
        msjError.setAttribute('class', 'alert alert-danger');
        setTimeout(()=>{
            msjError.setAttribute('class', 'd-none')
        }, 1500);
    }
}