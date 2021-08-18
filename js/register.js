const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');
const nameInput = document.getElementById('fullname');
const msjError = document.getElementById('msj-error-login')
//funcion para crear un uuid unico
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
//Traemos a todos los usuarios ya guardados en DB
const usuariosJSON = localStorage.getItem('usuarios');
let usuarios = JSON.parse(usuariosJSON) || [];
const signUpUsuario  = (event) => {
    event.preventDefault();
    console.log("te estas logueando");
    //Validamos que al menos todos los campos esten presentes
    if(emailInput.value ==="" || passInput.value==="" || nameInput.value===""){
        console.log("todos los campos son requeridos");
        msjError.innerHTML="Todos los campos son requeridos"
        msjError.setAttribute('class', 'alert alert-danger');
        setTimeout(()=>{
            msjError.setAttribute('class', 'd-none')
        }, 1500);
    }else{
        //tomamos los datos ingresados por el user
        const newUser = {
            id: create_UUID(),
            email: emailInput.value,
            pass: passInput.value,
            fullname: nameInput.value,
            role: 'basic',
            active: true
        }
        console.log(newUser)
        //Verificamos que no sea un email repetido
        let invalidEmail = false;
        usuarios.forEach(user => {
            if(user.email === newUser.email){
                invalidEmail=true;
            }
        });
        if(invalidEmail){
            //Esta usando un email que ya se registro ingrese otro 
            console.log("usuario no valido");
            msjError.innerHTML="Este email ya se registró"
            msjError.setAttribute('class', 'alert alert-danger');
            setTimeout(()=>{
                msjError.setAttribute('class', 'd-none')
            }, 1500);
        }else{
            //Es un email valido debemos proseguir
            console.log("registrado correctamente");
            msjError.innerHTML="Registro exitoso"
            msjError.setAttribute('class', 'alert alert-success');
            limpiarFormularioRegistro();
            setTimeout(()=>{
                msjError.setAttribute('class', 'd-none')
                //Redireccionamos a la pagina de administrador
                window.location.href = "../home.html";
            }, 1500);
            usuarios.push(newUser);
            const usuarioJSON = JSON.stringify(usuarios);
            localStorage.setItem('usuarios', usuarioJSON)
            }   
    }
}

const limpiarFormularioRegistro = () => {
    emailInput.value = "";
    passInput.value = "";
    nameInput.value = "";
}