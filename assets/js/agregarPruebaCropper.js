let idPaciente;
const image = document.getElementById('image');
const extensiones = ['.jpg', '.jpeg', '.JPEG', '.JPG', '.png', '.PNG']
const MAX_FILE_SIZE = 3000000 // Tamanio en bytes
let imgPruebaB64 = ''
let evaluacion = {
    imgA:[0,0,0,0],
    img1:[0,0,0],
    img2:[0,0,0],
    img3:[0,0,0,0],
    img4:[0,0],
    img5:[0,0,0,0],
    img6:[0,0,0,0],
    img7:[0,0,0,0],
    img8:[0,0]
};
let urls = {
    imgA:"",
    img1:"",
    img2:"",
    img3:"",
    img4:"",
    img5:"",
    img6:"",
    img7:"",
    img8:""
};
let dataCropper = {
    imgA:{},
    img1:{},
    img2:{},
    img3:{},
    img4:{},
    img5:{},
    img6:{},
    img7:{},
    img8:{}
}
window.addEventListener('load',async () =>{
    localStorage.clear()
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    idPaciente = urlParams.get('id');

    if(idPaciente == null || idPaciente == undefined){
        await alerta('Paciente no identificado', 'El paciente al que se hace referencia no se identifica', 'info');
        setTimeout(() =>{
            window.location = './home.html'
        }, 1500);
    }
})

image.addEventListener('change', (e)=>{
    let preVis = document.getElementById('muestra');
    const reader = new FileReader();            

    reader.addEventListener('load', ()=>{
        let imgA = e.target.files[0];
        if(imgA.size > MAX_FILE_SIZE){
            alerta('Tamaño de archivo excedido', 'El archivo de imagen que intentas subir, supera el limite de 3MB','info')
            e.target.value = ""
            return
        }else if(!extensiones.includes(imgA.name.substring(imgA.name.indexOf("."),imgA.name.length))){
            alerta('Tipo de archivo no valido', 'El archivo que intentas subir debe ser de alguno de los siguientes tipos: JPG, JPEG o PNG','info')
            e.target.value = ""
            preVis.classList.remove('zoom')
            preVis.value = ''
            preVis.src = "./assets/img/add-image.png";
            return;
        }
        imgPruebaB64 = reader.result;
        preVis.src = URL.createObjectURL(e.target.files[0]);
        preVis.classList.add('zoom')
    })
    try{
        reader.readAsDataURL(e.target.files[0]);
    }
    catch(e){
        preVis.classList.remove('zoom')
        preVis.value = ''
        preVis.src = "./assets/img/add-image.png";
        return;
    }
})


const evaluarPrueba = () =>{
    if(image.files.length == 0){
        alerta('Faltan por cargar imagenes', 'Debes cargar la imagen de la prueba para continuar', 'info');
        return;
    }else{
        localStorage.setItem("imgB64",imgPruebaB64)
        localStorage.setItem("urls",JSON.stringify(urls))
        localStorage.setItem("evaluacion",JSON.stringify(evaluacion))
        localStorage.setItem("dataCropper",JSON.stringify(dataCropper))
        setTimeout(() =>{
            window.location = `evaluarPrueba.html?img=A&id=${idPaciente}`;
        }, 1500);
    }
}