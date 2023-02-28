const alerta = (titulo,mensaje, tipo) =>{
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: tipo,
        showConfirmButton: false,
        timer: 1000
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