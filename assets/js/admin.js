const formAgregarEspecialista = document.getElementById('registrarEspecialista');
const agregarReg_icon = document.getElementById("agregarRegistro-icon");
const dataEspecialistas = [], idEspecialistas = [];

window.addEventListener('load',()=>{
    localStorage.removeItem("imgB64");
    localStorage.removeItem("evaluacion");
    let datosTabla = document.getElementById("datosTabla");
    datosTabla.innerHTML = ``;

    db.collection("especialistas")
    // .where("idEspecialistaCabecera", '==',sessionStorage.idEspecialista)
    .get()
    .then((querySnapshot) =>{
        querySnapshot.forEach(doc =>{
            dataEspecialistas.push(doc.data());
            idEspecialistas.push(doc.id)
            // console.log(doc.data())
            datosTabla.innerHTML += `
            <tr>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().apellidoPaterno}</td>
            <td>${doc.data().apellidoMaterno}</td>
            <td>${doc.data().fechaRegistro}</td>
            <td>
                <div class="acciones">
                    <a title="Ver datos del Especialista" onclick="verRegistro('${doc.id}')"><img src="./assets/img/icons8-eye-50.png" alt="ver" class="icon"></a>
                    <a title="Editar datos del Especialista" onclick="editarRegistro('${doc.id}');"><img src="./assets/img/icons8-pencil-48.png" alt="editar" class="icon"></a>
                    <a title="Eliminar datos del Especialista" href="#" onclick="eliminarRegistroEspecialista('${doc.id}')"><img src="./assets/img/icons8-trash-can-60.png" alt="borrar" class="icon"></a>
                    <a title="Consultar pacientes del Especialista" href="listarPacientes.html?id=${doc.id}"><img src="./assets/img/icons8-bulleted-list-50.png" alt="lista" class="icon"></a>
                </div>
            </td>
        </tr>`
        })
    })
})

let borrarRegistroEspecialista = async (idSustituto, idABorrar) =>{

    pacientesAModificar = []
    await db.collection("pacientes")
    .where("idEspecialistaCabecera", '==',idABorrar)
    .get()
    .then((querySnapshot) =>{
        querySnapshot.forEach(doc =>{
            pacientesAModificar.push(doc.id)
        })
    });

    pacientesAModificar.map(async (id) => {
        await db.collection("pacientes").doc(id).update({idEspecialistaCabecera:idSustituto})
        .then(() =>{
            console.log("Se reasignaron los pacientes");
        });
    })
    await db.collection("especialistas").doc(idABorrar).delete()
    .then(() =>{
        Swal.fire(
            'Eliminado',
            'El especialista ha sido eliminado',
            'success'
        ).then(()=>{
            location.reload();
        })
    })
}
const existeEspecialista = (user) =>{
    let encontrado = false
    dataEspecialistas.map(e => {
        if(!encontrado)
            e.nombreUsuario == user ? encontrado = true : encontrado = false
    })
    return encontrado
}
formAgregarEspecialista.addEventListener('submit',async (e) =>{
    e.preventDefault();
    let date = new Date()

    let dia= date.getDate()
    let mes = date.getMonth() + 1
    let anio = date.getFullYear()

    let fechaActualFormateada

    if(mes < 10){
        fechaActualFormateada = `${dia}-0${mes}-${anio}`
      }else{
        fechaActualFormateada = `${dia}-${mes}-${anio}`
      }

    let dataEspecialista = {
        nombre: capitalizarPalabras(document.getElementById("nombreEspecialista").value),
        apellidoPaterno: capitalizarPalabras(document.getElementById("aPaternoEspecialista").value),
        apellidoMaterno: capitalizarPalabras(document.getElementById("aMaternoEspecialista").value),
        nombreUsuario: document.getElementById("usuarioEspecialista").value,
        contrasenia:document.getElementById("passwordEspecialista").value,
        fechaRegistro: fechaActualFormateada
    }

    if(existeEspecialista(dataEspecialista.nombreUsuario)){
        await alerta('Registro no valido', "El especialista que intentas registrar, ya se encuentra registrado", 'info');
        return
    }

    // console.log(dataEspecialista)
    await db.collection("especialistas").add(dataEspecialista).then( async () =>{
        await alerta('Registro exitoso', 'El Especialista se ha registrado correctamente', 'success');
        setTimeout(() =>{
            location.reload();
        }, 1000);
    })
    
    
})



