const img = document.getElementById("img-cropper")


let cropper = new Cropper(img, {
    aspectRatio: 1,
    viewMode: 1,
    preview: '#img-croppered',
    responsive: false
});