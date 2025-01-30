
function btnGuardarInfo(e){
    e.preventDefault();
    document.getElementById("contimg").classList.remove("border-danger");
    

    if( document.getElementById("desc_propia_cc").value=="" || document.getElementById("filecv_cc").value==""){
        alert("Favor de completar los campos obligatorios");
    }else{
        document.getElementById("desc_propia_cc").classList.remove("is-invalid");
        document.getElementById("filecv_cc").classList.remove("is-invalid");

        Swal.fire({
            title: "El sistema se encuentra en fase de interconexión con nodos informáticos",
            text: "En breve estará en fase operativa.",
            imageUrl: "https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_conoBuild.png",
            imageWidth: 250,
            imageHeight: 250,
            confirmButtonColor: "#f89815",
            confirmButtonText: "Regresar"
          });
        
        document.getElementById("frmActualizarMiInfo").reset();
       
        
    }  

}


function preview(e){
   var fileInput = document.getElementById('imagen');
    var filePath = fileInput.value;
    var allowedExtensions = /(.jpg|.jpeg|.png|.PNG|.JPG|.JPEG)$/i;
    var sizeCV= document.getElementById("imagen").files[0].size;
    if(!allowedExtensions.exec(filePath)){
        alert('¡ERROR! Únicamente se permiten archivos .jpeg / .jpg / .png');
        fileInput.value = '';
        document.getElementById("contimg").classList.add("border-danger");
    }else if(sizeCV>2097152){
        alert("¡ERROR! El archivo debe pesar menos de 2MB");
        $("#imagen").val("");
        $("#imagen").html("");
        document.getElementById("contimg").classList.add("border-danger");
    }else{
        document.getElementById("contimg").classList.remove("border-danger");
        //Image preview
        //console.log(e.target.files);//verificar la imagen seleccionada
        const url = e.target.files[0];
        const urlTmp = URL.createObjectURL(url);

        //Agregar previsualizacion
        
        document.getElementById("img-preview").src = urlTmp;
        //Ocultar el que pueda seleccionar otra imagen
        document.getElementById("icon-image").classList.add("d-none");
        //Mostrar para que pueda cancelar imagen
        document.getElementById("icon-cerrar").innerHTML = `
        <button class="btn btn-danger rounded-0 px-2 pt-1 pb-2" onclick="deleteImg()"><img class="icons-configcuenta" src="https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_trash.png"></button>
        ${url['name']}`;
    }
    
}

function deleteImg(){
    document.getElementById("icon-cerrar").innerHTML = ''; //Limpiar
    document.getElementById("icon-image").classList.remove("d-none"); //Agregar el otro ícono
    document.getElementById("img-preview").src = 'https://haidejaquelineaf.github.io/b-artemxv1/Files/img/FotosPerfilU/user.png';//Quitar la vista previa de la imagen
    document.getElementById("imagen").value = '';//Limpiar la inf de la imagen
    document.getElementById("foto_actual").value = '';//Limpiar la inf de la imagen
    //Limpiar el input file
}

function previewDoc(e){
    document.getElementById("desc_propia_cc").classList.remove("is-invalid");
    var fileInput = document.getElementById('filecv_cc');
    var filePath = fileInput.value;
    var allowedExtensions = /(.pdf|.PDF)$/i;
    var sizeCV= document.getElementById("filecv_cc").files[0].size;
    if(!allowedExtensions.exec(filePath)){
        alert('¡ERROR! Únicamente se permiten archivos .pdf');
        fileInput.value = '';
        document.getElementById("alerta2").innerHTML = "* únicamente se permiten archivos .pdf";
        document.getElementById("alerta2").classList.remove("d-none");
        document.getElementById("contfile").classList.add("border-danger");
    }else if(sizeCV>2097152){
        alert("¡ERROR! El archivo debe pesar menos de 2MB");
        $("#filecv_cc").val("");
        $("#filecv_cc").html("");
        document.getElementById("alerta2").innerHTML = "* El archivo debe pesar menos de 2MB";
        document.getElementById("alerta2").classList.remove("d-none");
        document.getElementById("contfile").classList.add("border-danger");
    }else{
        //Image preview
        //console.log(e.target.files);//verificar la imagen seleccionada
        document.getElementById("contfile").classList.remove("border-danger");
        document.getElementById("alerta2").classList.add("d-none");
        const url = e.target.files[0];
        const urlTmp = URL.createObjectURL(url);

        //Agregar previsualizacion
        
        document.getElementById("doc-preview").src = 'https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_pdf.png';
        //Ocultar el que pueda seleccionar otra imagen
        document.getElementById("icon-upload").classList.add("d-none");
        //Mostrar para que pueda cancelar imagen
        document.getElementById("icon-eliminar").innerHTML = `
        <button class="btn btn-danger rounded-0 px-2 pt-1 pb-2" onclick="deleteImg()"><img class="icons-configcuenta" src="https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_trash.png"></button>
        ${url['name']}`;
    }
    
}

function deleteDoc(){
    document.getElementById("icon-eliminar").innerHTML = ''; //Limpiar
    document.getElementById("icon-upload").classList.remove("d-none"); //Agregar el otro ícono
    document.getElementById("doc-preview").src = '';//Quitar la vista previa del pdf
    document.getElementById("filecv_cc").value = '';//Limpiar la inf del cv
    document.getElementById("doc_actual").value = '';//Limpiar la inf del cv
    document.getElementById("nombrecv").value = '';//Limpiar el nombre del cv
    document.getElementById("nombrecv").classList.add("d-none");//Ocultar 
    //Limpiar el input file
}