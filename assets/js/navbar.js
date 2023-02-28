/**
 * Evento load que permite lo siguiente:
 *  -Modificar el saludo en la barra de navegacion de acuerdo a la hora actual.
 *  -Modificar el saludo en la barra de navegacion de acuerdo al especialista loggeado
 *  -No cargar ninguna pagina por URL a menos que se haya loggeado previamente el especialista con sus credenciales */

window.addEventListener('load',async (e)=>{
    if(sessionStorage.estadoSesion == undefined){
        await alerta('Error al cargar la pagina', 'Debes iniciar sesión para poder acceder al contenido', 'error');
        setTimeout(() =>{
            window.location='login.html';
        }, 1000);
    }
    let nombre = document.getElementById('nombre-navbar');
    let saludo = document.getElementById("saludo");
    let logaut = document.getElementById("logaut");
    let now = new Date();
    if(now.getHours() > 0 && now.getHours() < 12){
        saludo.innerHTML = 'Buenos dias, ';
    }else if(now.getHours() > 11 && now.getHours() < 19){
        saludo.innerHTML = 'Buenas tardes, ';
    }else if(now.getHours() > 19 && now.getHours() < 24){
        saludo.innerHTML = 'Buenas noches, ';
    }
    nombre.innerHTML = sessionStorage.nombreEspecialista;
    logaut.addEventListener('click', () =>{
        sessionStorage.clear();
        setTimeout(() =>{
            window.location='login.html';
        }, 1500);
    })

})