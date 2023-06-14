let urls;
let idPaciente;
let evaluacion = JSON.parse(localStorage.evaluacion)
let dataCropper = JSON.parse(localStorage.dataCropper)
let idPrueba;
let imgs = ['A','1','2','3','4','5','6','7','8']

window.addEventListener('load', async () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    
    let imagenPrueba = localStorage.imgB64;
    idPaciente = urlParams.get('id');
    urls =JSON.parse(localStorage.urls); 
    
    if(evaluacion == null || evaluacion == undefined || imagenPrueba == null ||  imagenPrueba == undefined ){
        await alerta('Error en la imagen a evaluar', 'No se ha cargado la imagen de la prueba, intenta de nuevo', 'info');
        setTimeout(() =>{
            window.location = `./agregarPrueba.html?id=${idPaciente}`
        }, 1500);
    }

    cargarImagenPrueba(imagenPrueba)
    cargarFlechas(idPaciente);
    setDatosPaciente(idPaciente);

    imgs.map(i =>{
        setValoresAspectos(i);
    })
    
  

    if(idPaciente == null || idPaciente == undefined){
        await alerta('Paciente no identificado', 'El paciente al que se hace referencia no se identifica', 'info');
        setTimeout(() =>{
            window.location = './home.html'
        }, 1500);
    }

    observarImagenesTarjetas()
    observarCambiosEvaluacion()

    let flechas = document.querySelectorAll('[class^="flecha"]');

    if(flechas.length == 1){
        flechas[0].addEventListener('click',() =>{
            localStorage.setItem('evaluacion',JSON.stringify(evaluacion))
            localStorage.setItem('urls',JSON.stringify(urls))
            localStorage.setItem('dataCropper',JSON.stringify(dataCropper))
        })
    }else{
        
        flechas[0].addEventListener('click',() =>{
            localStorage.setItem('evaluacion',JSON.stringify(evaluacion))
            localStorage.setItem('urls',JSON.stringify(urls))
            localStorage.setItem('dataCropper',JSON.stringify(dataCropper))
        })
        flechas[1].addEventListener('click',() =>{
            localStorage.setItem('evaluacion',JSON.stringify(evaluacion))
            localStorage.setItem('urls',JSON.stringify(urls))
            localStorage.setItem('dataCropper',JSON.stringify(dataCropper))
        })
    }

    
})


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

const cargarImagenPrueba = (imagenPrueba) =>{
    let i = new Image()
    i.src = imagenPrueba

    let imagenPruebaHover = document.getElementById("reporteImagenPrueba")
    imagenPruebaHover.style.width = (i.width/2.5).toString()+"px"
    imagenPruebaHover.style.height = (i.height/2.5).toString()+"px;"

    imagenPruebaHover.src = imagenPrueba
}
const setDatosPaciente = async (id) =>{
    let paciente;
    let equivalentes = ["11-0/11-11+","10-0/10-11","9-0/9-11","8-6/8-11","8-0/8-5","7-6/7-11","7-0/7-11","7-0/7-5","6-6/6-11",
    "6-0/6-5","5-9/5-11","5-6/5-8","5-4/5-5","5-2/5-3","5-0/5-1","4-10/4-11","4-8/4-9","4-6/4-7","4-4/4-5","4-2/4-3","4-1","4-0","4-0"]
    await db.collection("pacientes")
    .where(firebase.firestore.FieldPath.documentId(),'==',idPaciente)
    .get()
    .then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
            paciente = doc.data();
        })

        let nombreInput = document.getElementById("inputNombrePaciente"),
        edadInput = document.getElementById("inputEdadPaciente"),
        fechaInput = document.getElementById("inputFechaPrueba"),
        puntajeInput = document.getElementById("inputPuntajePrueba"),
        nivelMaduracion = document.getElementById("inputNivelMaduracionPaciente")      
        ;


        const fechaActual = new Date(), fechaNacimiento = new Date(paciente.fechaNacimiento);
        const diferenciaMs = fechaActual - fechaNacimiento;

        // Convierte la diferencia de milisegundos a años
        const edad = Math.floor(diferenciaMs / 1000 / 60 / 60 / 24 / 365);
        const edadDiferencia = edad - (diferenciaMs / 1000 / 60 / 60 / 24 / 365);
        const meses = Math.floor(edadDiferencia * 12)

        // Formatear la fecha actual
        const anio = fechaActual.getFullYear();
        const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
        const dia = ('0' + fechaActual.getDate()).slice(-2);
        const opciones = { hour12:false};
        const fechaEnFormato = fechaActual.toLocaleString('es-MX',opciones);
      
        nombreInput.value = paciente.nombre +" "+ paciente.apellidoPaterno +" "+ paciente.apellidoMaterno;
        edadInput.value = String(edad)+String(meses);
        fechaInput.value = fechaEnFormato;
        let suma = 0;
        for(let figura in evaluacion){
            evaluacion[figura].map(e =>{
                suma += parseInt(e);
            })
        }
        puntajeInput.value = suma;
        
        suma < 21 ? nivelMaduracion.value = equivalentes[suma] : nivelMaduracion.value = equivalentes[20]


    })
}


