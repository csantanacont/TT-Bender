let idPaciente;
let imgs = ["","","","","","","","",""];
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

    document.getElementById('input-imgA').addEventListener('change', (e)=>{
        let preVis = document.getElementById('A');
        const reader = new FileReader();

        reader.addEventListener('load', ()=>{
            imgs[0] = reader.result;
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
    document.getElementById('input-img1').addEventListener('change', (e)=>{
        let preVis = document.getElementById('1');
        const reader = new FileReader();

        reader.addEventListener('load', ()=>{
            imgs[1] = reader.result;
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
    document.getElementById('input-img2').addEventListener('change', (e)=>{
        let preVis = document.getElementById('2');
        const reader = new FileReader();

        reader.addEventListener('load', ()=>{
            imgs[2] = reader.result;
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
    
    document.getElementById('input-img3').addEventListener('change', (e)=>{
        let preVis = document.getElementById('3');
        
        const reader = new FileReader();

        reader.addEventListener('load', ()=>{
            imgs[3] = reader.result;
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
    document.getElementById('input-img4').addEventListener('change', (e)=>{
        let preVis = document.getElementById('4');
        const reader = new FileReader();

        reader.addEventListener('load', ()=>{
            imgs[4] = reader.result;
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
    document.getElementById('input-img5').addEventListener('change', (e)=>{
        let preVis = document.getElementById('5');
      
        const reader = new FileReader();

        reader.addEventListener('load', ()=>{
            imgs[5] = reader.result;
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
    
    document.getElementById('input-img6').addEventListener('change', (e)=>{
        let preVis = document.getElementById('6');
        const reader = new FileReader();

        reader.addEventListener('load', ()=>{
            imgs[6] = reader.result;
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
    document.getElementById('input-img7').addEventListener('change', (e)=>{
        let preVis = document.getElementById('7');
        const reader = new FileReader();

        reader.addEventListener('load', ()=>{
            imgs[7] = reader.result;
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
    document.getElementById('input-img8').addEventListener('change', (e)=>{
        let preVis = document.getElementById('8');
        const reader = new FileReader();

        reader.addEventListener('load', ()=>{
            imgs[8] = reader.result;
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
})

document.getElementById('back-button').addEventListener('click', () =>{
    window.location = './listarPruebas.html?id='+idPaciente;
})


const evaluarPrueba = () =>{
    let imagenesInputs = []; 

    imagenesInputs.push(document.getElementById('input-imgA').files);
    imagenesInputs.push(document.getElementById('input-img1').files);
    imagenesInputs.push(document.getElementById('input-img2').files);
    imagenesInputs.push(document.getElementById('input-img3').files);
    imagenesInputs.push(document.getElementById('input-img4').files);
    imagenesInputs.push(document.getElementById('input-img5').files);
    imagenesInputs.push(document.getElementById('input-img6').files);
    imagenesInputs.push(document.getElementById('input-img7').files);
    imagenesInputs.push(document.getElementById('input-img8').files);
    if((imagenesInputs[0].length == 0 || imagenesInputs[1].length == 0 || imagenesInputs[2].length == 0 ||imagenesInputs[3].length == 0 ||imagenesInputs[4].length == 0 ||imagenesInputs[5].length == 0 ||imagenesInputs[6].length == 0 ||imagenesInputs[7].length == 0 ||imagenesInputs[8].length == 0)){
        alerta('Faltan por cargar imagenes', 'Debes agregar todas las imagenes de la prueba para continuar', 'info');
        return;
    }else{
        localStorage.setItem("imgB64",JSON.stringify(imgs))
        localStorage.setItem("evaluacion",JSON.stringify(evaluacion))
        setTimeout(() =>{
            window.location = `evaluarPrueba.html?img=A&id=${idPaciente}`;
        }, 1500);
    }
}