let editarRegistro = async (idEspecialista) =>{
    // document.getElementById('editarRegistro-home').addEventListener('click', async () =>{

        // let params = window.location.search;
        // let urlParams = new URLSearchParams(params);
        // let idEspecialista = urlParams.get('id');

        $("#editarRegistroModal").modal()
        let Especialista
        
        inputs = document.querySelectorAll('.form-control');
        const inputsConR = Array.from(inputs).filter(input => input.id.endsWith('R')); // Seleccionar los inputs que cumplen la condición


        for(let i=0;i<inputsConR.length;i++){
            inputsConR[i].disabled = false;
        }
        document.getElementById('btn-ok').innerHTML = 'Guardar cambios'
        let a = document.getElementById('tituloModal');
        a.innerHTML = '<h1 class="modal-title fs-5" id="exampleModalLabel">Editar especialista</h1>'

        await db.collection("especialistas")
        .where(firebase.firestore.FieldPath.documentId(),'==',idEspecialista)
        .get()
        .then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                Especialista = doc.data();
            })
        })
        
        
    
    
        document.getElementById("nombreEspecialistaR").value = Especialista.nombre;
        document.getElementById("aPaternoEspecialistaR").value = Especialista.apellidoPaterno;
        document.getElementById("aMaternoEspecialistaR").value = Especialista.apellidoMaterno;
        document.getElementById("usuarioEspecialistaR").value = Especialista.nombreUsuario;
        document.getElementById("passwordEspecialistaR").value = Especialista.contrasenia;
    
    
    
        document.getElementById("editarEspecialista").addEventListener('submit', async (e) =>{
            e.preventDefault();
            
            // console.log(document.getElementById("passwordEspecialistaR").value, )

            let dataEspecialista = {
                nombre: document.getElementById("nombreEspecialistaR").value,
                apellidoPaterno: document.getElementById("aPaternoEspecialistaR").value,
                apellidoMaterno: document.getElementById("aMaternoEspecialistaR").value,
                nombreUsuario: document.getElementById("usuarioEspecialistaR").value,
                contrasenia: document.getElementById("passwordEspecialistaR")?.value 
            };
            if(Especialista.nombreUsuario != dataEspecialista.nombreUsuario)
                if(existeEspecialista(dataEspecialista.nombreUsuario)){
                await alerta('Registro no valido', "El nombre de usaurio que intentas utilizar, ya se encuentra registrado", 'info');
                return
                }
        
            // console.log(dataEspecialista)
            await db.collection("especialistas").doc(idEspecialista).update(dataEspecialista)
            .then(() =>{
                // console.log("Se actualizaron los datos de Especialista");
            });
        
            
            await alerta('Datos actualizados', 'Los datos del Especialista se actualizaron correctamente', 'success');
        
            setTimeout(() =>{
                location.reload();
            }, 1000);
        })
    
    
}
document.getElementById('barra-busqueda').addEventListener("input", (e) =>{
    if(e.target.value == ''){
        let datosTabla = document.getElementById("datosTabla");
        let mensaje = document.getElementById("mensajeBusqueda");
        datosTabla.innerHTML = ``;
        mensaje.innerHTML = ``;
        dataEspecialistas.map((d,i) =>{
            actualizarTabla(i)
        })
    }else{
        let res = buscarespecialista(dataEspecialistas, e.target.value)
    }
})

