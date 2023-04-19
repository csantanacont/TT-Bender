let data;

window.addEventListener('load',async () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let idPrueba = urlParams.get('id');
    generandoPrueba();
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


    generarPDF(idPrueba)

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

const generarPDF = async (idPrueba) =>{
    let nombrePDF = document.getElementById("nombrePDF"), edadPDF = document.getElementById("edadPDF"), gradoPDF = document.getElementById("gradoPDF"),
    fechaPDF = document.getElementById("fechaPDF"), tiempoPDF = document.getElementById("tiempoPDF"), puntajePDF = document.getElementById("puntajePDF"), observacionesPDF = document.getElementById("observacionesPDF");

    let divPDF = document.getElementById("pdf");

    divPDF.style.display = 'block';
    nombrePDF.innerHTML = data.nombre;
    edadPDF.innerHTML = data.edad;
    gradoPDF.innerHTML = data.gradoEscolar;
    fechaPDF.innerHTML = data.fechaPrueba;
    tiempoPDF.innerHTML = data.tiempo;
    puntajePDF.innerHTML = data.puntaje;
    observacionesPDF.innerHTML = data.observaciones;
    let element = document.getElementById('pdf');
    var opt = {
        margin:       [0,0,0,3],
        filename:     'ReporteBender_'+idPrueba+'.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'cm', format: 'letter', orientation: 'p' }
      };
      
      await html2pdf().set(opt).from(element).save();

      window.close()
}

