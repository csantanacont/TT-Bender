const formAgregarPaciente = document.getElementById('registrarPaciente');
const agregarReg_icon = document.getElementById("agregarRegistro-icon");
let dataPacientes =[], idPacientes = []

window.addEventListener('load',()=>{
    localStorage.removeItem("imgB64");
    localStorage.removeItem("evaluacion");
    let datosTabla = document.getElementById("datosTabla");
    datosTabla.innerHTML = ``;

    db.collection("pacientes")
    .where("idEspecialistaCabecera", '==',sessionStorage.idEspecialista)
    .get()
    .then((querySnapshot) =>{
        querySnapshot.forEach(doc =>{
            dataPacientes.push(doc.data())
            idPacientes.push(doc.id)
            // console.log(doc.data())
            datosTabla.innerHTML += `
            <tr>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().apellidoPaterno}</td>
            <td>${doc.data().apellidoMaterno}</td>
            <td>${doc.data().fechaRegistro}</td>
            <td>
                <div class="acciones">
                    <a title="Ver datos del paciente" href="verPaciente.html?id=${doc.id}"><img src="./assets/img/icons8-eye-50.png" alt="ver" class="icon"></a>
                    <a title="Editar datos del paciente" onclick="editarRegistro('${doc.id}');"><img src="./assets/img/icons8-pencil-48.png" alt="editar" class="icon"></a>
                    <a title="Eliminar datos del paciente" href="#" onclick="eliminarRegistro('${doc.id}')"><img src="./assets/img/icons8-trash-can-60.png" alt="borrar" class="icon"></a>
                    <a title="Consultar pruebas del paciente" href="listarPruebas.html?id=${doc.id}"><img src="./assets/img/icons8-bulleted-list-50.png" alt="lista" class="icon"></a>
                </div>
            </td>
        </tr>`
        })
    })
})

let borrarRegistro = async (id) =>{
    let idTutorPorBorrar;
    await db.collection("pacientes").doc(id).get().then((querySnapshot) =>{
        idTutorPorBorrar = querySnapshot.data().idTutor;
    })

    await db.collection("tutores").doc(idTutorPorBorrar).delete()
    .then(async () =>{
        await db.collection("telefonos")
        .where("idTutor","==",idTutorPorBorrar)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.docs.forEach(doc =>{
                db.collection("telefonos").doc(doc.id).delete()
                    .then(async () =>{
                        await db.collection("pacientes").doc(id).delete()
                        .then(() =>{
                            Swal.fire(
                                'Eliminado',
                                'El registro ha sido eliminado',
                                'success'
                            ).then(()=>{
                                location.reload();
                            })
                        })
                    })
            })

        })
        
    })
    
}


