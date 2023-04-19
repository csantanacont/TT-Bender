let urls;
let idPaciente;
let evaluacion = JSON.parse(localStorage.evaluacion)
let idPrueba;


window.addEventListener('load', async () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let imgs = ['A','0','1','2','3','4','5','6','7','8']
    let imagenPrueba = urlParams.get('img');
    idPaciente = urlParams.get('id');
    urls =JSON.parse(localStorage.imgB64); 

    cargarFlechas(idPaciente);
    setDatosPaciente(idPaciente);

    imgs.map(i =>{
        setValoresAspectos(i);
        setValoresAspectosPDF(i);
    })
    
  

    if(idPaciente == null || idPaciente == undefined){
        await alerta('Paciente no identificado', 'El paciente al que se hace referencia no se identifica', 'info');
        setTimeout(() =>{
            window.location = './home.html'
        }, 1500);
    }

    let flechas = document.querySelectorAll('[class^="flecha"');

    if(flechas.length == 1){
        flechas[0].addEventListener('click',() =>{
            localStorage.setItem('evaluacion',JSON.stringify(evaluacion))
        })
    }else{
        flechas[0].addEventListener('click',() =>{
            localStorage.setItem('evaluacion',JSON.stringify(evaluacion))
        })
        flechas[1].addEventListener('click',() =>{
            localStorage.setItem('evaluacion',JSON.stringify(evaluacion))
        })
    }
})


const setDatosPaciente = async (id) =>{
    let paciente;
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
        puntajeInput = document.getElementById("inputPuntajePrueba");


        const fechaActual = new Date(), fechaNacimiento = new Date(paciente.fechaNacimiento);
        const diferenciaMs = fechaActual - fechaNacimiento;

        // Convierte la diferencia de milisegundos a años
        const edad = Math.floor(diferenciaMs / 1000 / 60 / 60 / 24 / 365);

        // Formatear la fecha actual
        const anio = fechaActual.getFullYear();
        const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
        const dia = ('0' + fechaActual.getDate()).slice(-2);
        const fechaEnFormato = `${anio}-${mes}-${dia}`;
      
        nombreInput.value = paciente.nombre +" "+ paciente.apellidoPaterno +" "+ paciente.apellidoMaterno;
        edadInput.value = edad;
        fechaInput.value = fechaEnFormato;
        let suma = 0;
        for(let figura in evaluacion){
            evaluacion[figura].map(e =>{
                suma += parseInt(e);
            })
        }
        puntajeInput.value = suma;
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
            <div class="imprimir flechaSiguiente">
            <a href="#"><img src="./assets/img/icons8-pdf-48.png"></a>
            <span>Imprimir</span>
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
    camposCorrectos = false;

    (tiempoPrueba < 1 || tiempoPrueba > 100 || tiempoPrueba == '') ? alerta('Tiempo de prueba invalido', 'Verifica el valor para el tiempo de la prueba', 'info') :
    (gradoPaciente < 1 || gradoPaciente > 6 || gradoPaciente == '') ? alerta('Grado escolar invalido', 'Verifica el valor para el grado escolar del paciente', 'info') : camposCorrectos = true;

    return camposCorrectos;
}

const convertirImagenes = () =>{
    archivos = [];

    urls.map((url,i) =>{
        fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], "img_"+i+"_"+idPaciente,{ type: "image/png" });
            archivos.push(file);
        })
    })

    return archivos;
    
}


const subirImagenes = async (imagenesInputs, tipo="guardar") =>{
    cargandoArchivos();
    dataImagenes = {
        img1:"",
        img2:"",
        img3:"",
        img4:"",
        img5:"",
        img6:"",
        img7:"",
        img8:"",
        imgA:""
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
            img1:urlsFS[0],
            img2:urlsFS[1],
            img3:urlsFS[2],
            img4:urlsFS[3],
            img5:urlsFS[4],
            img6:urlsFS[5],
            img7:urlsFS[6],
            img8:urlsFS[7],
            imgA:urlsFS[8]
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
        fechaInput = document.getElementById("inputFechaPrueba"),
        tiempoInput = document.getElementById("inputTiempoPrueba"),
        puntajeInput = document.getElementById("inputPuntajePrueba"),
        observacionesInput = document.getElementById('inputObservacionesPrueba');
        let idEvaluacion;

        await db.collection("evaluaciones").add(evaluacion).then(async (docRef) =>{
            idEvaluacion = docRef.id;
        })

        let dataPrueba = {
            idEscalaMaduracion: idEvaluacion,
            idEvaluador: sessionStorage.idEspecialista,
            fechaPrueba: fechaInput.value,
            gradoEscolar: gradoInput.value,
            idImagenesPruebas: idPrueba,
            idPaciente: idPaciente,
            observaciones: observacionesInput.value,
            puntaje: puntajeInput.value,
            tiempo: tiempoInput.value,
            edad:edadInput.value,
            nombre: nombreInput.value
        }
        if(tipo == "pdf"){
            await generarPDF(dataPrueba)
        }
        db.collection("pruebas").add(dataPrueba).then(async (docRef) =>{
            await alerta('Prueba guardada correctamente', 'Las prueba fue guardada exitosamente', 'success')
            setTimeout(() =>{
                window.location = 'listarPruebas.html?id='+idPaciente;
            }, 1500);
        })

       
}