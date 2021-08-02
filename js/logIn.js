
//funcion que maneja el evento submit del formulario login
const logIn = (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password')
    const email = emailInput.value;
    const pass = passwordInput.value;
    const userLogin = {
        email, 
        pass
    }
    console.log(userLogin);
    //con el email y el pass ya disponibles debemos chequear si corresponde a un usuario valido
    verificacionUsuario(userLogin)
}
  
const administradoresHarcodeados = [
    {
        email: 'romanomatias99@gmail.com',
        pass: 'romano99'
    },
    {
        email: 'usuario2@gmail.com',
        pass: 'usuario2'
    },
    {
        email: 'usuario3@gmail.com',
        pass: 'usuario3'
    },
]
const verificacionUsuario = (usuarioLoggin) => {
//traer el array de usuarios que tenemos guardado en local storage
    const msjError = document.getElementById('msj-error-login')
    let loginValido = false;
    administradoresHarcodeados.forEach(usuario => {
        if(usuario.email === usuarioLoggin.email && usuario.pass === usuarioLoggin.pass){
            loginValido = true;
        }
    })

    if(loginValido){
        console.log("logueado correctamente");
        msjError.innerHTML="Login exitoso"
        msjError.setAttribute('class', 'alert alert-success');
        setTimeout(()=>{
            msjError.setAttribute('class', 'd-none')
            //Redireccionamos a la pagina de administrador
            window.location.href = "../html/admin.html";
        }, 1500);
    }else{
        console.log("usuario no valido");
        msjError.innerHTML="Tu email o tu contraseña es incorrecta"
        msjError.setAttribute('class', 'alert alert-danger');
        setTimeout(()=>{
            msjError.setAttribute('class', 'd-none')
        }, 1500);
    }
}