const cargarFlechas = (id) => {
    let footer = document.getElementById('iconosFooterFinal');
    footer.innerHTML = '';
    footer.innerHTML = `
            <div class="flechaAtras">
            <a href="evaluarPrueba.html?img=8&id=${id}"><img src="./assets/img/icons8-go-back-50.png"></a>
            <span>Regresar</span>
            </div>
            <div class="guardar flechaSiguiente">
            <a href="#"><img src="./assets/img/icons8-save-50.png"></a>
            <span>Guardar</span>
            </div>
        `
    cargarEventos();

}

const setValoresAspectos = (tarjeta) =>{
    let evaluacion0,evaluacion1, evaluacion2, evaluacion3;
    
    if(tarjeta == 'A'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3");

        evaluacion0.checked = evaluacion.imgA[0];
        evaluacion1.checked = evaluacion.imgA[1];
        evaluacion2.checked = evaluacion.imgA[2];
        evaluacion3.checked = evaluacion.imgA[3];
    }   
    if(tarjeta == '1'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        
        evaluacion0.checked = evaluacion.img1[0];
        evaluacion1.checked = evaluacion.img1[1];
        evaluacion2.checked = evaluacion.img1[2];
        
    }  
    if(tarjeta == '2'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");

        evaluacion0.checked = evaluacion.img2[0];
        evaluacion1.checked = evaluacion.img2[1];
        evaluacion2.checked = evaluacion.img2[2];
    }  
    if(tarjeta == '3'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3");

        evaluacion0.checked = evaluacion.img3[0];
        evaluacion1.checked = evaluacion.img3[1];
        evaluacion2.checked = evaluacion.img3[2];
        evaluacion3.checked = evaluacion.img3[3];
    }  
    if(tarjeta == '4'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");

        evaluacion0.checked = evaluacion.img4[0];
        evaluacion1.checked = evaluacion.img4[1];
   
    }  
    if(tarjeta == '5'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3");

        evaluacion0.checked = evaluacion.img5[0];
        evaluacion1.checked = evaluacion.img5[1];
        evaluacion2.checked = evaluacion.img5[2];
        evaluacion3.checked = evaluacion.img5[3];
    }  
    if(tarjeta == '6'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3");

        evaluacion0.checked = evaluacion.img6[0];
        evaluacion1.checked = evaluacion.img6[1];
        evaluacion2.checked = evaluacion.img6[2];
        evaluacion3.checked = evaluacion.img6[3];
    }  
    if(tarjeta == '7'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3");

        evaluacion0.checked = evaluacion.img7[0];
        evaluacion1.checked = evaluacion.img7[1];
        evaluacion2.checked = evaluacion.img7[2];
        evaluacion3.checked = evaluacion.img7[3];
    }  
    if(tarjeta == '8'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");

        evaluacion0.checked = evaluacion.img8[0];
        evaluacion1.checked = evaluacion.img8[1];
    }  
}


const cargarEventos = () =>{
    let atras = document.querySelectorAll(".flechaAtras")[0];
    let imprimir = document.querySelectorAll(".imprimir")[0];
    let guardar = document.querySelectorAll(".guardar")[0];
    let archivos;
    guardar.addEventListener('click', () =>{
        if(compruebaCampos()){
            archivos = convertirImagenes();
            subirImagenes(archivos)
        }

    })
}

const compruebaCampos = () =>{
    let tiempoPrueba = document.getElementById("inputTiempoPrueba").value;
    let gradoPaciente = document.getElementById("inputGradoPaciente").value;
    let nivelPaciente = document.getElementById("inputNivelPaciente").value;
    camposCorrectos = false;

    (tiempoPrueba < 1 || tiempoPrueba > 100 || tiempoPrueba == '') ? alerta('Tiempo de prueba invalido', 'Verifica el valor para el tiempo de la prueba', 'info') :
    (gradoPaciente < 1 || gradoPaciente > 6 || gradoPaciente == '') ? alerta('Grado escolar invalido', 'Verifica el valor para el grado escolar del paciente', 'info') :
    (gradoPaciente > 3 && nivelPaciente == 'Preescolar') ? alerta('Nivel escolar invalido', `Para el nivel ${nivelPaciente} el máximo es 3er grado, verifica la información proporcionada`, 'info'): 
    (nivelPaciente == '') ? alerta('Nivel escolar invalido', `Verifica el valor para el nivel escolar`, 'info') :
    camposCorrectos = true;
    

    return camposCorrectos;
}

