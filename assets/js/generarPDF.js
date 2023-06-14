let data;
let idPrueba;
let imgs = ['A','1','2','3','4','5','6','7','8']
window.addEventListener('load',async () =>{
    generandoPrueba()
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    idPrueba = urlParams.get('id');
    await cargarDatosPrueba()

    generarPDF(idPrueba)
})

const cargarDatosPrueba = async () =>{
    
    data = await cargarDatosPaciente()

    // await cargarImagenesPrueba(data.idImagenesPruebas)

    await cargarEvaluaciones(data.idEscalaMaduracion)  
    
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

    imagenPrueba = urls["imgPrueba"] 
    let imagenPruebaHover = document.getElementById("imagenPruebaPDF")
    imagenPruebaHover.src = urls["imgPrueba"]

    if(imagenPruebaHover.width > imagenPruebaHover.height){
        imagenPruebaHover.style.transform = 'rotate(90deg)';
        imagenPruebaHover.style.width = '792px';
        imagenPruebaHover.style.height = '612px';
    }else{
        imagenPruebaHover.style.height = '792px';
        imagenPruebaHover.style.width = '612px';
    }
   
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/?[A-z]*;base64,/);
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
const generarPDF = async (idPrueba) =>{
    
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

      nombreInput.value = data.nombre;
    edadInput.value = data.edad;
    gradoInput.value = data.gradoEscolar;
    fechaInput.value = data.fechaPrueba;
    tiempoInput.value = data.tiempo;
    puntajeInput.value = data.puntaje;
    nivelInput.value = data.nivelEscolar;
    nivelMaduracionInput.value = data.nivelMaduracion;
    observacionesInput.innerHTML = data.observaciones;
    let element = document.getElementById('pdf');
    

    var opt = {
        margin:       [2.5,2.5,2.5,2.5],
        filename:     'ReporteBender_'+idPrueba+'.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 3, useCORS: true, dpi: 192, letterRendering: true},
        jsPDF:        { unit: 'cm', format: 'letter', orientation: 'p' },
      };
    
      await html2pdf().set(opt).from(pdf).save();

      window.close()
}
