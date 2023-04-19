window.addEventListener("load",async () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let idImagenes = urlParams.get('id');
    let idPaciente= urlParams.get('p');
    let imgsN = ['A','1','2','3','4','5','6','7','8']
    let imgsDocuments = []

    imgsN.map(nombre =>{ 
        let aux = document.getElementById(nombre);
        imgsDocuments.push(aux)
    })

    await db.collection("imagenesPruebas").doc(idImagenes).get().then((querySnapshot) =>{
        urls = querySnapshot.data()
        console.log(urls)
    })

    imgsDocuments.map((d,i) =>{
        d.src = ''
        d.src = urls["img"+imgsN[i]]
    })

    document.getElementById("titulo").innerHTML = 'Ver imagenes de prueba '
    document.getElementById("flechaAtras").innerHTML = `<a href="listarPruebas.html?id=${idPaciente}"><img src="./assets/img/icons8-go-back-50.png"></a>
    <span>Regresar</span>`

})