const convertirImagenes = () =>{
    archivos = [{},{},{},{},{},{},{},{},{}];
    let array = [];
    let evaluacionString;
    imgs.map( async (i) =>{
         fetch(urls["img"+i])
        .then(res => res.blob())
        .then(blob =>{
            array = evaluacion["img"+i]
            
            evaluacionString = array.join("");
            
            const file = new File([blob], String(evaluacionString)+"_"+i+"_"+idPaciente,{type: "image/png"})
            if(i == "A"){
                archivos[0] = file
            }
            else{
                archivos[Number(i)] = file
            }
    
        })
    })

    fetch(localStorage.imgB64)
        .then(res => res.blob())
        .then(blob =>{
            const file = new File([blob], "PruebaBender_"+idPaciente,{type: "image/png"})
            archivos[9] = file
        })
    
    return archivos
    
}


const subirImagenes = async (imagenesInputs, tipo="guardar") =>{
    cargandoArchivos();
    dataImagenes = {
        imgA:"",
        img1:"",
        img2:"",
        img3:"",
        img4:"",
        img5:"",
        img6:"",
        img7:"",
        img8:"",
        imgPrueba: ""
    }
    db.collection("imagenesPruebas").add(dataImagenes).then(async (docRef) =>{
        idPrueba = docRef.id;
        let uploadTask;
        let subidasCompletadas = [];

        
        for(i of imagenesInputs){
            uploadTask = await defaultStorage.ref().child(idPrueba+'/'+i.name).put(i);
            subidasCompletadas.push(uploadTask);
        }


        urlsFS = await obtenerURLsImgs(subidasCompletadas);
        
   
        dataImagenes = {
            imgA:urlsFS[0],
            img1:urlsFS[1],
            img2:urlsFS[2],
            img3:urlsFS[3],
            img4:urlsFS[4],
            img5:urlsFS[5],
            img6:urlsFS[6],
            img7:urlsFS[7],
            img8:urlsFS[8],
            imgPrueba:urlsFS[9],
        }
        db.collection("imagenesPruebas").doc(idPrueba).update(dataImagenes).then(async (docRef) =>{
            await alerta('Archivos cargados correctamente', 'Las imágenes de la prueba fueron cargados exitosamente', 'success')
            generarPrueba(idPrueba, tipo);
        }); 
    })          
}

const obtenerURLsImgs = async (uploadsTasks) =>{
    
    let urlsFB = [];
    for(let t of uploadsTasks){
        let url = await t.ref.getDownloadURL();
        urlsFB.push(url)
    }

    return urlsFB;
}


const generarPrueba = async (idPrueba, tipo = "guardar") => {
    console.log(tipo)

    let nombreInput = document.getElementById("inputNombrePaciente"),
        edadInput = document.getElementById("inputEdadPaciente"),
        gradoInput = document.getElementById("inputGradoPaciente"),
        nivelInput = document.getElementById("inputNivelPaciente"),
        fechaInput = document.getElementById("inputFechaPrueba"),
        tiempoInput = document.getElementById("inputTiempoPrueba"),
        puntajeInput = document.getElementById("inputPuntajePrueba"),
        observacionesInput = document.getElementById('inputObservacionesPrueba');
        nivelMaduracionInput = document.getElementById('inputNivelMaduracionPaciente');
        let idEvaluacion, idDataCropper;

        await db.collection("evaluaciones").add(evaluacion).then(async (docRef) =>{
            idEvaluacion = docRef.id;
        })

        await db.collection("configuracionRecortes").add(dataCropper).then(async (docRef) =>{
            idDataCropper = docRef.id;
        })

        let dataPrueba = {
            idEscalaMaduracion: idEvaluacion,
            idEvaluador: sessionStorage.idEspecialista,
            fechaPrueba: fechaInput.value,
            gradoEscolar: gradoInput.value,
            nivelEscolar: nivelInput.value,
            idImagenesPruebas: idPrueba,
            idPaciente: idPaciente,
            observaciones: observacionesInput.value,
            puntaje: puntajeInput.value,
            tiempo: tiempoInput.value,
            edad:edadInput.value,
            nombre: nombreInput.value,
            nivelMaduracion: nivelMaduracionInput.value,
            configuracionPrueba: idDataCropper
        }
        if(tipo == "pdf"){
            await generarPDF(dataPrueba)
        }
        db.collection("pruebas").add(dataPrueba).then(async (docRef) =>{
            await alerta('Prueba guardada correctamente', 'La prueba fue guardada exitosamente', 'success')
            setTimeout(() =>{
                window.location = 'listarPruebas.html?id='+idPaciente;
            }, 1500);
        })

       
}


