window.addEventListener('load', async () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let idPaciente = urlParams.get('id');
    let paciente;

    await db.collection("pacientes")
    .where(firebase.firestore.FieldPath.documentId(),'==',idPaciente)
    .get()
    .then(querySnapshot =>{
        querySnapshot.forEach(doc =>{
            paciente = doc.data();
        })
    })
  
    document.getElementById('titulo').innerHTML = `Consultar pruebas de ${paciente.nombre} ${paciente.apellidoPaterno}`;
})

const agregarPruebas = () =>{
    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    let idPaciente = urlParams.get('id');
    let paciente;

    window.location = `agregarPrueba.html?id=${idPaciente}`
}