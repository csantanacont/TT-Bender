let urls;
let imagenPrueba;
let idPrueba;
let idPaciente;
let evaluacion;
let figuraActual;
let cropper;
let data;
let dataCropper;
let imgs = ['A','1','2','3','4','5','6','7','8']

window.addEventListener('load', async () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    idPrueba = urlParams.get('id');
    idPaciente = urlParams.get('p')

    if(idPrueba == null || idPrueba == undefined){
        await alerta('Prueba no identificada', 'La prueba a la que se hace referencia no se identifica', 'info');
        setTimeout(() =>{
            window.location = './home.html'
        }, 1500);
    }
    cargarDatosPrueba()


    observarCambiosEvaluacion()

    let flechas = document.querySelectorAll('[class^="flecha"');

    flechas[0].addEventListener('click',() =>{
        alert('atras')
        // window.location = `listarPruebas.html?id=${data.idPaciente}`
    })
    flechas[1].addEventListener('click',() =>{
        guardarCambios()
    })

})

const cargarDatosPrueba = async () =>{
    
    data = await cargarDatosPaciente()

    cargarImagenesPrueba(data.idImagenesPruebas)

    cargarEvaluaciones(data.idEscalaMaduracion)

    observarImagenesTarjetas()
    
}


const cargarDatosPaciente = async () =>{

    await db.collection("pruebas")
    .where(firebase.firestore.FieldPath.documentId(),'==',idPrueba)
    .get()
    .then(querySnapshot =>{
        querySnapshot.docs.forEach(doc =>{
            data = doc.data();
        })
    })

    
    let nombreInput = document.getElementById("inputNombrePaciente"),
    edadInput = document.getElementById("inputEdadPaciente"),
    gradoInput = document.getElementById("inputGradoPaciente"),
    nivelInput = document.getElementById("inputNivelPaciente"),
    fechaInput = document.getElementById("inputFechaPrueba"),
    tiempoInput = document.getElementById("inputTiempoPrueba"),
    puntajeInput = document.getElementById("inputPuntajePrueba"),
    observacionesInput = document.getElementById('inputObservacionesPrueba'),
    nivelMaduracionInput = document.getElementById('inputNivelMaduracionPaciente')
    imagenPreviewPrueba = document.getElementById('reporteImagenPrueba')
    ;

    
    nombreInput.value = data.nombre;
    edadInput.value = data.edad;
    nivelInput.value = data.nivelEscolar;
    gradoInput.value = data.gradoEscolar;
    fechaInput.value = data.fechaPrueba;
    tiempoInput.value = data.tiempo;
    puntajeInput.value = data.puntaje;
    nivelMaduracionInput.value = data.nivelMaduracion ? data.nivelMaduracion : "N/A"
    observacionesInput.value = data.observaciones

    return data
}

const cargarImagenesPrueba = async (idImagenes) =>{    
    await db.collection("imagenesPruebas")
    .where(firebase.firestore.FieldPath.documentId(),'==',idImagenes)
    .get()
    .then(querySnapshot =>{
        querySnapshot.docs.forEach(doc =>{
            urls = doc.data();
        })
    })

    console.log(urls["imgPrueba"])

    let i = new Image()
    i.src = urls["imgPrueba"] 
    imagenPrueba = urls["imgPrueba"] 
    let imagenPruebaHover = document.getElementById("reporteImagenPrueba")
    imagenPruebaHover.style.width = (i.width/2.5).toString()+"px"
    imagenPruebaHover.style.height = (i.height/2.5).toString()+"px;"

    imagenPruebaHover.src = imagenPrueba
}

const cargarEvaluaciones = async (idEvaluacion) =>{
    await db.collection("evaluaciones")
    .where(firebase.firestore.FieldPath.documentId(),'==',idEvaluacion)
    .get()
    .then(querySnapshot =>{
        querySnapshot.docs.forEach(doc =>{
            evaluacion = doc.data();
        })
    })

    imgs.map( i =>{
        evaluar(i)
    })

    let puntajeInput = document.getElementById("inputPuntajePrueba")
    let suma =0
    for(let figura in evaluacion){
        evaluacion[figura].map(e =>{
            suma += parseInt(e);
        })
    }

    puntajeInput.value = suma

}

