dataPacientes = []
idPacientes = []
dataEspecialistas = []
idEspecialistas = []
idEspecialista = ""
window.addEventListener('load',async () =>{
  
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    idEspecialista = urlParams.get('id');
    await cargarDatosPacientes()
    monitorearCambioEspecialista();

    consultaArchivos()
})

const monitorearCambioEspecialista = () =>{
    selectList = document.querySelectorAll('[id^="select"]')
    for(let i=0; i<selectList.length;i++){
        selectList[i].addEventListener('change',(e) =>{
            if(e.target.value == idEspecialista){
                cancelarCambios(e.target.id.substr(6),e.target.id)
            }else{
                let nombreEspecialista = selectList[i].options[selectList[i].options.selectedIndex].text;
                let idEsp = selectList[i].value;
                document.getElementById("confirmaCambios"+selectList[i].id.substr(6)).innerHTML = `
                <a href="#" onclick="confirmarCambios('${e.target.id.substr(6)}','${e.target.value}')"><img src="./assets/img/icons8-ok-40.png" alt="OK" class="icon"></a>
                <a href="#" onclick="cancelarCambios('${e.target.id.substr(6)}', '${e.target.id}')"><img src="./assets/img/icons8-cancel-40.png" alt="Cancelar" class="icon"></a>
                `
            }
            
        })
    }
}

const consultaArchivos = () =>{
    var listRef = defaultStorage.ref.child('files/modelos');
    listRef.listAll()
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
     console.log(folderRef)
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
}

const confirmarCambios = async (id, value) =>{

    await db.collection("pacientes").doc(id).update({idEspecialistaCabecera:value})
    .then(async () =>{
        await alerta('Cambios guardados','Pacientes actualizados', 'success')
        setTimeout(() =>{
            location.reload();
        }, 1000);
    });
    
}

const cancelarCambios = (id, idSelect) =>{
    let select = document.getElementById(idSelect);
    document.getElementById("confirmaCambios"+id).innerHTML = ""
    select.value = idEspecialista;
}
const cargarDatosPacientes = async () =>{
    datosTabla = document.getElementById("datosTabla");
    
    await db.collection("especialistas")
    .get()
    .then((querySnapshot) =>{
        querySnapshot.forEach(doc =>{
            dataEspecialistas.push(doc.data())
            idEspecialistas.push(doc.id)
        })
    })
    // console.log(idEspecialista)
    await db.collection("pacientes")
    .where("idEspecialistaCabecera", '==',idEspecialista)
    .get()
    .then((querySnapshot) =>{
        querySnapshot.forEach(doc =>{
            // console.log("si hay ")
            dataPacientes.push(doc.data())
            idPacientes.push(doc.id)
        })
    })
    especialista = dataEspecialistas[idEspecialistas.indexOf(idEspecialista)]
    especialistaNombre = especialista.nombre + " "+especialista.apellidoPaterno
    document.getElementById('titulo').innerHTML += `${especialistaNombre}`
    dataPacientes.map((p, idx) =>{
        datosTabla.innerHTML += `
            <tr>
            <td>${p.CURP}</td>
            <td>${p.nombre}</td>
            <td>${p.apellidoPaterno}</td>
            <td>${p.apellidoMaterno}</td>
            <td>${p.fechaRegistro}</td>
            <td>
            <div class="acciones">
            <select class="custom-select" id="select${idPacientes[idx]}">
            </select>
            <div id="confirmaCambios${idPacientes[idx]}" class="acciones"></div>
            </div>
            </td>
        </tr>`
   })
   
    for(let j=0;j<idPacientes.length;j++){
        for(let i=0; i<dataEspecialistas.length;i++){
            nombreEspecialista = dataEspecialistas[i].nombre+" "+dataEspecialistas[i].apellidoPaterno+" "+dataEspecialistas[i].apellidoMaterno
            if(dataPacientes[j].idEspecialistaCabecera == idEspecialistas[i]){
                document.getElementById("select"+idPacientes[j]).innerHTML += `<option value=${idEspecialistas[i]} selected>${nombreEspecialista}</option>`
            }else{
                document.getElementById("select"+idPacientes[j]).innerHTML += `<option value=${idEspecialistas[i]}>${nombreEspecialista}</option>`
            }   
        }  
    }
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
        monitorearCambioEspecialista();
    })
    
    
}

const actualizarTabla = (idx) =>{
    let datosTabla = document.getElementById("datosTabla");
    // console.log(dataPacientes)
    // datosTabla.innerHTML = ``;
    let p = dataPacientes[idx]
    datosTabla.innerHTML += `
     <tr>
            <td>${p.CURP}</td>
            <td>${p.nombre}</td>
            <td>${p.apellidoPaterno}</td>
            <td>${p.apellidoMaterno}</td>
            <td>${p.fechaRegistro}</td>
            <td>
            <div class="acciones">
            <select class="custom-select" id="select${idPacientes[idx]}">
            </select>
            <div id="confirmaCambios${idPacientes[idx]}" class="acciones"></div>
            </div>
            </td>
        </tr>`

        for(let i=0; i<dataEspecialistas.length;i++){
            nombreEspecialista = dataEspecialistas[i].nombre+" "+dataEspecialistas[i].apellidoPaterno+" "+dataEspecialistas[i].apellidoMaterno
            if(dataPacientes[idx].idEspecialistaCabecera == idEspecialistas[i]){
                // console.log(dataPacientes[idx].idEspecialistaCabecera, idEspecialistas[i])
                document.getElementById("select"+idPacientes[idx]).innerHTML += `<option value=${idEspecialistas[i]} selected>${nombreEspecialista}</option>`
            }else{
                document.getElementById("select"+idPacientes[idx]).innerHTML += `<option value=${idEspecialistas[i]}>${nombreEspecialista}</option>`
            }   
        }  
}