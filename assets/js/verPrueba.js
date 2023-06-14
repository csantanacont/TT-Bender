let urls;
let imagenPrueba;
let idPrueba;
let idPaciente;
let evaluacion 
let figuraActual = "";
let cropper
let data
let dataCropper
let imgs = ['A','1','2','3','4','5','6','7','8']

window.addEventListener('load', async () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    idPrueba = urlParams.get('id');
    
    cargarDatosPrueba()
  

    if(idPrueba == null || idPrueba == undefined){
        await alerta('Prueba no identificada', 'La prueba a la que se hace referencia no se identifica', 'info');
        setTimeout(() =>{
            window.location = './home.html'
        }, 1500);
    }

    let flechas = document.querySelectorAll('[class^="flecha"');

    flechas[0].addEventListener('click',() =>{
        window.location = `listarPruebas.html?id=${data.idPaciente}`
    })
    flechas[1].addEventListener('click',() =>{
        window.open("./generarPDF.html?id="+idPrueba);
    })

})

const cargarDatosPrueba = async () =>{
    
    data = await cargarDatosPaciente()

    cargarImagenesPrueba(data.idImagenesPruebas)

    cargarEvaluaciones(data.idEscalaMaduracion)


    observarImagenesTarjetas()



    

    await db.collection("configuracionRecortes")
    .where(firebase.firestore.FieldPath.documentId(),'==',data.configuracionPrueba)
    .get()
    .then(querySnapshot =>{
        querySnapshot.docs.forEach(doc =>{
            dataCropper = doc.data();
        })
    })
    
}


const cargarDatosPaciente = async () =>{
    let data;

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