agregarReg_icon.addEventListener('click', () =>{
    let listaEspecialistas = document.getElementById('psicologoCabeceraPaciente');
    listaEspecialistas.innerHTML = '';
    generarCURP()
    db.collection('especialistas')
    .get()
    .then((querySnapshot) =>{
        querySnapshot.forEach((doc) =>{
            let nombreEspecialista = doc.data().nombre +" "+doc.data().apellidoPaterno +" "+ doc.data().apellidoMaterno;
            if(doc.id == sessionStorage.idEspecialista)
                listaEspecialistas.innerHTML += `<option selected value="${doc.id}">${nombreEspecialista}</option>`
            else
                listaEspecialistas.innerHTML += `<option value="${doc.id}">${nombreEspecialista}</option>`
        })
    })
})
formAgregarPaciente.addEventListener('submit',async (e) =>{
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
    await db.collection("pacientes")
    .where("CURP","==",document.getElementById("curpPaciente").value)
    .get()
    .then(async (querySnapshot) =>{
        if(querySnapshot.docs.length == 0){
            let idTutorPaciente; 
            let dataTutor = {
            nombre: capitalizarPalabras(document.getElementById("nombreTutor").value),
            apellidoPaterno: capitalizarPalabras(document.getElementById("aPaternoTutor").value),
            apellidoMaterno: capitalizarPalabras(document.getElementById("aMaternoTutor").value),
            email: document.getElementById("emailTutor").value.toLowerCase(),
            parentezco: document.getElementById("parentezcoTutor").value
            }
            await db.collection("tutores").add(dataTutor)
            .then(docRef =>{
                // console.log(docRef.id);
                idTutorPaciente = docRef.id;
            });

            const fechaActual = new Date(), fechaNacimiento = new Date(document.getElementById("fechaNacimientoPaciente").value);
            const diferenciaMs = fechaActual - fechaNacimiento;

            // Convierte la diferencia de milisegundos a años
            const edad = Math.floor(diferenciaMs / 1000 / 60 / 60 / 24 / 365);
            const edadDiferencia = edad - (diferenciaMs / 1000 / 60 / 60 / 24 / 365);
            const meses = Math.floor(edadDiferencia * 12)
            
            console.log(edad)
            if(edad > 12 || edad < 3){
                await alerta('Error al registrar', 'La edad del paciente debe ser de entre 4 y 11 años. \n La edad ingresada es de '+edad+' años', 'warning')
                return 
            }

            if(document.getElementById("curpPaciente").value.length != 18){
                await alerta('Error al registrar', 'El CURP ingresado no es válido', 'info')
                return 
            }


            let dataPaciente = {
                nombre: capitalizarPalabras(document.getElementById("nombrePaciente").value),
                apellidoPaterno: capitalizarPalabras(document.getElementById("aPaternoPaciente").value),
                apellidoMaterno: capitalizarPalabras(document.getElementById("aMaternoPaciente").value),
                fechaNacimiento: document.getElementById("fechaNacimientoPaciente").value,
                CURP:document.getElementById("curpPaciente").value.toUpperCase(),
                idTutor: idTutorPaciente,
                idEspecialistaCabecera: document.getElementById("psicologoCabeceraPaciente").value,
                fechaRegistro: fechaActualFormateada
            };

        // console.log(dataPaciente)
            await db.collection("pacientes").add(dataPaciente);

            let dataTelefonoTutor = {
                idTutor: idTutorPaciente,
                telefono: document.getElementById("telefonoTutor").value
            }
            await db.collection("telefonos").add(dataTelefonoTutor);
            
            await alerta('Registro exitoso', 'El paciente se ha registrado correctamente', 'success');

            setTimeout(() =>{
                location.reload();
            }, 1000);
        }else{
            await alerta('Error al registrar', 'El CURP que ingresaste ya se encuentra registrado', 'warning')
        }
    })
    
    
})

const generarCURP = () =>{
    let nombre = document.getElementById('nombrePaciente'), aP = document.getElementById('aPaternoPaciente'), aM = document.getElementById('aMaternoPaciente'),
    fechaNacimiento = document.getElementById('fechaNacimientoPaciente'), curpPaciente = document.getElementById('curpPaciente')

    nombre.addEventListener('change', (e) =>{
        if(nombre.value != '' && aP.value != '' && aM.value != '' && fechaNacimiento.value != ''){
            curpPaciente.value = obtenerCURP(aP.value+' '+aM.value+' '+nombre.value, fechaNacimiento.value)
        }
        else{
            curpPaciente.value = ''
        }
    })
    aP.addEventListener('change', (e) =>{
        if(nombre.value != '' && aP.value != '' && aM.value != '' && fechaNacimiento.value != ''){
            curpPaciente.value = obtenerCURP(aP.value+' '+aM.value+' '+nombre.value, fechaNacimiento.value)
        } else{
            curpPaciente.value = ''
        }
    })
    aM.addEventListener('change', (e) =>{
        if(nombre.value != '' && aP.value != '' && aM.value != '' && fechaNacimiento.value != ''){
            curpPaciente.value = obtenerCURP(aP.value+' '+aM.value+' '+nombre.value, fechaNacimiento.value)
        } else{
            curpPaciente.value = ''
        }
    })

    fechaNacimiento.addEventListener('change', (e) =>{
        if(nombre.value != '' && aP.value != '' && aM.value != '' && fechaNacimiento.value != ''){
            curpPaciente.value = obtenerCURP(aP.value+' '+aM.value+' '+nombre.value, fechaNacimiento.value)
        } else{
            curpPaciente.value = ''
        }
    })
}
const obtenerCURP = (nombre, fechaNacimiento) => {
    // Obtener primer letra del primer apellido
    const primerApellido = nombre.split(" ")[0].toUpperCase().charAt(0);
    console.log(fechaNacimiento)
    // Obtener primera vocal interna del primer apellido
    const regexVocal = /[AEIOU]/i;
    let primeraVocal = "";
    for (let i = 1; i < nombre.length; i++) {
      if (regexVocal.test(nombre[i])) {
        primeraVocal = nombre[i].toUpperCase();
        break;
      }
    }
  
    // Obtener primer letra del segundo apellido
    const segundoApellido = nombre.split(" ")[1].toUpperCase().charAt(0);
  
    // Obtener primera letra del primer nombre
    const primerNombre = nombre.split(" ")[2].toUpperCase().charAt(0);
  
    // Formatear fecha de nacimiento (DD/MM/AAAA)
    const dia = fechaNacimiento.split("-")[2]
    const mes = fechaNacimiento.split("-")[1]
    const anio = fechaNacimiento.split("-")[0].substr(-2)
  
  
    // Generar CURP
    const curp =
      primerApellido +
      primeraVocal +
      segundoApellido +
      primerNombre +
      anio +
      mes +
      dia
      
    
    return curp;
  }
  


