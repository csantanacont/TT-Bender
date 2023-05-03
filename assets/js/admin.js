const formAgregarEspecialista = document.getElementById('registrarEspecialista');
const agregarReg_icon = document.getElementById("agregarRegistro-icon");


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
                    <a title="Eliminar datos del Especialista" href="#" onclick="eliminarRegistro('${doc.id}')"><img src="./assets/img/icons8-trash-can-60.png" alt="borrar" class="icon"></a>
                    <a title="Consultar pruebas del Especialista" href="listarPruebas.html?id=${doc.id}"><img src="./assets/img/icons8-bulleted-list-50.png" alt="lista" class="icon"></a>
                </div>
            </td>
        </tr>`
        })
    })
})

let borrarRegistro = async (id) =>{
    let dataEsp =[];
    
    db.collection("especialistas")
    .get()
    .then((querySnapshot) =>{
        querySnapshot.forEach(doc =>{
            let e = doc.data()
            e["id"] = doc.id
            dataEsp.push(e)
        })
    })

    for(let i=0;i<dataEsp.length;i++){
        console.log(dataEsp)
    }
    
   
    // Swal.fire({
    //     title: 'Select Outage Tier',
    //     input: 'select',
    //     inputOptions: {
    //       '1': 'Tier 1',
    //       '2': 'Tier 2',
    //       '3': 'Tier 3'
    //     },
    //     inputPlaceholder: 'required',
    //     showCancelButton: true,
    //     inputValidator: function (value) {
    //       return new Promise(function (resolve, reject) {
    //         if (value !== '') {
    //           resolve();
    //         } else {
    //           resolve('You need to select a Tier');
    //         }
    //       });
    //     }
    //   }).then(function (result) {
    //     if (result.isConfirmed) {
    //       Swal.fire({
    //         icon: 'success',
    //         html: 'You selected: ' + result.value
    //       });
    //     }
    //   });

    // await db.collection("especialistas").doc(id).delete()
    // .then(async () =>{
    //                     Swal.fire(
    //                         'Eliminado',
    //                         'El registro ha sido eliminado',
    //                         'success'
    //                     ).then(()=>{
    //                         location.reload();
    //                     })
    // })
    
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
            
            console.log(document.getElementById("passwordEspecialistaR").value, )

            let dataEspecialista = {
                nombre: document.getElementById("nombreEspecialistaR").value,
                apellidoPaterno: document.getElementById("aPaternoEspecialistaR").value,
                apellidoMaterno: document.getElementById("aMaternoEspecialistaR").value,
                nombreUsuario: document.getElementById("usuarioEspecialistaR").value,
                contrasenia: document.getElementById("passwordEspecialistaR")?.value 
            };
        
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

document.getElementById('btn-busqueda').addEventListener('click', ()=>{
    let barraBusqueda = document.getElementById('barra-busqueda');
    let busqueda = barraBusqueda.value.split(' ');
    let datosTabla = document.getElementById("datosTabla");
    db.collection("Especialistas")
    .where("nombre","==",busqueda[0])
    .where("apellidoPaterno","==",busqueda[1])
    .get()
    .then(async (querySnapshot) =>{
        if(querySnapshot.docs.length == 0){
            datosTabla.innerHTML = ``;
            alerta('Especialista no encontrado', 'No existen resultados que coincidan con la busqueda, vuelve a intentarlo', 'info')
        }else{
            await alerta('Se encontraron '+ querySnapshot.docs.length +' resultado(s)', 'Los siguientes resultados coincidan con la busqueda', 'success')
            datosTabla.innerHTML = ``;
            querySnapshot.forEach(doc =>{
                datosTabla.innerHTML += `
                <tr>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellidoPaterno}</td>
                <td>${doc.data().apellidoMaterno}</td>
                <td>${doc.data().fechaRegistro}</td>
                <td>
                    <div class="acciones">
                        <a href="verEspecialista.html?id=${doc.id}"><img src="./assets/img/icons8-eye-50.png" alt="ver" class="icon"></a>
                        <a onclick="editarRegistro('${doc.id}');"><img src="./assets/img/icons8-pencil-48.png" alt="editar" class="icon"></a>
                        <a href="#" onclick="eliminarRegistro('${doc.id}')"><img src="./assets/img/icons8-trash-can-60.png" alt="borrar" class="icon"></a>
                        <a href="listarPruebas.html?id=${doc.id}"><img src="./assets/img/icons8-bulleted-list-50.png" alt="lista" class="icon"></a>
                    </div>
                </td>
            </tr>`
            })
        }
        
    })
})

document.getElementById('barra-busqueda').addEventListener("change", (e) =>{
    if(e.target.value == ''){
        location.reload();
    }
})

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