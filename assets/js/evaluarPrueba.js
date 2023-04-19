let urls;
let idPaciente;
let evaluacion = JSON.parse(localStorage.evaluacion)

window.addEventListener('load', async () =>{

    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let imagenPrueba = urlParams.get('img');
    idPaciente = urlParams.get('id');
    urls =JSON.parse(localStorage.imgB64); 
    console.log(urls)
    cargarImagenes(imagenPrueba);
    cargarAspectosAEvaluar(imagenPrueba);
    setValoresAspectos(imagenPrueba);
    evaluar(imagenPrueba);
    cargarFlechas(imagenPrueba, idPaciente);

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


const cargarImagenes = (tarjeta) =>{
        let imgOriginal = document.getElementById('imgOriginalDiv'), 
            imgPrueba = document.getElementById('img-Prueba'),
            tituloTarjeta = document.getElementById('tituloTarjeta');

            tituloTarjeta.innerHTML = `Tarjeta ${tarjeta}`
    if(tarjeta == 'A'){
        imgOriginal.style.backgroundImage = `url('./assets/img/tarjetas/${tarjeta}.jpg')`
        imgOriginal.style.backgroundPosition = 'center'
        imgOriginal.style.position = 'relative'
        // imgOriginal.style.backgroundSize = '99%'
        // imgOriginal.style.backgroundAttachment = 'local'
        imgOriginal.style.backgroundRepeat = 'no-repeat'


        imgPrueba.src = urls[0]
        imgPrueba.style.backgroundPosition = 'center'
        imgPrueba.style.backgroundRepeat = 'no-repeat'
        // imgPrueba.style.overflow = 'hidden'
        // imgPrueba.style.backgroundAttachment = 'local'
        imgPrueba.style.backgroundSize = '20%'
    }else{
        imgOriginal.style.backgroundImage = `url('./assets/img/tarjetas/${tarjeta}.jpg')`
        imgOriginal.style.backgroundPosition = 'center'
        imgOriginal.style.backgroundSize = '99%'
        imgOriginal.style.backgroundAttachment = 'local'
        imgOriginal.style.backgroundRepeat = 'no-repeat'


        imgPrueba.src = urls[tarjeta]
        // imgPrueba.style.backgroundImage = `url(${urls[tarjeta]})`
        imgPrueba.style.position = 'relative'
        imgPrueba.style.backgroundPosition = 'center'
        imgPrueba.style.backgroundRepeat = 'no-repeat'
        imgPrueba.style.backgroundSize = '20%'

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

