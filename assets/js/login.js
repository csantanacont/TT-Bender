const usuario = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("btn-iniciar-sesion-submit");
const formLogin = document.getElementById("formulario-login");

window.addEventListener('load',() =>{
    sessionStorage.clear();
})
formLogin.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let idEspecialista, especialista;
    if (usuario.value == '' || password.value == ''){
        alerta('Campos vacios', 'Por favor, ingresa los datos solicitados para iniciar sesión', 'info')
    }else{
        db.collection("especialistas")
        .where("nombreUsuario","==",usuario.value)
        .where("contrasenia","==",password.value)
        .get()
        .then((querySnapshot)=>{
            if(querySnapshot.docs.length == 0){
                alerta('Datos incorrectos', 'Los datos que ingresaste no son correctos, vuelve a intentarlo', 'error')
            }
            querySnapshot.forEach((doc)=>{
                if(doc.id != null){
                    idEspecialista = doc.id;
                    especialista = doc.data().nombre;
                    console.log(doc.data())
                    login(idEspecialista,especialista);
                }
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
    }
})

const login = async (idEspecialista,especialista)=>{
    sessionStorage.setItem('idEspecialista', idEspecialista);
    sessionStorage.setItem('nombreEspecialista', especialista);
    sessionStorage.setItem('estadoSesion', true)
    sessionStorage.setItem('urls', [])
    await alerta('Bienvenido(a) '+especialista, 'Inicio de sesión exitoso', 'success');
    setTimeout(() =>{
        window.location='home.html';
    }, 1500);
}