const buscarespecialista = (data, valor) =>{
    // console.log(data)
    let datosTabla = document.getElementById("datosTabla");
    let mensaje = document.getElementById("mensajeBusqueda");
    datosTabla.innerHTML = ``;
    mensaje.innerHTML = `No se encuentran registros que coincidan con la busqueda`;
    
    registrosAConsiderar = []
    registro = valor.split(' ')

    data.map((especialista, idx) =>{
        nombreCompleto = especialista.nombre + especialista.apellidoPaterno + especialista.apellidoMaterno
        for(let i=0; i<registro.length;i++){
            if(nombreCompleto.includes(registro[i]) || especialista.nombreUsuario.includes(registro[i])){
                if(!registrosAConsiderar.includes(idx)){
                    registrosAConsiderar.push(idx) 
                }    
            }
        }
    })
    if(registrosAConsiderar.length == 0){
            datosTabla.innerHTML = ``;
            mensaje.innerHTML = `No se encuentran registros que coincidan con la busqueda`;
    }else{
            datosTabla.innerHTML = ``;
            mensaje.innerHTML = ``;
    }   
    registrosAConsiderar.map(i =>{
        actualizarTabla(i)
    })   
}

document.getElementById('barra-busqueda').addEventListener("change", (e) =>{
    if(e.target.value == ''){
        location.reload();
    }
})

const actualizarTabla = (index) =>{
    let datosTabla = document.getElementById("datosTabla");
    // datosTabla.innerHTML = ``;
    datosTabla.innerHTML += `
    <tr>
    <td>${dataEspecialistas[index].nombre}</td>
    <td>${dataEspecialistas[index].apellidoPaterno}</td>
    <td>${dataEspecialistas[index].apellidoMaterno}</td>
    <td>${dataEspecialistas[index].fechaRegistro}</td>
    <td>
        <div class="acciones">
            <a href="verEspecialista.html?id=${idEspecialistas[index]}"><img src="./assets/img/icons8-eye-50.png" alt="ver" class="icon"></a>
            <a onclick="editarRegistro('${idEspecialistas[index]}');"><img src="./assets/img/icons8-pencil-48.png" alt="editar" class="icon"></a>
            <a href="#" onclick="eliminarRegistro('${idEspecialistas[index]}')"><img src="./assets/img/icons8-trash-can-60.png" alt="borrar" class="icon"></a>
            <a href="listarPruebas.html?id=${idEspecialistas[index]}"><img src="./assets/img/icons8-bulleted-list-50.png" alt="lista" class="icon"></a>
        </div>
    </td>
</tr>`

}

const capitalizarPalabras = (val) => {  
    return val.toLowerCase()
              .trim()
              .split(' ')
              .map( v => v[0].toUpperCase() + v.substr(1) )
              .join(' ');  
  }



  let verRegistro = async (idEspecialista) =>{
    // document.getElementById('editarRegistro-home').addEventListener('click', async () =>{

        // let params = window.location.search;
        // let urlParams = new URLSearchParams(params);
        // let idEspecialista = urlParams.get('id');

        $("#editarRegistroModal").modal()

        inputs = document.querySelectorAll('.form-control');
        const inputsConR = Array.from(inputs).filter(input => input.id.endsWith('R')); 
        let a = document.getElementById('tituloModal');
        a.innerHTML = '<h1 class="modal-title fs-5" id="exampleModalLabel">Ver especialista</h1>'

        console.log(a)

        for(let i=0;i<inputsConR.length;i++){
            inputsConR[i].disabled = true;
        }
        document.getElementById('btn-ok').innerHTML = 'Aceptar'


        await db.collection("especialistas")
        .where(firebase.firestore.FieldPath.documentId(),'==',idEspecialista)
        .get()
        .then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                Especialista = doc.data();
            })
        })
        
        
    
    
        document.getElementById("nombreEspecialistaR").value = Especialista.nombre;
        document.getElementById("aPaternoEspecialistaR").value = Especialista.apellidoPaterno;
        document.getElementById("aMaternoEspecialistaR").value = Especialista.apellidoMaterno;
        document.getElementById("usuarioEspecialistaR").value = Especialista.nombreUsuario;
        document.getElementById("passwordEspecialistaR").value = Especialista.password;
    
    
}