const observarImagenesTarjetas = () =>{
    let imgsButtons = document.querySelectorAll('[class*="card"]')

    for(let i=0; i<imgsButtons.length; i++){
        imgsButtons[i].addEventListener('click', (e) =>{
            mostrarTarjeta(e.target.classList[2].substr(4))
        })
    }
}

const mostrarTarjeta = (tarjeta) =>{
    let tituloModal = document.getElementById("tituloVerTarjeta")
    let cuerpoModal = document.getElementById("verTarjeta-modal")
    
    tituloModal.innerHTML = `Tarjeta ${tarjeta}`

    cuerpoModal.innerHTML = `
    
    <div class="verTarjeta">
        <div class="imagenVerTarjeta"><img class="imgAjuste" src="./assets/img/tarjetas/${tarjeta}.JPG"></div>
        <div class="imagenVerTarjeta"><img class="imgAjuste" src=${urls["img"+tarjeta]}></div>
    </div>
    
    `

    
    $('#verTarjeta').modal()
}


const evaluar = async (tarjeta) =>{

    let evaluacion0,evaluacion1, evaluacion2, evaluacion3;
    
    if(tarjeta == 'A'){
        evaluacion0 = document.getElementById(tarjeta+"-0");
        evaluacion1 = document.getElementById(tarjeta+"-1");
        evaluacion2 = document.getElementById(tarjeta+"-2");
        evaluacion3 = document.getElementById(tarjeta+"-3");

        evaluacion0.checked = evaluacion["img"+tarjeta][0]
        evaluacion1.checked = evaluacion["img"+tarjeta][1]
        evaluacion2.checked = evaluacion["img"+tarjeta][2]
        evaluacion3.checked = evaluacion["img"+tarjeta][3]
    }   
    if(tarjeta == '1'){
        evaluacion0 = document.getElementById(tarjeta+"-0");
        evaluacion1 = document.getElementById(tarjeta+"-1");
        evaluacion2 = document.getElementById(tarjeta+"-2");

        evaluacion0.checked = evaluacion["img"+tarjeta][0]
        evaluacion1.checked = evaluacion["img"+tarjeta][1]
        evaluacion2.checked = evaluacion["img"+tarjeta][2]
    }  
    if(tarjeta == '2'){
        evaluacion0 = document.getElementById(tarjeta+"-0");
        evaluacion1 = document.getElementById(tarjeta+"-1");
        evaluacion2 = document.getElementById(tarjeta+"-2");

        evaluacion0.checked = evaluacion["img"+tarjeta][0]
        evaluacion1.checked = evaluacion["img"+tarjeta][1]
        evaluacion2.checked = evaluacion["img"+tarjeta][2]
    }  
    if(tarjeta == '3'){
        evaluacion0 = document.getElementById(tarjeta+"-0");
        evaluacion1 = document.getElementById(tarjeta+"-1");
        evaluacion2 = document.getElementById(tarjeta+"-2");
        evaluacion3 = document.getElementById(tarjeta+"-3");

        evaluacion0.checked = evaluacion["img"+tarjeta][0]
        evaluacion1.checked = evaluacion["img"+tarjeta][1]
        evaluacion2.checked = evaluacion["img"+tarjeta][2]
        evaluacion3.checked = evaluacion["img"+tarjeta][3]
    }  
    if(tarjeta == '4'){
        evaluacion0 = document.getElementById(tarjeta+"-0");
        evaluacion1 = document.getElementById(tarjeta+"-1");

        evaluacion0.checked = evaluacion["img"+tarjeta][0]
        evaluacion1.checked = evaluacion["img"+tarjeta][1]
    }  
    if(tarjeta == '5'){
        evaluacion0 = document.getElementById(tarjeta+"-0");
        evaluacion1 = document.getElementById(tarjeta+"-1");
        evaluacion2 = document.getElementById(tarjeta+"-2");
        evaluacion3 = document.getElementById(tarjeta+"-3");

        evaluacion0.checked = evaluacion["img"+tarjeta][0]
        evaluacion1.checked = evaluacion["img"+tarjeta][1]
        evaluacion2.checked = evaluacion["img"+tarjeta][2]
        evaluacion3.checked = evaluacion["img"+tarjeta][3]
    }  
    if(tarjeta == '6'){
        evaluacion0 = document.getElementById(tarjeta+"-0");
        evaluacion1 = document.getElementById(tarjeta+"-1");
        evaluacion2 = document.getElementById(tarjeta+"-2");
        evaluacion3 = document.getElementById(tarjeta+"-3");

        evaluacion0.checked = evaluacion["img"+tarjeta][0]
        evaluacion1.checked = evaluacion["img"+tarjeta][1]
        evaluacion2.checked = evaluacion["img"+tarjeta][2]
        evaluacion3.checked = evaluacion["img"+tarjeta][3]
    }  
    if(tarjeta == '7'){
        evaluacion0 = document.getElementById(tarjeta+"-0");
        evaluacion1 = document.getElementById(tarjeta+"-1");
        evaluacion2 = document.getElementById(tarjeta+"-2");
        evaluacion3 = document.getElementById(tarjeta+"-3");

        evaluacion0.checked = evaluacion["img"+tarjeta][0]
        evaluacion1.checked = evaluacion["img"+tarjeta][1]
        evaluacion2.checked = evaluacion["img"+tarjeta][2]
        evaluacion3.checked = evaluacion["img"+tarjeta][3]
    }  
    if(tarjeta == '8'){
        evaluacion0 = document.getElementById(tarjeta+"-0");
        evaluacion1 = document.getElementById(tarjeta+"-1");

        evaluacion0.checked = evaluacion["img"+tarjeta][0]
        evaluacion1.checked = evaluacion["img"+tarjeta][1]

    }  
}


