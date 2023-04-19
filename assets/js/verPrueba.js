let data;

window.addEventListener('load',async () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let idPrueba = urlParams.get('id');

    await db.collection("pruebas")
    .where(firebase.firestore.FieldPath.documentId(),'==',idPrueba)
    .get()
    .then(querySnapshot =>{
        querySnapshot.docs.forEach(doc =>{
            data = doc.data();
        })
    })

    await db.collection("evaluaciones")
    .where(firebase.firestore.FieldPath.documentId(),'==',data.idEscalaMaduracion)
    .get()
    .then(querySnapshot =>{
        querySnapshot.docs.forEach(doc =>{
            evaluacion = doc.data()
        })
    })

    let imgs = ['A','0','1','2','3','4','5','6','7','8']
    imgs.map(i =>{
        setValoresAspectosPDF(i);
    })
    setDatosPaciente()
    console.log(data.idPaciente)
    setIcons(idPrueba, data.idPaciente)

})
const setValoresAspectosPDF = (tarjeta) =>{
    let evaluacion0,evaluacion1, evaluacion2, evaluacion3;
    
    if(tarjeta == 'A'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0B");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1B");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2B");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3B");

        evaluacion0.checked = evaluacion.imgA[0];
        evaluacion1.checked = evaluacion.imgA[1];
        evaluacion2.checked = evaluacion.imgA[2];
        evaluacion3.checked = evaluacion.imgA[3];
    }   
    if(tarjeta == '1'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0B");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1B");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2B");
        
        evaluacion0.checked = evaluacion.img1[0];
        evaluacion1.checked = evaluacion.img1[1];
        evaluacion2.checked = evaluacion.img1[2];
        
    }  
    if(tarjeta == '2'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0B");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1B");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2B");

        evaluacion0.checked = evaluacion.img2[0];
        evaluacion1.checked = evaluacion.img2[1];
        evaluacion2.checked = evaluacion.img2[2];
    }  
    if(tarjeta == '3'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0B");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1B");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2B");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3B");

        evaluacion0.checked = evaluacion.img3[0];
        evaluacion1.checked = evaluacion.img3[1];
        evaluacion2.checked = evaluacion.img3[2];
        evaluacion3.checked = evaluacion.img3[3];
    }  
    if(tarjeta == '4'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0B");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1B");

        evaluacion0.checked = evaluacion.img4[0];
        evaluacion1.checked = evaluacion.img4[1];
   
    }  
    if(tarjeta == '5'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0B");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1B");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2B");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3B");

        evaluacion0.checked = evaluacion.img5[0];
        evaluacion1.checked = evaluacion.img5[1];
        evaluacion2.checked = evaluacion.img5[2];
        evaluacion3.checked = evaluacion.img5[3];
    }  
    if(tarjeta == '6'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0B");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1B");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2B");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3B");

        evaluacion0.checked = evaluacion.img6[0];
        evaluacion1.checked = evaluacion.img6[1];
        evaluacion2.checked = evaluacion.img6[2];
        evaluacion3.checked = evaluacion.img6[3];
    }  
    if(tarjeta == '7'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0B");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1B");
        evaluacion2 = document.getElementById(`${tarjeta}`+"-2B");
        evaluacion3 = document.getElementById(`${tarjeta}`+"-3B");

        evaluacion0.checked = evaluacion.img7[0];
        evaluacion1.checked = evaluacion.img7[1];
        evaluacion2.checked = evaluacion.img7[2];
        evaluacion3.checked = evaluacion.img7[3];
    }  
    if(tarjeta == '8'){
        evaluacion0 = document.getElementById(`${tarjeta}`+"-0B");
        evaluacion1 = document.getElementById(`${tarjeta}`+"-1B");

        evaluacion0.checked = evaluacion.img8[0];
        evaluacion1.checked = evaluacion.img8[1];
    }  
}

const setDatosPaciente = async () =>{
    let nombrePDF = document.getElementById("nombre"), edadPDF = document.getElementById("edad"), gradoPDF = document.getElementById("grado"),
    fechaPDF = document.getElementById("fecha"), tiempoPDF = document.getElementById("tiempo"), puntajePDF = document.getElementById("puntaje"), observacionesPDF = document.getElementById("observaciones");

    nombrePDF.innerHTML = " "+data.nombre;
    edadPDF.innerHTML = " "+data.edad;
    gradoPDF.innerHTML = " "+data.gradoEscolar;
    fechaPDF.innerHTML = " "+data.fechaPrueba;
    tiempoPDF.innerHTML = " "+data.tiempo;
    puntajePDF.innerHTML = " "+data.puntaje;
    observacionesPDF.innerHTML = data.observaciones;
}

const  generarPDF = (id) =>{
    window.open("./generarPDF.html?id="+id);
}

const setIcons = (idPrueba, idPaciente) =>{
    let flechaAtras = document.getElementById("backIcon"), guardarIcon = document.getElementById("printIcon");

    flechaAtras.innerHTML ='';
    flechaAtras.innerHTML = `
    <a href="listarPruebas.html?id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
    <span>Regresar</span>`

    guardarIcon.innerHTML = '';
    guardarIcon.innerHTML = `
    <a href="#" onclick=generarPDF("${idPrueba}")><img src="./assets/img/icons8-pdf-48.png"></a>
    <span>Imprimir</span>`

}