const cargarEvaluaciones = (tarjeta) =>{
    let evaluacion0,evaluacion1, evaluacion2, evaluacion3;
    
    if(tarjeta == 'A'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3");

        evaluacion0.checked ? evaluacion.imgA[0] = 1 : evaluacion.imgA[0] = 0;
        evaluacion1.checked ? evaluacion.imgA[1] = 1 : evaluacion.imgA[1] = 0;
        evaluacion2.checked ? evaluacion.imgA[2] = 1 : evaluacion.imgA[2] = 0;
        evaluacion3.checked ? evaluacion.imgA[3] = 1 : evaluacion.imgA[3] = 0;
    }   
    if(tarjeta == '1'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        
        evaluacion0.checked ? evaluacion.img1[0] = 1 : evaluacion.img1[0] = 0;
        evaluacion1.checked ? evaluacion.img1[1] = 1 : evaluacion.img1[1] = 0;
        evaluacion2.checked ? evaluacion.img1[2] = 1 : evaluacion.img1[2] = 0;
        
    }  
    if(tarjeta == '2'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");

        evaluacion0.checked ? evaluacion.img2[0] = 1 : evaluacion.img2[0] = 0;
        evaluacion1.checked ? evaluacion.img2[1] = 1 : evaluacion.img2[1] = 0;
        evaluacion2.checked ? evaluacion.img2[2] = 1 : evaluacion.img2[2] = 0;
    } 
    if(tarjeta == '3'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3");

        evaluacion0.checked ? evaluacion.img3[0] = 1 : evaluacion.img3[0] = 0;
        evaluacion1.checked ? evaluacion.img3[1] = 1 : evaluacion.img3[1] = 0;
        evaluacion2.checked ? evaluacion.img3[2] = 1 : evaluacion.img3[2] = 0;
        evaluacion3.checked ? evaluacion.img3[3] = 1 : evaluacion.img3[3] = 0;
    }  
    if(tarjeta == '4'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");

        evaluacion0.checked ? evaluacion.img4[0] = 1 : evaluacion.img4[0];
        evaluacion1.checked ? evaluacion.img4[1] = 1 : evaluacion.img4[1];
   
    }  
    if(tarjeta == '5'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3");

        evaluacion0.checked ? evaluacion.img5[0] = 1 : evaluacion.img5[0] = 0; 
        evaluacion1.checked ? evaluacion.img5[1] = 1 : evaluacion.img5[1] = 0; 
        evaluacion2.checked ? evaluacion.img5[2] = 1 : evaluacion.img5[2] = 0; 
        evaluacion3.checked ? evaluacion.img5[3] = 1 : evaluacion.img5[3] = 0; 
    }  
    if(tarjeta == '6'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3");

        evaluacion0.checked ? evaluacion.img6[0] = 1 : evaluacion.img6[0] = 0;
        evaluacion1.checked ? evaluacion.img6[1] = 1 : evaluacion.img6[1] = 0;
        evaluacion2.checked ? evaluacion.img6[2] = 1 : evaluacion.img6[2] = 0;
        evaluacion3.checked ? evaluacion.img6[3] = 1 : evaluacion.img6[3] = 0;
    }  
    if(tarjeta == '7'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3");

        evaluacion0.checked ? evaluacion.img7[0] = 1 : evaluacion.img7[0] = 0;
        evaluacion1.checked ? evaluacion.img7[1] = 1 : evaluacion.img7[1] = 0;
        evaluacion2.checked ? evaluacion.img7[2] = 1 : evaluacion.img7[2] = 0;
        evaluacion3.checked ? evaluacion.img7[3] = 1 : evaluacion.img7[3] = 0;
    }  
    if(tarjeta == '8'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1");

        evaluacion0.checked ? evaluacion.img8[0] = 1 : evaluacion.img8[0] = 0; 
        evaluacion1.checked ? evaluacion.img8[1] = 1 : evaluacion.img8[1] = 0; 
    }  
}