let editarRegistro = async (idPaciente) =>{
    // document.getElementById('editarRegistro-home').addEventListener('click', async () =>{

        // let params = window.location.search;
        // let urlParams = new URLSearchParams(params);
        // let idPaciente = urlParams.get('id');

        $("#editarRegistroModal").modal()
        let paciente, tutor,especialista;
        let idTutor, idEspecialista;
        let especialistasLista = document.getElementById('psicologoCabeceraPacienteR');
    
        await db.collection("pacientes")
        .where(firebase.firestore.FieldPath.documentId(),'==',idPaciente)
        .get()
        .then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                paciente = doc.data();
            })
        })
        //  console.log(paciente)
        await db.collection("tutores")
        .where(firebase.firestore.FieldPath.documentId(),'==',paciente.idTutor)
        .get()
        .then(querySnapshot =>{
            querySnapshot.forEach(doc =>{
                tutor = doc.data();
                idTutor = doc.id;
            })
        })
        
        await db.collection("especialistas")
        // .where(firebase.firestore.FieldPath.documentId(),'==',paciente.idEspecialistaCabecera)
        .get()
        .then(querySnapshot =>{
            especialistasLista.innerHTML = '';
            querySnapshot.forEach(doc =>{
                especialista = doc.data();
                if(sessionStorage.idEspecialista == doc.id){
                    especialistasLista.innerHTML+=`<option selected value=${doc.id}>${especialista.nombre+" "+especialista.apellidoPaterno+" "+especialista.apellidoMaterno}</option>`
                }else{
                    especialistasLista.innerHTML+=`<option value=${doc.id}>${especialista.nombre+" "+especialista.apellidoPaterno+" "+especialista.apellidoMaterno}</option>`
                }
                idEspecialista = doc.id;
            })
        })
    
        await db.collection("telefonos")
        .where("idTutor",'==',paciente.idTutor)
        .get()
        .then(querySnapshot =>{
            let telefonosLista = document.getElementById('telefonoTutorR');
            telefonosLista.innerHTML = '';
            querySnapshot.forEach((doc) =>{
                telefonosLista.value = doc.data().telefono;
            })
        })
    
    
        document.getElementById("nombrePacienteR").value = paciente.nombre;
        document.getElementById("aPaternoPacienteR").value = paciente.apellidoPaterno;
        document.getElementById("aMaternoPacienteR").value = paciente.apellidoMaterno;
        document.getElementById("fechaNacimientoPacienteR").value = paciente.fechaNacimiento;
        document.getElementById("curpPacienteR").value = paciente.CURP;
    
        document.getElementById("nombreTutorR").value = tutor.nombre;
        document.getElementById("aPaternoTutorR").value = tutor.apellidoPaterno;
        document.getElementById("aMaternoTutorR").value = tutor.apellidoMaterno;
        document.getElementById("emailTutorR").value = tutor.email;
        document.getElementById('parentezcoTutorR').value = tutor.parentezco;
    
    
    
        document.getElementById("editarPaciente").addEventListener('submit', async (e) =>{
            e.preventDefault();
            
    
            let dataTutor = {
                nombre: document.getElementById("nombreTutorR").value,
                apellidoPaterno: document.getElementById("aPaternoTutorR").value,
                apellidoMaterno: document.getElementById("aMaternoTutorR").value,
                email: document.getElementById("emailTutorR").value,
                parentezco: document.getElementById("parentezcoTutorR").value
            }
            await db.collection("tutores").doc(idTutor).update(dataTutor)
            .then(() =>{
                // console.log("Se actualizaron los datos de tutor");
            });
            let dataPaciente = {
                nombre: document.getElementById("nombrePacienteR").value,
                apellidoPaterno: document.getElementById("aPaternoPacienteR").value,
                apellidoMaterno: document.getElementById("aMaternoPacienteR").value,
                fechaNacimiento: document.getElementById("fechaNacimientoPacienteR").value,
                CURP:document.getElementById("curpPacienteR").value,
                idTutor: idTutor,
                idEspecialistaCabecera: document.getElementById("psicologoCabeceraPacienteR").value,
            };


            const fechaActual = new Date(), fechaNacimiento = new Date(document.getElementById("fechaNacimientoPaciente").value);
            const diferenciaMs = fechaActual - fechaNacimiento;

            // Convierte la diferencia de milisegundos a años
            const edad = Math.floor(diferenciaMs / 1000 / 60 / 60 / 24 / 365);
            const edadDiferencia = edad - (diferenciaMs / 1000 / 60 / 60 / 24 / 365);
            const meses = Math.floor(edadDiferencia * 12)
            
            console.log(edad)
            if(edad > 12 || edad < 3){
                await alerta('Error al registrar', 'La edad del paciente debe ser de entre 4 y 11 años. \n La edad ingresada es de '+edad+' años', 'warning')
                return 
            }

            if(document.getElementById("curpPacienteR").value.length != 18){
                await alerta('Error al registrar', 'El CURP ingresado no es válido', 'info')
                return 
            }
            let registroRepetido =false
            dataPacientes.map(async (p,idx) =>{
                if(document.getElementById("curpPacienteR").value.toUpperCase() == p.CURP && idPacientes[idx] != idPaciente){
                    registroRepetido = true
                }
            })
            if(registroRepetido){
                await alerta('Error al registrar', 'El CURP ingresado ya pertenece a otro registro', 'warning')
                return
            }
        
            // console.log(dataPaciente)
            await db.collection("pacientes").doc(idPaciente).update(dataPaciente)
            .then(() =>{
                // console.log("Se actualizaron los datos de paciente");
            });
        
            let dataTelefonoTutor = {
                idTutor: idTutor,
                telefono: document.getElementById("telefonoTutorR").value
            }
    
            let idTelefonos;
            await db.collection("telefonos")
            .where("idTutor","==",idTutor)
            .get()
            .then(querySnapshot =>{
                querySnapshot.forEach(doc =>{
                    idTelefonos = doc.id 
                })
            })
            await db.collection("telefonos").doc(idTelefonos).update(dataTelefonoTutor)
            .then(() =>{
                // console.log("Se actualizaron los datos de paciente");
            });
            
            await alerta('Datos actualizados', 'Los datos del paciente se actualizaron correctamente', 'success');
        
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
        dataPacientes.map((d,i) =>{
            actualizarTabla(i)
        })
    }else{
        let res = buscarPaciente(dataPacientes, e.target.value)
    }
})

