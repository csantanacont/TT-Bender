window.addEventListener('load', async () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let idPaciente = urlParams.get('id');
    let paciente;
    localStorage.removeItem("imgB64");
    await db.collection("pacientes")
    .where(firebase.firestore.FieldPath.documentId(),'==',idPaciente)
    .get()
    .then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
            paciente = doc.data();
        })
    })
    
    muestraPruebas(idPaciente)
    document.getElementById('titulo').innerHTML = `Consultar pruebas de ${paciente.nombre} ${paciente.apellidoPaterno}`;
})

const agregarPruebas = () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let idPaciente = urlParams.get('id');
    let paciente;

    window.location = `agregarPrueba.html?id=${idPaciente}`
}

const muestraPruebas = async (id) =>{ 
    let tabla = document.getElementById("datosTabla");
    await db.collection("pruebas")
    .where("idPaciente",'==',id)
    .get()
    .then(querySnapshot =>{
        querySnapshot.forEach(doc=>{
            let data = {...doc.data()}
            tabla.innerHTML += `
            <tr>
                        <td>${doc.id}</td>
                        <td>${doc.data().fechaPrueba}</td>
                        <td>
                            <div class="acciones">
                                <a href=verPrueba.html?id=${doc.id}><img src="./assets/img/icons8-eye-50.png" alt="ver" class="icon"></a>
                                <a href="verImgsPrueba.html?id=${data.idImagenesPruebas}&p=${id}"><img src="./assets/img/icons8-images-64.png" alt="imagenes" class="icon"></a>
                                <a href="#" onclick=eliminarRegistro("${doc.id}")><img src="./assets/img/icons8-trash-can-60.png" alt="borrar" class="icon"></a>
                                <a onclick=generarPDF("${doc.id}")><img src="./assets/img/icons8-pdf-48.png" alt="lista" class="icon"></a>
                            </div>
                        </td>
                    </tr>
            `
        })
    })
}

let borrarRegistro = async (id) =>{
    let idImagenesPruebas, idEvaluacion;
    await db.collection("pruebas").doc(id).get().then((querySnapshot) =>{
        idImagenesPruebas = querySnapshot.data().idImagenesPruebas;
        idEvaluacion = querySnapshot.data().idEscalaMaduracion;
    })

    await db.collection("imagenesPruebas").doc(idImagenesPruebas).delete()
    .then(async () =>{
        console.log("IMAGENES ELIMINADAS")
    })

    await db.collection("evaluaciones").doc(idEvaluacion).delete()
    .then(async () =>{
        console.log("EVALUACION ELIMINADA")
    })

    await db.collection("pruebas").doc(id).delete()
    .then(() =>{
        Swal.fire(
            'Eliminado',
            'El registro ha sido eliminado',
            'success'
        ).then(()=>{
            location.reload();
        })
    }
    )
}

const  generarPDF = async (id) =>{
    window.open("./generarPDF.html?id="+id);
}