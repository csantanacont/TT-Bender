window.addEventListener("load",async () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let idPaciente = urlParams.get('id');
    let paciente, tutor, especialista;

    await db.collection("pacientes")
    .where(firebase.firestore.FieldPath.documentId(),'==',idPaciente)
    .get()
    .then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
            paciente = doc.data();
        })
    })

    await db.collection("tutores")
    .where(firebase.firestore.FieldPath.documentId(),'==',paciente.idTutor)
    .get()
    .then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
            tutor = doc.data();
        })
    })
    
    await db.collection("especialistas")
    .where(firebase.firestore.FieldPath.documentId(),'==',paciente.idEspecialistaCabecera)
    .get()
    .then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
            especialista = doc.data();
        })
    })

    await db.collection("telefonos")
    .where("idTutor",'==',paciente.idTutor)
    .get()
    .then(querySnapshot =>{
        let telefonosLista = document.getElementById('inputTelContactoTutor');
        telefonosLista.innerHTML = '';
        querySnapshot.forEach((doc, idx) =>{
            // telefonosLista.innerHTML = `<option selected>${doc.data().telefono}</option>`
            telefonosLista.value = doc.data().telefono
        })
    })


    document.getElementById("inputNombrePaciente").value = paciente.nombre;
    document.getElementById("inputAPaternoPaciente").value = paciente.apellidoPaterno;
    document.getElementById("inputAMaternoPaciente").value = paciente.apellidoMaterno;
    document.getElementById("inputFechaNacimientoPaciente").value = paciente.fechaNacimiento;
    document.getElementById("inputCURPPaciente").value = paciente.CURP;
    document.getElementById("inputDoctorPaciente").value = especialista.nombre+" "+especialista.apellidoPaterno+" "+especialista.apellidoMaterno;

    document.getElementById("inputNombreTutor").value = tutor.nombre;
    document.getElementById("inputAPaternoTutor").value = tutor.apellidoPaterno;
    document.getElementById("inputAMaternoTutor").value = tutor.apellidoMaterno;
    document.getElementById("inputTutor").value = tutor.parentezco;
    document.getElementById("inputEmailTutor").value = tutor.email;
})


document.getElementById('editarRegistro').addEventListener('click', async () =>{

    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let idPaciente = urlParams.get('id');
    let paciente, tutor,especialista;
    let idTutor, idEspecialista;
    let especialistasLista = document.getElementById('psicologoCabeceraPaciente');

    await db.collection("pacientes")
    .where(firebase.firestore.FieldPath.documentId(),'==',idPaciente)
    .get()
    .then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
            paciente = doc.data();
        })
    })
     console.log(paciente)
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
            especialistasLista.innerHTML+=`<option value=${doc.id}>${especialista.nombre+" "+especialista.apellidoPaterno+" "+especialista.apellidoMaterno}</option>`
            idEspecialista = doc.id;
        })
    })

    await db.collection("telefonos")
    .where("idTutor",'==',paciente.idTutor)
    .get()
    .then(querySnapshot =>{
        let telefonosLista = document.getElementById('telefonoTutor');
        telefonosLista.innerHTML = '';
        querySnapshot.forEach((doc) =>{
            telefonosLista.value = doc.data().telefono;
        })
    })


    document.getElementById("nombrePaciente").value = paciente.nombre;
    document.getElementById("aPaternoPaciente").value = paciente.apellidoPaterno;
    document.getElementById("aMaternoPaciente").value = paciente.apellidoMaterno;
    document.getElementById("fechaNacimientoPaciente").value = paciente.fechaNacimiento;
    document.getElementById("curpPaciente").value = paciente.CURP;

    document.getElementById("nombreTutor").value = tutor.nombre;
    document.getElementById("aPaternoTutor").value = tutor.apellidoPaterno;
    document.getElementById("aMaternoTutor").value = tutor.apellidoMaterno;
    document.getElementById("emailTutor").value = tutor.email;
    document.getElementById('parentezcoTutor').value = tutor.parentezco;



    document.getElementById("editarPaciente").addEventListener('submit', async (e) =>{
        e.preventDefault();
        

        let dataTutor = {
            nombre: document.getElementById("nombreTutor").value,
            apellidoPaterno: document.getElementById("aPaternoTutor").value,
            apellidoMaterno: document.getElementById("aMaternoTutor").value,
            email: document.getElementById("emailTutor").value,
            parentezco: document.getElementById("parentezcoTutor").value
        }
        await db.collection("tutores").doc(idTutor).update(dataTutor)
        .then(() =>{
            console.log("Se actualizaron los datos de tutor");
        });
        let dataPaciente = {
            nombre: document.getElementById("nombrePaciente").value,
            apellidoPaterno: document.getElementById("aPaternoPaciente").value,
            apellidoMaterno: document.getElementById("aMaternoPaciente").value,
            fechaNacimiento: document.getElementById("fechaNacimientoPaciente").value,
            CURP:document.getElementById("curpPaciente").value,
            idTutor: idTutor,
            idEspecialistaCabecera: document.getElementById("psicologoCabeceraPaciente").value,
        };
    
        console.log(dataPaciente)
        await db.collection("pacientes").doc(idPaciente).update(dataPaciente)
        .then(() =>{
            console.log("Se actualizaron los datos de paciente");
        });
    
        let dataTelefonoTutor = {
            idTutor: idTutor,
            telefono: document.getElementById("telefonoTutor").value
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
            console.log("Se actualizaron los datos de paciente");
        });
        
        await alerta('Datos actualizados', 'los datos del paciente se actualizaron correctamente', 'success');
    
        setTimeout(() =>{
            location.reload();
        }, 1000);
    })
})

