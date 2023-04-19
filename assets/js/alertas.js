const alerta = (titulo,mensaje, tipo) =>{
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: tipo,
        showConfirmButton: false,
        timer: 1500
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