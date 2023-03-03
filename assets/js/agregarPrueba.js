// document.getElementById('back-button').addEventListener('click', () =>{
//     window.history.back();  
// })

document.getElementById('input-imgA').addEventListener('change', (e)=>{
    let preVis = document.getElementById('A');
    console.log(e.target.files);
    if(e.target.length == 0){
        preVis.src = '';
        return;
    }
    let imgA = e.target.files[0];
    preVis.classList.add('zoom')
    const objectURL = URL.createObjectURL(imgA);
    preVis.src = objectURL;
  
})
document.getElementById('input-img1').addEventListener('change', (e)=>{
    let preVis = document.getElementById('1');
    console.log(e.target.files);
    if(e.target.length == 0){
        preVis.src = '';
        return;
    }
    let img = e.target.files[0];
    preVis.classList.add('zoom')
    const objectURL = URL.createObjectURL(img);
    preVis.src = objectURL;
})
document.getElementById('input-img2').addEventListener('change', (e)=>{
    let preVis = document.getElementById('2');
    console.log(e.target.files);
    if(e.target.length == 0){
        preVis.src = '';
        return;
    }
    let img = e.target.files[0];
    preVis.classList.add('zoom')
    const objectURL = URL.createObjectURL(img);
    preVis.src = objectURL;
})

document.getElementById('input-img3').addEventListener('change', (e)=>{
    let preVis = document.getElementById('3');
    console.log(e.target.files);
    if(e.target.length == 0){
        preVis.src = '';
        return;
    }
    let img = e.target.files[0];
    preVis.classList.add('zoom')
    const objectURL = URL.createObjectURL(img);
    preVis.src = objectURL;
})
document.getElementById('input-img4').addEventListener('change', (e)=>{
    let preVis = document.getElementById('4');
    console.log(e.target.files);
    if(e.target.length == 0){
        preVis.src = '';
        return;
    }
    let img = e.target.files[0];
    preVis.classList.add('zoom')
    const objectURL = URL.createObjectURL(img);
    preVis.src = objectURL;
})
document.getElementById('input-img5').addEventListener('change', (e)=>{
    let preVis = document.getElementById('5');
    console.log(e.target.files);
    if(e.target.length == 0){
        preVis.src = '';
        return;
    }
    let img = e.target.files[0];
    preVis.classList.add('zoom')
    const objectURL = URL.createObjectURL(img);
    preVis.src = objectURL;
})

document.getElementById('input-img6').addEventListener('change', (e)=>{
    let preVis = document.getElementById('6');
    console.log(e.target.files);
    if(e.target.length == 0){
        preVis.src = '';
        return;
    }
    let img = e.target.files[0];
    preVis.classList.add('zoom')
    const objectURL = URL.createObjectURL(img);
    preVis.src = objectURL;
})
document.getElementById('input-img7').addEventListener('change', (e)=>{
    let preVis = document.getElementById('7');
    console.log(e.target.files);
    if(e.target.length == 0){
        preVis.src = '';
        return;
    }
    let img = e.target.files[0];
    preVis.classList.add('zoom')
    const objectURL = URL.createObjectURL(img);
    preVis.src = objectURL;
})
document.getElementById('input-img8').addEventListener('change', (e)=>{
    let preVis = document.getElementById('8');
    console.log(e.target.files);
    if(e.target.length == 0){
        preVis.src = '';
        return;
    }
    let img = e.target.files[0];
    preVis.classList.add('zoom')
    const objectURL = URL.createObjectURL(img);
    console.log(objectURL)
    preVis.src = objectURL;
})

const subirImagenes = async () =>{
    let imgA = document.getElementById('input-imgA'),
    img1 = document.getElementById('input-img1'),
    img2 = document.getElementById('input-img2'),
    img3 = document.getElementById('input-img3'),
    img4 = document.getElementById('input-img4'),
    img5 = document.getElementById('input-img5'),
    img6 = document.getElementById('input-img6'),
    img7 = document.getElementById('input-img7'),
    img8 = document.getElementById('input-img8');
    let idPrueba;

    db.collection("imagenesPruebas").add({
        img1:"",
        img2:"",
        img3:"",
        img4:"",
        img5:"",
        img6:"",
        img7:"",
        img8:"",
        imgA:""
    }).then(docRef =>{
        idPrueba = docRef.id;
    });


    let refA = defaultStorage.ref(idPrueba+'/'+imgA.name),
        ref1 = defaultStorage.ref(idPrueba+'/'+img1.name),
        ref2 = defaultStorage.ref(idPrueba+'/'+img2.name),
        ref3 = defaultStorage.ref(idPrueba+'/'+img3.name),
        ref4 = defaultStorage.ref(idPrueba+'/'+img4.name),
        ref5 = defaultStorage.ref(idPrueba+'/'+img5.name),
        ref6 = defaultStorage.ref(idPrueba+'/'+img6.name),
        ref7 = defaultStorage.ref(idPrueba+'/'+img7.name),
        ref8 = defaultStorage.ref(idPrueba+'/'+img8.name);

    // let imgRoute = ref.child('hola/'+e.target.files[0].name);

    let uploadTaskA = await refA.put(imgA.files[0]),
        uploadTask1 = await ref1.put(img1.files[0]),
        uploadTask2 = await ref2.put(img2.files[0]),
        uploadTask3 = await ref3.put(img3.files[0]),
        uploadTask4 = await ref4.put(img4.files[0]),
        uploadTask5 = await ref5.put(img5.files[0]),
        uploadTask6 = await ref6.put(img6.files[0]),
        uploadTask7 = await ref7.put(img7.files[0]),
        uploadTask8 = await ref8.put(img8.files[0]);

    let urls = [];
    uploadTaskA.on('state-changed', (snapshot) =>{
    }, (error) => {
        console.log(error)
    }, ()=>{
        refA.getDownloadURL().then((url) =>{
          urls.append(url);
        });
    });

    uploadTask1.on('state-changed', (snapshot) =>{
    }, (error) => {
        console.log(error)
    }, ()=>{
        ref1.getDownloadURL().then((url) =>{
          urls.append(url);
        });
    });

    uploadTask2.on('state-changed', (snapshot) =>{
    }, (error) => {
        console.log(error)
    }, ()=>{
        ref2.getDownloadURL().then((url) =>{
          urls.append(url);
        });
    });

    uploadTask3.on('state-changed', (snapshot) =>{
    }, (error) => {
        console.log(error)
    }, ()=>{
        ref3.getDownloadURL().then((url) =>{
          urls.append(url);
        });
    });

    uploadTask4.on('state-changed', (snapshot) =>{
    }, (error) => {
        console.log(error)
    }, ()=>{
        ref4.getDownloadURL().then((url) =>{
          urls.append(url);
        });
    });

    uploadTask5.on('state-changed', (snapshot) =>{
    }, (error) => {
        console.log(error)
    }, ()=>{
        ref5.getDownloadURL().then((url) =>{
          urls.append(url);
        });
    });

    uploadTask6.on('state-changed', (snapshot) =>{
    }, (error) => {
        console.log(error)
    }, ()=>{
        ref6.getDownloadURL().then((url) =>{
          urls.append(url);
        });
    });

    uploadTask7.on('state-changed', (snapshot) =>{
    }, (error) => {
        console.log(error)
    }, ()=>{
        ref7.getDownloadURL().then((url) =>{
          urls.append(url);
        });
    });

    uploadTask8.on('state-changed', (snapshot) =>{
    }, (error) => {
        console.log(error)
    }, ()=>{
        ref8.getDownloadURL().then((url) =>{
          urls.append(url);
        });
    });


    console.log(urls)
}