const observarCambiosEvaluacion = () =>{
    let checkboxes = document.querySelectorAll('input[type="checkbox"]'),
    puntajeInput = document.getElementById("inputPuntajePrueba"),
    nivelMaduracion = document.getElementById("inputNivelMaduracionPaciente")
    let suma = parseInt(puntajeInput.value)
    let equivalentes = ["11-0/11-11+","10-0/10-11","9-0/9-11","8-6/8-11","8-0/8-5","7-6/7-11","7-0/7-11","7-0/7-5","6-6/6-11",
    "6-0/6-5","5-9/5-11","5-6/5-8","5-4/5-5","5-2/5-3","5-0/5-1","4-10/4-11","4-8/4-9","4-6/4-7","4-4/4-5","4-2/4-3","4-1","4-0","4-0"]

    for(let i=0; i<checkboxes.length; i++){
        checkboxes[i].addEventListener('change', (e) =>{
            suma = parseInt(puntajeInput.value)
            let nombre = e.target.id.split("-")
            e.target.checked ? (evaluacion["img"+nombre[0]][Number(nombre[1])] = 1, suma = suma+1) : (evaluacion["img"+nombre[0]][Number(nombre[1])] = 0, suma = suma - 1)
            puntajeInput.value = suma;
            nivelMaduracion.value = equivalentes[suma]
        })
    }
}

const guardarCambios = async () =>{

    let gradoInput = document.getElementById("inputGradoPaciente"),
    nivelInput = document.getElementById("inputNivelPaciente"),
    tiempoInput = document.getElementById("inputTiempoPrueba"),
    observacionesInput = document.getElementById('inputObservacionesPrueba'),
    puntajeInput = document.getElementById("inputPuntajePrueba"),
    nivelMaduracionInput = document.getElementById('inputNivelMaduracionPaciente')
    ;

    dataUpdate = {...data}

    dataUpdate["gradoEscolar"] = gradoInput.value;
    dataUpdate["nivelEscolar"] = nivelInput.value;
    dataUpdate["tiempo"] = tiempoInput.value;
    dataUpdate["observaciones"] = observacionesInput.value;
    dataUpdate["puntaje"] = puntajeInput.value;
    dataUpdate["nivelMaduracion"] = nivelMaduracionInput.value;

    await db.collection("pruebas").doc(idPrueba).update(dataUpdate)
    .then(() =>{
        console.log("Se actualizaron los datos de la prueba");
    });

    await db.collection("evaluaciones").doc(dataUpdate["idEscalaMaduracion"]).update(evaluacion)
    .then(() =>{
        console.log("Se actualizo la evaluacion ");
    });
    
    await alerta('Prueba actualizada', 'Los datos de la prueba se han actualizado correctamente', 'success')
    setTimeout(function(){
        window.location = `./listarPruebas.html?id=${idPaciente}`
    }, 2000);
    
}