let urls = [];
const subirImagenes = async () =>{
        let idPrueba;


        if((imagenesInputs[0].length == 0 || imagenesInputs[1].length == 0 || imagenesInputs[2].length == 0 ||imagenesInputs[3].length == 0 ||imagenesInputs[4].length == 0 ||imagenesInputs[5].length == 0 ||imagenesInputs[6].length == 0 ||imagenesInputs[7].length == 0 ||imagenesInputs[8].length == 0) && (urls.length<9)){
            alerta('Faltan por cargar imagenes', 'Debes agregar todas las imagenes de la prueba para continuar', 'info');
            return;
        }else{
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

                // console.log("La prueba vacia ", idPrueba)

                let uploadTask;
                let subidasCompletadas = [];
                for(i of imagenesInputs){
                    uploadTask = await defaultStorage.ref().child(idPrueba+'/'+i[0].name).put(i[0]);
                    subidasCompletadas.push(uploadTask);
                }

                // console.log(subidasCompletadas);

                await obtenerURLsImgs(subidasCompletadas);
                
                dataImagenes = {
                    img1:urls[0],
                    img2:urls[1],
                    img3:urls[2],
                    img4:urls[3],
                    img5:urls[4],
                    img6:urls[5],
                    img7:urls[6],
                    img8:urls[7],
                    imgA:urls[8]
                }
                // console.log(dataImagenes)
                // console.log("La prueba con datos a updatear", idPrueba, urls)
                db.collection("imagenesPruebas").doc(idPrueba).update(dataImagenes).then(async (docRef) =>{
                    // console.log("mgsCargadas en donde tenia que estar era en ", idPrueba)
                    sessionStorage.setItem("urls", urls)
                    await alerta('Archivos cargados correctamente', 'Las imágenes de la prueba fueron cargados exitosamente', 'success')
                    setTimeout(() =>{
                        window.location = 'evaluarPrueba.html?img=A&id='+idPrueba;
                    }, 1500);
                }); 
            })          
            
        }
}
    
const obtenerURLsImgs = async (uploadsTasks) =>{
    for(let t of uploadsTasks){
        let url = await t.ref.getDownloadURL();
        urls.push(url)
    }
}