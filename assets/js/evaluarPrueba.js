let urls;
let imagenPrueba;
let idPaciente;
let evaluacion 
let figuraActual = "";
let cropper
let dataCropper
const TAM = 70
let modelos = {
    "modeloA":{},
    "modelo7":{},
    "modelo8":{}
}
window.addEventListener('load', async () =>{

    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let tarjeta = urlParams.get('img');
    idPaciente = urlParams.get('id');
    imagenPrueba = localStorage.imgB64;
    
    if(imagenPrueba == null ||  imagenPrueba == undefined ){
        await alerta('Error en la imagen a evaluar', 'No se ha cargado la imagen de la prueba, intenta de nuevo', 'info');
        setTimeout(() =>{
            window.location = `./agregarPrueba.html?id=${idPaciente}`
        }, 1500);
    }

    if(tarjeta == "A" || tarjeta =="7" || tarjeta =="8")
        await cargarModelo(tarjeta);
    evaluacion = JSON.parse(localStorage.evaluacion) 
    urls = JSON.parse(localStorage.urls)
    dataCropper = JSON.parse(localStorage.dataCropper)
    cargarImagenes(tarjeta);
    cargarAspectosAEvaluar(tarjeta);
    setValoresAspectos(tarjeta);
    evaluar(tarjeta);
    cargarFlechas(tarjeta, idPaciente);


    

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


const cargarImagenes =  (tarjeta) =>{
    let imgOriginal = document.getElementById('imgOriginalDiv'), 
    imgPrueba = document.getElementById('img-Prueba'),
    tituloTarjeta = document.getElementById('tituloTarjeta');

    tituloTarjeta.innerHTML = `Tarjeta ${tarjeta}`
    
    if(urls["img"+tarjeta] == ''){
        recortarTarjeta(tarjeta)
    }
    if(tarjeta == 'A'){
        imgOriginal.style.backgroundImage = `url('./assets/img/tarjetas/${tarjeta}.jpg')`
        imgOriginal.style.backgroundPosition = 'center'
        imgOriginal.style.position = 'relative'
        imgOriginal.style.backgroundRepeat = 'no-repeat'


        imgPrueba.src = urls["img"+tarjeta]

    }else{
        imgOriginal.style.backgroundImage = `url('./assets/img/tarjetas/${tarjeta}.jpg')`
        imgOriginal.style.backgroundPosition = 'center'
        imgOriginal.style.backgroundSize = '99%'
        imgOriginal.style.backgroundAttachment = 'local'
        imgOriginal.style.backgroundRepeat = 'no-repeat'


        imgPrueba.src = urls["img"+tarjeta]

    }
    
} 

const cargarAspectosAEvaluar = (tarjeta) =>{
    let calificadores = document.getElementById('box-clasificadores');

    let aspectosAEvaluar = {
        A:['1a','1b','2','3'],
        img1:['4','5','6'],
        img2:['7','8','9'],
        img3:['10','11','12a', '12b'],
        img4:['13','14'],
        img5:['15','16','17a','17b'],
        img6:['18a','18b','19','20'],
        img7:['21a','21b','22','23'],
        img8:['24','25']
    }, descripcionAspectosAEvaluar = {
        A:['Distorsion de la forma','Desproporción','Rotación','Integración'],
        img1:['Distorsion de la forma','Rotación','Perseveración'],
        img2:['Rotación','Integración','Perseveración'],
        img3:['Distorsión de la forma','Rotación','Integración', 'Linea continua'],
        img4:['Rotación','Integración'],
        img5:['Modificación de la forma','Rotación','Desintegración','Linea continua'],
        img6:['Curvas por ángulos','Lineas rectas','Integración','Perseveración'],
        img7:['Desproporción','Distorción de la forma','Rotación','Integración'],
        img8:['Distorsión de la forma','Rotación']
    }
    let aspecto, descripcion;
    if(tarjeta == 'A'){
        aspecto = aspectosAEvaluar.A;
        descripcion = descripcionAspectosAEvaluar.A;
        calificadores.innerHTML = '';
        aspecto.map( (a, idx) =>{
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
            </label>
        </div>`
        })  
    }
    if(tarjeta == '1'){
        aspecto = aspectosAEvaluar.img1;
        descripcion = descripcionAspectosAEvaluar.img1;
        calificadores.innerHTML = '';
        aspecto.map( (a, idx) =>{
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
            </label>
        </div>`
        })  
    }
    if(tarjeta == '2'){
        aspecto = aspectosAEvaluar.img2;
        descripcion = descripcionAspectosAEvaluar.img2;
        calificadores.innerHTML = '';
        aspecto.map( (a, idx) =>{
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
            </label>
        </div>`
        })  
    }
    if(tarjeta == '3'){
        aspecto = aspectosAEvaluar.img3;
        descripcion = descripcionAspectosAEvaluar.img3;
        calificadores.innerHTML = '';
        aspecto.map( (a, idx) =>{
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
            </label>
        </div>`
        })  
    }
    if(tarjeta == '4'){
        aspecto = aspectosAEvaluar.img4;
        descripcion = descripcionAspectosAEvaluar.img4;
        calificadores.innerHTML = '';
        aspecto.map( (a, idx) =>{
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
            </label>
        </div>`
        })  
    }
    if(tarjeta == '5'){
        aspecto = aspectosAEvaluar.img5;
        descripcion = descripcionAspectosAEvaluar.img5;
        calificadores.innerHTML = '';
        aspecto.map( (a, idx) =>{
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
            </label>
        </div>`
        })  
    }
    if(tarjeta == '6'){
        aspecto = aspectosAEvaluar.img6;
        descripcion = descripcionAspectosAEvaluar.img6;
        calificadores.innerHTML = '';
        aspecto.map( (a, idx) =>{
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
            </label>
        </div>`
        })  
    }
    if(tarjeta == '7'){
        aspecto = aspectosAEvaluar.img7;
        descripcion = descripcionAspectosAEvaluar.img7;
        calificadores.innerHTML = '';
        aspecto.map( (a, idx) =>{
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
            </label>
        </div>`
        })  
    }
    if(tarjeta == '8'){
        aspecto = aspectosAEvaluar.img8;
        descripcion = descripcionAspectosAEvaluar.img8;
        calificadores.innerHTML = '';
        aspecto.map( (a, idx) =>{
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
            </label>
        </div>`
        })  
    }
}

const evaluar = (tarjeta) =>{

    let evaluacion0,evaluacion1, evaluacion2, evaluacion3;
    
    if(tarjeta == 'A'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        evaluacion3 = document.getElementById("3");

        evaluacion0.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.imgA[0] = 1 : evaluacion.imgA[0] = 0;
        })
        evaluacion1.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.imgA[1] = 1 : evaluacion.imgA[1] = 0;
        })
        evaluacion2.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.imgA[2] = 1 : evaluacion.imgA[2] = 0;
        })
        evaluacion3.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.imgA[3] = 1 : evaluacion.imgA[3] = 0;
        })
    }   
    if(tarjeta == '1'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");

        evaluacion0.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img1[0] = 1 : evaluacion.img1[0] = 0;
        })
        evaluacion1.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img1[1] = 1 : evaluacion.img1[1] = 0;
        })
        evaluacion2.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img1[2] = 1 : evaluacion.img1[2] = 0;
        })
    }  
    if(tarjeta == '2'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");

        evaluacion0.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img2[0] = 1 : evaluacion.img2[0] = 0;
        })
        evaluacion1.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img2[1] = 1 : evaluacion.img2[1] = 0;
        })
        evaluacion2.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img2[2] = 1 : evaluacion.img2[2] = 0;
        })
    }  
    if(tarjeta == '3'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        evaluacion3 = document.getElementById("3");

        evaluacion0.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img3[0] = 1 : evaluacion.img3[0] = 0;
        })
        evaluacion1.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img3[1] = 1 : evaluacion.img3[1] = 0;
        })
        evaluacion2.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img3[2] = 1 : evaluacion.img3[2] = 0;
        })
        evaluacion3.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img3[3] = 1 : evaluacion.img3[3] = 0;
        })
    }  
    if(tarjeta == '4'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");

        evaluacion0.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img4[0] = 1 : evaluacion.img4[0] = 0;
        })
        evaluacion1.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img4[1] = 1 : evaluacion.img4[1] = 0;
        })
    }  
    if(tarjeta == '5'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        evaluacion3 = document.getElementById("3");

        evaluacion0.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img5[0] = 1 : evaluacion.img5[0] = 0;
        })
        evaluacion1.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img5[1] = 1 : evaluacion.img5[1] = 0;
        })
        evaluacion2.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img5[2] = 1 : evaluacion.img5[2] = 0;
        })
        evaluacion3.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img5[3] = 1 : evaluacion.img5[3] = 0;
        })
    }  
    if(tarjeta == '6'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        evaluacion3 = document.getElementById("3");

        evaluacion0.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img6[0] = 1 : evaluacion.img6[0] = 0;
        })
        evaluacion1.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img6[1] = 1 : evaluacion.img6[1] = 0;
        })
        evaluacion2.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img6[2] = 1 : evaluacion.img6[2] = 0;
        })
        evaluacion3.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img6[3] = 1 : evaluacion.img6[3] = 0;
        })
    }  
    if(tarjeta == '7'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        evaluacion3 = document.getElementById("3");

        evaluacion0.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img7[0] = 1 : evaluacion.img7[0] = 0;
        })
        evaluacion1.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img7[1] = 1 : evaluacion.img7[1] = 0;
        })
        evaluacion2.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img7[2] = 1 : evaluacion.img7[2] = 0;
        })
        evaluacion3.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img7[3] = 1 : evaluacion.img7[3] = 0;
        })
    }  
    if(tarjeta == '8'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");

        evaluacion0.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img8[0] = 1 : evaluacion.img8[0] = 0;
        })
        evaluacion1.addEventListener('change', (e) =>{
            e.target.checked ? evaluacion.img8[1] = 1 : evaluacion.img8[1] = 0;
        })

    }  
}

const setValoresAspectos = (tarjeta) =>{
    let evaluacion0,evaluacion1, evaluacion2, evaluacion3;
    
    if(tarjeta == 'A'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        evaluacion3 = document.getElementById("3");

        evaluacion0.checked = evaluacion.imgA[0];
        evaluacion1.checked = evaluacion.imgA[1];
        evaluacion2.checked = evaluacion.imgA[2];
        evaluacion3.checked = evaluacion.imgA[3];
    }   
    if(tarjeta == '1'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        
        evaluacion0.checked = evaluacion.img1[0];
        evaluacion1.checked = evaluacion.img1[1];
        evaluacion2.checked = evaluacion.img1[2];
        
    }  
    if(tarjeta == '2'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");

        evaluacion0.checked = evaluacion.img2[0];
        evaluacion1.checked = evaluacion.img2[1];
        evaluacion2.checked = evaluacion.img2[2];
    }  
    if(tarjeta == '3'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        evaluacion3 = document.getElementById("3");

        evaluacion0.checked = evaluacion.img3[0];
        evaluacion1.checked = evaluacion.img3[1];
        evaluacion2.checked = evaluacion.img3[2];
        evaluacion3.checked = evaluacion.img3[3];
    }  
    if(tarjeta == '4'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");

        evaluacion0.checked = evaluacion.img4[0];
        evaluacion1.checked = evaluacion.img4[1];
   
    }  
    if(tarjeta == '5'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        evaluacion3 = document.getElementById("3");

        evaluacion0.checked = evaluacion.img5[0];
        evaluacion1.checked = evaluacion.img5[1];
        evaluacion2.checked = evaluacion.img5[2];
        evaluacion3.checked = evaluacion.img5[3];
    }  
    if(tarjeta == '6'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        evaluacion3 = document.getElementById("3");

        evaluacion0.checked = evaluacion.img6[0];
        evaluacion1.checked = evaluacion.img6[1];
        evaluacion2.checked = evaluacion.img6[2];
        evaluacion3.checked = evaluacion.img6[3];
    }  
    if(tarjeta == '7'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");
        evaluacion2 = document.getElementById("2");
        evaluacion3 = document.getElementById("3");

        evaluacion0.checked = evaluacion.img7[0];
        evaluacion1.checked = evaluacion.img7[1];
        evaluacion2.checked = evaluacion.img7[2];
        evaluacion3.checked = evaluacion.img7[3];
    }  
    if(tarjeta == '8'){
        evaluacion0 = document.getElementById("0");
        evaluacion1 = document.getElementById("1");

        evaluacion0.checked = evaluacion.img8[0];
        evaluacion1.checked = evaluacion.img8[1];


    }  
}


const cargarFlechas = (tarjeta, idPaciente) =>{
    let footer = document.getElementById('iconosFooter');
    footer.innerHTML = '';

    if(tarjeta == 'A'){
        footer.innerHTML = `
    <div class="flechaAtras">
      <a href="agregarPrueba.html?id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
      <span>Regresar</span>
    </div>
    <div class="flechaSiguiente">
        <a href="evaluarPrueba.html?img=1&id=${idPaciente}"><img src="./assets/img/icons8-go-50.png"></a>
        <span>Siguiente</span>
    </div>`
    }

    if(tarjeta == '1'){
        footer.innerHTML = `
            <div class="flechaAtras">
            <a href="evaluarPrueba.html?img=A&id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
            <span>Regresar</span>
            </div>
            <div class="flechaSiguiente">
            <a href="evaluarPrueba.html?img=2&id=${idPaciente}"><img src="./assets/img/icons8-go-50.png"></a>
            <span>Siguiente</span>
            </div>
        `
    }

    if(tarjeta == '2'){
        footer.innerHTML = `
            <div class="flechaAtras">
            <a href="evaluarPrueba.html?img=1&id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
            <span>Regresar</span>
            </div>
            <div class="flechaSiguiente">
            <a href="evaluarPrueba.html?img=3&id=${idPaciente}"><img src="./assets/img/icons8-go-50.png"></a>
            <span>Siguiente</span>
            </div>
        `
    }
    if(tarjeta == '3'){
        footer.innerHTML = `
            <div class="flechaAtras">
            <a href="evaluarPrueba.html?img=2&id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
            <span>Regresar</span>
            </div>
            <div class="flechaSiguiente">
            <a href="evaluarPrueba.html?img=4&id=${idPaciente}"><img src="./assets/img/icons8-go-50.png"></a>
            <span>Siguiente</span>
            </div>
        `
    }
    if(tarjeta == '4'){
        footer.innerHTML = `
            <div class="flechaAtras">
            <a href="evaluarPrueba.html?img=3&id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
            <span>Regresar</span>
            </div>
            <div class="flechaSiguiente">
            <a href="evaluarPrueba.html?img=5&id=${idPaciente}"><img src="./assets/img/icons8-go-50.png"></a>
            <span>Siguiente</span>
            </div>
        `
    }
    if(tarjeta == '5'){
        footer.innerHTML = `
            <div class="flechaAtras">
            <a href="evaluarPrueba.html?img=4&id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
            <span>Regresar</span>
            </div>
            <div class="flechaSiguiente">
            <a href="evaluarPrueba.html?img=6&id=${idPaciente}"><img src="./assets/img/icons8-go-50.png"></a>
            <span>Siguiente</span>
            </div>
        `
    }
    if(tarjeta == '6'){
        footer.innerHTML = `
            <div class="flechaAtras">
            <a href="evaluarPrueba.html?img=5&id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
            <span>Regresar</span>
            </div>
            <div class="flechaSiguiente">
            <a href="evaluarPrueba.html?img=7&id=${idPaciente}"><img src="./assets/img/icons8-go-50.png"></a>
            <span>Siguiente</span>
            </div>
        `
    }
    if(tarjeta == '7'){
        footer.innerHTML = `
            <div class="flechaAtras">
            <a href="evaluarPrueba.html?img=6&id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
            <span>Regresar</span>
            </div>
            <div class="flechaSiguiente">
            <a href="evaluarPrueba.html?img=8&id=${idPaciente}"><img src="./assets/img/icons8-go-50.png"></a>
            <span>Siguiente</span>
            </div>
        `
    }
    if(tarjeta == '8'){
        footer.innerHTML = `
            <div class="flechaAtras">
            <a href="evaluarPrueba.html?img=7&id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
            <span>Regresar</span>
            </div>
            <div class="flechaSiguiente">
            <a href="crearReporte.html?id=${idPaciente}"><img src="./assets/img/icons8-go-50.png"></a>
            <span>Siguiente</span>
            </div>
        `
    }
    
}

document.getElementById('manual').addEventListener('click',() =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let tarjeta = urlParams.get('img');
    $('#manualModal').modal()


    document.getElementById("exampleModalLabel").innerHTML = 'Escala de evaluación tarjeta '+tarjeta;

    let indicadores = document.getElementById("carousel-indicators"),carousel = document.getElementById('carousel')
    indicadores.innerHTML = '';
    carousel.innerHTML = '';
    evaluacion[`img${tarjeta}`].map((e,i) =>{
        i == 0 ? indicadores.innerHTML += ` <li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>` : indicadores.innerHTML += ` <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`
        i == 0 ? carousel.innerHTML += `<div class="carousel-item active">${dibujarManual(tarjeta,i)} <img src="./assets/img/manual/${tarjeta}${i}.JPG"/><br><br><br></div>` : carousel.innerHTML += `<div class="carousel-item">${dibujarManual(tarjeta,i)}<img src="./assets/img/manual/${tarjeta}${i}.JPG"/><br><br><br></div> `
    })

})


const dibujarManual = (tarjeta,evaluacion) =>{  
    let aspectosAEvaluar = {
        imgA:['Distorsion de la forma','Desproporción','Rotación','Integración'],
        img1:['Distorsion de la forma','Rotación','Perseveración'],
        img2:['Rotación','Integración','Perseveración'],
        img3:['Distorsión de la forma','Rotación','Integración', 'Linea continua'],
        img4:['Rotación','Integración'],
        img5:['Modificación de la forma','Rotación','Desintegración','Linea continua'],
        img6:['Curvas por ángulos','Lineas rectas','Integración','Perseveración'],
        img7:['Desproporción','Distorción de la forma','Rotación','Integración'],
        img8:['Distorsión de la forma','Rotación']
    }
    let descripcion = {
        imgA:['Se puntua con 1 cuando el cuadrado, el círculo, o ambos están excesivamente achatados o deformados.','Se puntua con 1 cuando existe la desproporción entre el tamaño del cuadrado y el del círculo (uno es el doble de grande que el otro)','Se puntúa con 1 cuando se aprecia la rotación de la figura o parte de esta en más de 45°.','Se puntúa con 1 cuando se aprecia la falla en el intento de unir el círculo y el cuadrado; el círculo y el vértice adyacente del cuadrado se encuentran separados o superpuestos a más de 3 mm.'],
        img1:['Se puntúa con 1 cuando cinco o menos puntos de la figura son convertidos en círculos, cuando los puntos son agrandados o círculos parcialmente llenados.','Se puntúa con 1 cuando la figura es rotada en 45º o más.','Se puntúa con 1 cuando se realizan más de 15 puntos en una hilera.'],
        img2:['Se puntúa con 1 cuando la rotación de la figura es en 45º o más.','Se puntúa con 1 cuando se observa la omisión de una o más hileras de círculos.','Se puntúa con uno cuando se realizan más de 14 columnas de círculos en una hilera.'],
        img3:['Se puntúa con 1 cuando cinco o más puntos de la figura original son copiados con círculos, puntos agrandados o círculos parcialmente rellenos en lugar de puntos.','Se puntúa 1 cuando la figura copiada es rotada en 45º o más.','Se puntua con 1 cuando la figura copiada evidencia la desintegración del diseño: aumento de cada hilera sucesiva de puntos no lograda, "cabeza de flecha" irreconocible o invertida, conglomeración de puntos.', 'Se puntua con 1 cuando en la figura copiada se reemplaza por una o más líneas en lugar de hilera de punto; la línea puede sustituir a los puntos o estar agregada a estos.'],
        img4:['Se puntúa con 1 cuando la figura copiada está rotada en 45º o más.','Se puntúa con 1 cuando se observa en la figura copiada una separación de 3 mm entre la curva y el ángulo adyacente.'],
        img5:['Se puntúa con 1 cuando cinco o más puntos de la tarjeta original es reemplazada por círculos o puntos agrandados.','Se puntúa con 1 cuando la figura esta rotada en 45º o más; o cuando hay rotación de la extensión (es decir, cuando esta apunta hacia la derecha o la izquierda).','Se puntúa con 1 cuando la figura copiada evidencia la desintegración del diseño, conglomeración de puntos, línea recta o círculo de puntos en lugar de arco.','Se puntúa con 1 cuando en la figura copiada por el niño o niña, es reemplazada por línea continua en lugar de una hilera de puntos ya sea en el arco y/o la extensión.'],
        img6:['Se puntúa con 1 cuando tres o más curvas son sustituidas por ángulos (como los dientes de un serrucho).','Se puntúa con 1 cuando una o ambas líneas curvadas de la tarjeta original son sustituidas por líneas rectas.','Se puntúa con 1 cuando las dos líneas no se cruzan o se cruzan en el extremo de una o de ambas líneas, dos líneas onduladas entrelazadas.','Se puntúa con 1 cuando en la figura copiada, se muestran seis o más curvas sinusoidales completas en cualquiera de las dos direcciones.'],
        img7:['Se puntúa con 1 cuando en la figura copiada existe desproporción entre el tamaño de los 2 hexágonos (para puntuar con uno, un hexágono debe ser al menos el doble de grande que el otro). ','Se puntúa con 1 cuando los hexágonos copiados están excesivamente deformados o presente adición u omisión de ángulos.','Se puntúa con 1 cuando la figura copiada presenta rotación en 45º o más.','Se puntúa con 1 cuando los hexágonos copiados no se superponen o lo hacen excesivamente. '],
        img8:['Se puntúa con 1 cuando el hexágono o el rombo copiado se presentan excesivamente deformados o cuando se agregan u omiten los ángulos de la figura original.','Se puntúa con 1 cuando la figura copiada, esta rotada en 45º o más']
    }
    let manual = ""
    manual = `<h4 style="text-align:center;">${aspectosAEvaluar[`img`+tarjeta][evaluacion]}</h4><br><p>${descripcion[`img`+tarjeta][evaluacion]}</p>`
    return manual

}


const recortarTarjeta = (tarjeta) => {
    
    let imgPrueba = document.getElementById("img-cropper")
    let imgTarjeta = document.getElementById("img-croppered")
    document.getElementById("modalRecortarPruebaHeader").innerHTML = '<h2>Recortar tarjeta '+tarjeta+'</h2>'
    imgPrueba.src = imagenPrueba;


    cropper = new Cropper(imgPrueba, {
      // aspectRatio: 1, // es la proporción en la que queremos que recorte en este caso 1:1
      preview: '.img-sample', // contenedor donde se va a ir viendo en tiempo real la imagen cortada
      zoomable: true, //Para que no haga zoom 
      viewMode: 1, //Para que no estire la imagen al contenedor
      responsive: false, //Para que no reacomode con zoom la imagen al contenedor
      dragMode: 'crop', //Para que al arrastrar no haga nada
      ready(){ // metodo cuando cropper ya este activo, le ponemos el alto y el ancho del contenedor de cropper al 100%
          document.querySelector('.cropper-container').style.width = '100%'
          document.querySelector('.cropper-container').style.height = '100%'
      }
  })

  $('.modal2').addClass('active')
  $('.modal-content2').addClass('active')

  $('.modal2').removeClass('remove')
  $('.modal-content2').removeClass('remove')  
}


document.getElementById('recortarTarjeta').addEventListener('click', () =>{

  let params = window.location.search;
  let urlParams = new URLSearchParams(params);
  let tarjeta = urlParams.get('img');

  let imagenPrueba = document.getElementById('img-Prueba')
  let canva = cropper.getCroppedCanvas()
  
  dataCropper["img"+tarjeta] = cropper.getData()
  let image = document.getElementById('img-cropper')

  let base64Canvas = canva.toDataURL()
  imagenPrueba.src = base64Canvas
  
//   console.log("Metiendo ", tarjeta, base64Canvas)
  urls["img"+tarjeta] = base64Canvas

//   console.log(urls["img"+tarjeta])
  
  localStorage.setItem('urls',JSON.stringify(urls))


    image.src = "";

    cropper.destroy()

    $('.modal2').addClass('remove')
    $('.modal-content2').addClass('remove')

    $('.modal2').removeClass('active')
    $('.modal-content2').removeClass('active')
})


document.getElementById("cerrar").addEventListener("click", () =>{
  let params = window.location.search;
  let urlParams = new URLSearchParams(params);
  let tarjeta = urlParams.get('img');
  if(urls["img"+tarjeta] == ''){
    alerta("Selecciona la tarjeta", "Debes seleccionar la sección de la prueba que corresponde a la tarjeta "+tarjeta, "info")
  }
  else{
    let image = document.getElementById('img-cropper')


  image.src = "";


  cropper.destroy()

  $('.modal2').addClass('remove')
  $('.modal-content2').addClass('remove')

  $('.modal2').removeClass('active')
  $('.modal-content2').removeClass('active')
  }
  
})


document.getElementById("editarRecorte").addEventListener("click", () =>{
  let params = window.location.search;
  let urlParams = new URLSearchParams(params);
  let tarjeta = urlParams.get('img');
  let imgPrueba = document.getElementById("img-cropper")
  imgPrueba.src = imagenPrueba;
  cropper = new Cropper(imgPrueba, {
    // aspectRatio: 1, // es la proporción en la que queremos que recorte en este caso 1:1
    preview: '.img-sample', // contenedor donde se va a ir viendo en tiempo real la imagen cortada
    zoomable: true, //Para que no haga zoom 
    viewMode: 1, //Para que no estire la imagen al contenedor
    data: dataCropper["img"+tarjeta],
    responsive: false, //Para que no reacomode con zoom la imagen al contenedor
    dragMode: 'crop', //Para que al arrastrar no haga nada
    ready(){ // metodo cuando cropper ya este activo, le ponemos el alto y el ancho del contenedor de cropper al 100%
        document.querySelector('.cropper-container').style.width = '100%'
        document.querySelector('.cropper-container').style.height = '100%'
  }
  })

  $('.modal2').addClass('active')
  $('.modal-content2').addClass('active')

  $('.modal2').removeClass('remove')
  $('.modal-content2').removeClass('remove')
})


document.getElementById('img-Prueba').addEventListener('load', (e)=>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let tarjeta = urlParams.get('img');

    if(tarjeta == "A" || tarjeta == "7" || tarjeta == "8"){
        let img = cv.imread(e.target);

        procesarImagen(img, tarjeta)
    }
})

const procesarImagen = (img, tarjeta) => {
  let imgCanvas = document.querySelector('#canvasOutput')
  let destino = new cv.Mat()
  let dsize = new cv.Size(TAM, TAM);
  
  console.log(img)
    cv.resize(img, destino, dsize, 0, 0, cv.INTER_AREA)
    cv.cvtColor(destino, destino, cv.COLOR_RGBA2GRAY, 1)
    cv.adaptiveThreshold(destino,destino, 255,cv.ADAPTIVE_THRESH_MEAN_C,cv.THRESH_BINARY_INV,21,15)

    // cv.imshow('canvasOutput', destino)
    // imprimePixeles(destino)
    console.log(destino)
    let arrAux = []
    let imgARR = []
    for(let i=0; i<destino.data.length; i++){
        let val = destino.data[i]/255
        arrAux.push([val])
        if(arrAux.length == TAM){
            imgARR.push(arrAux)
            arrAux = []
        }
    }
    
    imgARR = [imgARR]
    console.log(imgARR)
    
    let tensor4 = tf.tensor4d(imgARR)

    let resultados = modelos["modelo"+tarjeta].predict(tensor4).dataSync()
    
    console.log(resultados)
    let categorias = ['NORMAL','DEFORMACION','DESPROPORCION IZQ.','DESPROPORCION DER.','INTEGRACIÓN JUNTOS','INTEGRACIÓN SEPARADOS','ROTACION'];

    // console.log(resultados)



    realizaEvaluacionAutomatica(resultados, tarjeta)
    
        
    
    
}
const imprimePixeles = (img) =>{
    let pixDiv = document.querySelector('#pixeles')
    pixDiv.innerHTML = ''
    for(let i=0;i<img.data.length;i++){
      pixDiv.innerHTML += img.data[i]/255+" "
      
      if((i+1)%70 == 0)
        pixDiv.innerHTML += '<br>'
  
    }
    console.log(img.data)
  }
  
const cargarModelo = async (tarjeta) =>{
    console.log("Cargando modelo...");
    modelos["modelo"+tarjeta] = await tf.loadLayersModel("model"+tarjeta+".json");
    console.log("Modelo cargado...");
}


const realizaEvaluacionAutomatica = (resultados,tarjeta) =>{
    let categorias = ['NORMAL','DEFORMACION','DESPROPORCION IZQ.','DESPROPORCION DER.','INTEGRACIÓN JUNTOS','INTEGRACIÓN SEPARADOS','ROTACION'];
    let categoriasKoppitz = []
    let aux = 0
    if(tarjeta == "A"){
        // console.log(tarjeta, resultados)
        for(let i=0; i<resultados.length; i++){
            if(i==0 || i == 1){
                categoriasKoppitz.push((resultados[i]*100).toLocaleString('en-US', { minimumFractionDigits: 3,maximumFractionDigits: 3 }))   
            }
               
            if(i==2){
                aux = resultados[i]*100
            }
            if(i==3){
                aux < resultados[i]*100 ? aux = resultados[i]*100 : aux = aux
                categoriasKoppitz.push((aux).toLocaleString('en-US', { minimumFractionDigits: 3,maximumFractionDigits: 3 }))
                aux = 0    
            }
            if(i==4){
                aux = resultados[i]*100
            }
            if(i==5){
                console.log("metiendo intefgracion separada")
                aux < resultados[i]*100 ? aux = resultados[i]*100 : aux = aux
                categoriasKoppitz.push((aux).toLocaleString('en-US', { minimumFractionDigits: 2,maximumFractionDigits: 3 }))
                aux = 0    
            }
            if(i==6){
                categoriasKoppitz.push((0).toLocaleString('en-US', { minimumFractionDigits: 2,maximumFractionDigits: 3 }))
            }
        }
        // categoriasKoppitz.map((e,idx) =>{
        //     if(idx !=0){
        //         if(Number(e) > 50){
        //             evaluacion["img"+tarjeta][idx] = 1
        //         }
        //     }
            
        // })
        // console.log(evaluacion)
        console.log(categoriasKoppitz)

        pintarPorcentaje(tarjeta,categoriasKoppitz)
        

        //setValoresAspectos(tarjeta)
    }
    if(tarjeta == "7"){
        for(let i=0; i<resultados.length; i++){
            if(i==0 || i == 1){
                categoriasKoppitz.push((resultados[i]*100).toLocaleString('en-US', { minimumFractionDigits: 3,maximumFractionDigits: 3 }))   
            }
               
            if(i==2){
                aux = resultados[i]*100
            }
            if(i==3){
                aux < resultados[i]*100 ? aux = resultados[i]*100 : aux = aux
                categoriasKoppitz.push((aux).toLocaleString('en-US', { minimumFractionDigits: 3,maximumFractionDigits: 3 }))
                aux = 0    
            }
            if(i==4){
                aux = resultados[i]*100
            }
            if(i==5){
                aux < resultados[i]*100 ? aux = resultados[i]*100 : aux = aux
                categoriasKoppitz.push((aux).toLocaleString('en-US', { minimumFractionDigits: 3,maximumFractionDigits: 3 }))
                aux = 0   
            }
            if(i==6){
                categoriasKoppitz.push((0).toLocaleString('en-US', { minimumFractionDigits: 2,maximumFractionDigits: 3 }))
            }
        }
        // categoriasKoppitz.map((e,idx) =>{
        //     if(idx !=0){
        //         if(Number(e) > 50){
        //             evaluacion["img"+tarjeta][idx] = 1
        //         }
        //     }
            
        // })
        pintarPorcentaje(tarjeta,categoriasKoppitz)
        

        //setValoresAspectos(tarjeta)
    }

    if(tarjeta == "8"){
        for(let i=0; i<resultados.length; i++){
            if(i==0 || i == 1){
                categoriasKoppitz.push((resultados[i]*100).toLocaleString('en-US', { minimumFractionDigits: 3,maximumFractionDigits: 3 }))   
            }
               
            if(i==2){
                aux = resultados[i]*100
            }
            if(i==3){
                aux < resultados[i]*100 ? aux = resultados[i]*100 : aux = aux
                categoriasKoppitz.push((aux).toLocaleString('en-US', { minimumFractionDigits: 3,maximumFractionDigits: 3 }))
                aux = 0    
            }
            if(i==4){
                aux = resultados[i]*100
            }
            if(i==5){
                aux < resultados[i]*100 ? aux = resultados[i]*100 : aux = aux
                categoriasKoppitz.push((aux).toLocaleString('en-US', { minimumFractionDigits: 3,maximumFractionDigits: 3 }))
                aux = 0   
            }
            if(i==6){
                categoriasKoppitz.push((0).toLocaleString('en-US', { minimumFractionDigits: 2,maximumFractionDigits: 3 }))
            }
        }
        // categoriasKoppitz.map((e,idx) =>{
        //     if(idx !=0){
        //         if(Number(e) > 50 && (idx == 1 || idx == 4)){
        //             idx == 1 ? evaluacion["img"+tarjeta][0] = 1 : false
        //             idx == 4 ? evaluacion["img"+tarjeta][1] = 1 : false
        //         }
        //     }
            
        // })
        console.log(categoriasKoppitz)
        pintarPorcentaje(tarjeta,categoriasKoppitz)
        

        //setValoresAspectos(tarjeta)
    }
    
}

const pintarPorcentaje = (tarjeta, evaluacionK) =>{
    let calificadores = document.getElementById('box-clasificadores');
    let aspectosAEvaluar = {
        A:['1a','1b','2','3'],
        img1:['4','5','6'],
        img2:['7','8','9'],
        img3:['10','11','12a', '12b'],
        img4:['13','14'],
        img5:['15','16','17a','17b'],
        img6:['18a','18b','19','20'],
        img7:['21a','21b','22','23'],
        img8:['24','25']
    }, descripcionAspectosAEvaluar = {
        A:['Distorsion de la forma','Desproporción','Rotación','Integración'],
        img1:['Distorsion de la forma','Rotación','Perseveración'],
        img2:['Rotación','Integración','Perseveración'],
        img3:['Distorsión de la forma','Rotación','Integración', 'Linea continua'],
        img4:['Rotación','Integración'],
        img5:['Modificación de la forma','Rotación','Desintegración','Linea continua'],
        img6:['Curvas por ángulos','Lineas rectas','Integración','Perseveración'],
        img7:['Desproporción','Distorción de la forma','Rotación','Integración'],
        img8:['Distorsión de la forma','Rotación']
    }
    let aspecto, descripcion;
    if(tarjeta == 'A'){
        aspecto = aspectosAEvaluar.A;
        descripcion = descripcionAspectosAEvaluar.A;
        calificadores.innerHTML = '';
        calificadores.innerHTML += `<div style="text-align:center;">NORMAL: </div><div style="text-align:center;">${evaluacionK[0]}%</div>`;
        aspecto.map( (a, idx) =>{
            let aux
            if(idx == 2){
                aux = ""
            }else if(idx == 3){
                aux = evaluacionK[3] + "%" 
            }
            else{
                aux = evaluacionK[idx+1] + "%"
            }
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
                ${aux}
            </label>
        </div>`
        })  
    }
    if(tarjeta == '7'){
        aspecto = aspectosAEvaluar.img7;
        descripcion = descripcionAspectosAEvaluar.img7;
        calificadores.innerHTML = '';
        calificadores.innerHTML += `<div style="text-align:center;">NORMAL: </div><div style="text-align:center;">${evaluacionK[0]}%</div>`;
        aspecto.map( (a, idx) =>{
            let aux
            if(idx == 0){
                aux = evaluacionK[2]+"%"
            }else if(idx == 1){
                aux = evaluacionK[1]+"%"
            }else if(idx == 2){
                aux = ""
            }else{
                aux = evaluacionK[idx] + "%"
            }
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
                ${aux}
            </label>
        </div>`
        })  
    }
    if(tarjeta == '8'){
        aspecto = aspectosAEvaluar.img8;
        descripcion = descripcionAspectosAEvaluar.img8;
        calificadores.innerHTML = '';
        calificadores.innerHTML += `<div style="text-align:center;">NORMAL: </div><div style="text-align:center;">${evaluacionK[0]}%</div>`;
        aspecto.map( (a, idx) =>{
            let aux
            if(idx == 0){
                aux = evaluacionK[1]+"%"
            }else if(idx == 1){
                aux = ""
            }
            calificadores.innerHTML += ` <div class="form-element mt-2">
            <input type="checkbox" name="${a}" value="${a}" id="${idx}">
            <label for="${idx}">
                <div class="titulo">${descripcion[idx]}</div>
                ${aux}
            </label>
        </div>`
        })  
    }
    setValoresAspectos(tarjeta)
}
