const alerta = (titulo,mensaje, tipo, tiempo=1500) =>{
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: tipo,
        showConfirmButton: false,
        timer: tiempo
      })  
}

const eliminarRegistro = (id) =>{
    Swal.fire({
        title: '¿Estás seguro que quieres eliminar este registro?',
        text: "La acción no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            borrarRegistro(id);
        }
      })
}

const eliminarRegistroEspecialista = (id) =>{
  Swal.fire({
      title: '¿Estás seguro que quieres eliminar este registro?',
      text: "La acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
          confirmaEspecialista(id);
          // borrarRegistro(id);
      }
    })
}

const confirmaEspecialista = (id) =>{
  nombres = dataEspecialistas.map(e =>(e.nombre+" "+e.apellidoPaterno+" "+e.apellidoMaterno))
  console.log(dataEspecialistas,nombres, idEspecialistas)
  opciones ={}
  for(let i=0;i<idEspecialistas.length;i++){
    if(idEspecialistas[i] != id)
      opciones[idEspecialistas[i]]=nombres[i]
  }
  console.log(opciones)
  Swal.fire({
    title: 'Selecciona un especialista',
    text: "Para reasignarle los pacientes del especialista a eliminar",
    icon: 'info',
    input: 'select',
    inputOptions: opciones,
    showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
        borrarRegistroEspecialista(result.value, id);
    }
  })
}


const cargandoArchivos = () =>{
  let timerInterval
  Swal.fire({
    title: 'Cargando imagenes',
    html: 'Cargando <b></b> imagenes.',
    timer: 6000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = urls.length
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      // console.log('I was closed by the timer')
    }
  })
}

const generandoPrueba = () =>{
  let timerInterval
  Swal.fire({
    title: 'Generando PDF de la prueba',
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      // console.log('I was closed by the timer')
    }
  })
}

const salirPagina = (idPaciente) =>{
  Swal.fire({
      title: '¿Estás seguro que quieres salir de la evaluación de la prueba?',
      text: "La prueba no guardada, se perderá",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() =>{
          window.location = `agregarPrueba.html?id=${idPaciente}`
      }, 1500);
      }
    })
}