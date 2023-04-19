const image = document.getElementById('image');
let cropper = '';
image.addEventListener('change', (e)=>{
    console.log("CAMBIANDO")
    let preVis = document.getElementById('muestra');
    if(e.target.length == 0){
        preVis.src = '';
        return;
    }else{
        console.log(e.target.files)
        let imgA = e.target.files[0];
        let objectURL = URL.createObjectURL(imgA);
        preVis.src = objectURL;
    }
    

    preVis.onload = (e) =>{
        console.log("IMG CARGADA", e.target.src)
        if((e.target.width > e.target.height) && e.target.width > 1000){
            console.log("siomon")
            e.target.style = "width: 30%;"
        }
        if((e.target.width < e.target.height) && e.target.height > 1000){
            console.log("siomon")
            e.target.style = "height: 30%;"
        }

        if(cropper != ''){
            cropper.destroy();
        }
        cropper = new Cropper(e.target, {
            aspectRatio: 1,
            viewMode: 1,
            preview: '.preview'
        });
    }

    
})