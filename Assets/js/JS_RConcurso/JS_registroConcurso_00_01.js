new DataTable('#tablaSOC');


const input = document.getElementById("card_numberc");
const expdate = document.getElementById("card_expirationc");

input.addEventListener("input", function() {
    const inputValue = this.value.replace(/\s/g, ""); //Quitar todos los espacios
    if (inputValue !== "") {
        const result = inputValue.match(/.{1,4}/g).join(" "); //Agregar un espacio cada 4 caracteres
        this.value = result;
    }
});

expdate.addEventListener("input", function() {
    const expdateValue = this.value.replace(/\s/g, ""); //Quitar todos los espacios
    if (expdateValue.match(/^\d{2}$/)  !== null) {
        const expdateresult = expdateValue+"/"; //Agregar diagonal después de los primeros 2 dígitos
        this.value = expdateresult; // Y el valor del input será la cadena modificada.
    }
});

/*----REGISTRAR UNA OBRA AL CONCURSO----------------------------------------------------------*/
        function valNumTarjeta(notarjeta){
            var a_ntarjetase = notarjeta.replace(/ /g, "");
            return /^(\d{16})$/.test(a_ntarjetase);
        }
        function valFExpiracion(fexpiracion){
            return /^(\d{2})$/.test(fexpiracion);
        }
        function valCVC(cvc){
            return /^(\d{4})$/.test(cvc);
        }
        function valNombre(nombre){
            //Validar nombres de tarjetas
            return /^[a-zA-ZÃ-Ã¿\s]{2,40}$/.test(nombre); //Letras , espacios y acentos.
        }
        function valFExp(fexpr){
            let validofexp = "NO";
            if(fexpr != ""){
                let arrfexp = fexpr.split('/'); 
                if(arrfexp[0].length == "2" && arrfexp[1].length =="2"){
                    if(valFExpiracion(arrfexp[0].trim()) || valFExpiracion(arrfexp[1].trim())){
                        validofexp = "SI";
                    }
                }
            }
            return validofexp;
        }
        function valCamposRC(){
            const a_idFTO = document.getElementById("idFTObra");
            const a_notarjeta = document.getElementById("card_numberc");
            const a_fexpiracion = document.getElementById("card_expirationc");
            const a_cvc = document.getElementById("card_cvcc");
            const a_nombre = document.getElementById("cardholder_namec");

            var camValRC = "NO";

            if(a_idFTO.value==""){
                alert("Favor de seleccionar la obra");
            }
            else if(!valNombre(a_nombre.value.trim()) || !valNumTarjeta(a_notarjeta.value.trim()) || valFExp(a_fexpiracion.value) == "NO" || !valCVC(a_cvc.value.trim()) ){
                alert("ERROR, DATOS INCORRECTOS: Favor de igresarlos nuevamente");
                if(!valNombre(a_nombre.value.trim())){
                    document.getElementById("cardholder_namec").value="";//limpiar
                    document.getElementById("cardholder_namec").classList.add("is-invalid");
                }
                if(!valNumTarjeta(a_notarjeta.value.trim())){
                    //Falta revisar que sea válido, es decir, que sí sea no de tarjeta visa o mastercard
                    document.getElementById("card_numberc").value="";//limpiar
                    document.getElementById("card_numberc").classList.add("is-invalid");
                }
                if(valFExp(a_fexpiracion.value) == "NO"){
                    //Falta revisar que los días no sean mayores a 31 y los meses mayores al 12
                    document.getElementById("card_expirationc").value="";//limpiar
                    document.getElementById("card_expirationc").classList.add("is-invalid");
                }
                if(!valCVC(a_cvc.value.trim())){
                    document.getElementById("card_cvcc").value="";//limpiar
                    document.getElementById("card_cvcc").classList.add("is-invalid");
                }
            }
            else{
                camValRC = "SI";
                document.getElementById("btnRegistroC").classList.add("d-none");
            }
            return camValRC;
        }
        function limpiarCamposRC(){
            document.getElementById("cardholder_namec").classList.remove("is-invalid");
            document.getElementById("card_numberc").classList.remove("is-invalid");
            document.getElementById("card_expirationc").classList.remove("is-invalid");
            document.getElementById("card_cvcc").classList.remove("is-invalid");
        }
        function registroConcurso(e){
            e.preventDefault();
            limpiarCamposRC();
            
            if(valCamposRC() == "SI"){
                Swal.fire({
                    title: "El sistema se encuentra en fase de interconexión con nodos informáticos",
                    text: "En breve estará en fase operativa.",
                    imageUrl: "https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_conoBuild.png",
                    imageWidth: 250,
                    imageHeight: 250,
                    confirmButtonColor: "#f89815",
                    confirmButtonText: "Regresar"
                  });
                document.getElementById("frmROConcurso").reset();
                
            }
        }

function alerta(e){
    e.preventDefault();
    Swal.fire({
        title: "El sistema se encuentra en fase de interconexión con nodos informáticos",
        text: "En breve estará en fase operativa.",
        imageUrl: "https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_conoBuild.png",
        imageWidth: 250,
        imageHeight: 250,
        confirmButtonColor: "#f89815",
        confirmButtonText: "Regresar"
      });
}

/*------CARGAR Y/O ACCIONES RESPECTO A LA IMAGEN DEL COMPROBANTE-------------------------------------*/
function previewComprbnt(e){
    let fileInput = document.getElementById('imagenComprobante');
    let filePath = fileInput.value;
    let allowedExtensions = /(.jpg|.png|.PNG|.JPG)$/i;
    let sizeCV= document.getElementById("imagenComprobante").files[0].size;
    if(!allowedExtensions.exec(filePath)){
        alert('¡ERROR! Únicamente se permiten archivos .jpg / .png');
        fileInput.value = '';
        document.getElementById("contimg").classList.add("border-danger");
    }else if(sizeCV<2097152){
        alert("¡ERROR! El archivo debe pesar menos de 2MB");
        $("#imagenComprobante").val("");
        $("#imagenComprobante").html("");
        document.getElementById("contimg").classList.add("border-danger");
    }else{
        document.getElementById("contimg").classList.remove("border-danger");
        //Image preview
        //console.log(e.target.files);//verificar la imagen seleccionada
        const url = e.target.files[0];
        const urlTmp = URL.createObjectURL(url);

        //Agregar previsualizacion
        
        document.getElementById("imgComprobante-preview").src = urlTmp;
        //Ocultar el que pueda seleccionar otra imagen
        document.getElementById("icon-image").classList.add("d-none");
        //Mostrar para que pueda cancelar imagen
        document.getElementById("icon-cerrar").innerHTML = `
        <button class="btn btn-danger rounded-0 px-2 pt-1 pb-2" onclick="deleteImgComprbnt()"><img class="icons-fichat" src="https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_trash.png"></button>
        ${url['name']}`;
    }
    
}   
function deleteImgComprbnt(){
    document.getElementById("icon-cerrar").innerHTML = ''; //Limpiar
    document.getElementById("icon-image").classList.remove("d-none"); //Agregar el otro ícono
    document.getElementById("imgComprobante-preview").src = '';//Quitar la vista previa de la imagenObra
    document.getElementById("imagenComprobante").value = '';//Limpiar la inf de la imagen
    //Limpiar el input file
}