const buscarPaciente = (data, valor) =>{
    let datosTabla = document.getElementById("datosTabla");
    let mensaje = document.getElementById("mensajeBusqueda");
    datosTabla.innerHTML = ``;
    mensaje.innerHTML = `No se encuentran registros que coincidan con la busqueda`;
    
    registrosAConsiderar = []
    registro = valor.split(' ')

    data.map((paciente, idx) =>{
        nombreCompleto = paciente.nombre + paciente.apellidoPaterno + paciente.apellidoMaterno
        for(let i=0; i<registro.length;i++){
            if(registro[i] != '')
            if(nombreCompleto.includes(registro[i]) || paciente.CURP.includes(registro[i])){
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

const actualizarTabla = (index) =>{
    let datosTabla = document.getElementById("datosTabla");
    // datosTabla.innerHTML = ``;
    datosTabla.innerHTML += `
    <tr>
    <td>${dataPacientes[index].nombre}</td>
    <td>${dataPacientes[index].apellidoPaterno}</td>
    <td>${dataPacientes[index].apellidoMaterno}</td>
    <td>${dataPacientes[index].fechaRegistro}</td>
    <td>
        <div class="acciones">
            <a href="verPaciente.html?id=${idPacientes[index]}"><img src="./assets/img/icons8-eye-50.png" alt="ver" class="icon"></a>
            <a onclick="editarRegistro('${idPacientes[index]}');"><img src="./assets/img/icons8-pencil-48.png" alt="editar" class="icon"></a>
            <a href="#" onclick="eliminarRegistro('${idPacientes[index]}')"><img src="./assets/img/icons8-trash-can-60.png" alt="borrar" class="icon"></a>
            <a href="listarPruebas.html?id=${idPacientes[index]}"><img src="./assets/img/icons8-bulleted-list-50.png" alt="lista" class="icon"></a>
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