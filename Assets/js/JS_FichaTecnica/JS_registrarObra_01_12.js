new DataTable('table.display');

/*------VALIDAR CAMPOS FICHA TÉCNICA-------------------------------------------------------------*/
        function valDimPeso(val){
            //Validar Peso
            return  /^[0-9]*\.?[0-9]*$/.test(val);
        }
        function valDimAncho(val){
            let valido = "SI";
            if(val != ""){//puede ir vacío, pero si no está vacío verificamos que sean solo números
                if(!valDimPeso(dimAncho_obra.value.trim())){
                    valido="NO";
                }
            }
            return valido;
        }
        function valSerie(valser){
            //Validar serie
            return  /^[0-9]+[/][0-9]+$/.test(valser);
        }
        function valFormatoSerie(x){
            let valSer = "SI";
            if(x != ""){
                if(!valSerie(x.trim())){
                    valSer = "NO";
                    document.getElementById("alertaSer").innerHTML = "Debe separar con / y solo números";
                }else{
                    let arrSerie = x.split('/');

                    if(parseInt(arrSerie[0]) > parseInt(arrSerie[1])){
                        valSer = "NO";
                        document.getElementById("alertaSer").innerHTML = "El no. de litografía no puede ser mayor al total";
                    }
                }
            }
            return valSer;
        }
        function valYear(yearejec){
            return  /^(\d{4})$/.test(yearejec);
        }
        function valFejecucion(fechaej){
            let validarFE = "SI";
            let fActual = new Date();
            let aActual = fActual.getFullYear();

            if(!valYear(fechaej.trim())){
                //Si el añi de ejecucion son letras o es un numero diferente a 4 cifras
                validarFE = "NO"
                document.getElementById("alertafe").innerHTML = "Inválido, ingrese el año nuevamente";
            }else{
                if(fechaej > aActual){
                    //Si el año de ejecución es mayor al año actual no es válido
                    validarFE = "NO";
                    document.getElementById("alertafe").innerHTML = "Inválido, no puede ser un año mayor actual";
                }
            }
            

            return validarFE;
        }
        function frmSoliFichaTecnica(){/*Fecha en que se hace el registro (la obtuve así en caso de mostrarla en el formulario)--*/
            //Establecer la fecha actual que pasaría a ser la fecha en que se realiza el registro
            let fechaActual = new Date();
            let a_Actual = fechaActual.getFullYear();
            let m_Actual = fechaActual.getMonth()+1;
            let d_Actual = fechaActual.getDate();

            if(m_Actual<10){
                m_Actual="0"+m_Actual;
            }
            if(d_Actual<10){
                d_Actual="0"+d_Actual;
            }
            let fechaActualC = a_Actual+"-"+m_Actual+"-"+d_Actual;
            document.getElementById('fsolicitud_ficha').value = fechaActualC;
        }
        function selectMultipleTecnicas(){/*Verificar que no seleccione más de 3 técnicas--------*/
            let valSelectT = "NO";
            document.getElementById('tecnicaa_obra').value = "";
            document.getElementById('tecnica1_obra').value = "";
            document.getElementById('tecnica2_obra').value = "";
            document.getElementById('tecnica3_obra').value = "";

            let text = $('#tecnica_obra option:selected').toArray().map(item => item.text).join();  
            if(text != ""){
                let arr = text.split(',');
                if(arr.length <= 3){
                    valSelectT = "SI";
                    document.getElementById('tecnicaa_obra').value = text;
                    document.getElementById('tecnica1_obra').value = arr[0];
                    if(arr.length >= 2){
                        document.getElementById('tecnica2_obra').value = arr[1];
                    }
                    if(arr.length == 3){
                        document.getElementById('tecnica3_obra').value = arr[2];
                    }
                }
            }
            return valSelectT;
        }
        function selectMultipleColores(){/*Verificar que no seleccione más de 3 técnicas--------*/
            let valSelect = "NO";
            document.getElementById('coloress_obra').value = "";

            let textColores = $('#colores_obra option:selected').toArray().map(item => item.text).join();  
            if(textColores != ""){
                let arrColores = textColores.split(',');
                if(arrColores.length <= 5){
                    document.getElementById('coloress_obra').value = textColores;
                    valSelect = "SI";
                }
            }
            return valSelect;
        }
        function valDoc(sizeDoc){
            let valDoc = "SI";

            if(sizeDoc>2097152){
                valDoc = "NO";
            }
            return valDoc;
        }
    /**/
        function validarCampos(){
            let camposval="NO";
            frmSoliFichaTecnica();

            const fsolicitud_ficha = document.getElementById("fsolicitud_ficha");
            const idUser = document.getElementById("idUser");
            const idAutor = document.getElementById("idAutor");
            const serie_obra = document.getElementById("serie_obra");
            const titulo_obra = document.getElementById("titulo_obra");
            const originalidad_obra = document.getElementById("originalidad_obra");
            const colores_obra = document.getElementById("colores_obra");
            const tecnica_obra = document.getElementById("tecnica_obra");
            const orientacion_obra = document.getElementById("orientacion_obra");
            const dimAlto_obra = document.getElementById("dimAlto_obra");
            const dimAncho_obra = document.getElementById("dimAncho_obra");
            const dimLargo_obra = document.getElementById("dimLargo_obra");
            const peso_obra = document.getElementById("peso_obra");
            const materiales_obra = document.getElementById("materiales_obra");
            const enmarcado_obra = document.getElementById("enmarcado_obra");
            const descripcion_obra = document.getElementById("descripcion_obra");
            const descripcion_tecnica_obra = document.getElementById("descripcion_tecnica_obra");
            const estilo_obra = document.getElementById("estilo_obra");
            const tema_obra = document.getElementById("tema_obra");
            const categoria_obra = document.getElementById("categoria_obra"); 
            const fejecucion_obra = document.getElementById("fejecucion_obra");
            const imagenObra = document.getElementById("imagenObra");
            const certificado_autenticidad = document.getElementById('certificaciones_autenticidad_obra');
            const factura_fiscal = document.getElementById('factura_fiscal_obra');


            if(fsolicitud_ficha == "" || idUser.value == "" || idAutor.value == ""){
                alert("Ocurrió un error para obtener alguno de los datos predefinidos");
            }
            else if(titulo_obra.value=="" || originalidad_obra.value == "" || colores_obra.value == "" || tecnica_obra.value == "" || orientacion_obra.value == "" || dimAlto_obra.value == "" ||
                    dimLargo_obra.value=="" || peso_obra.value==""|| materiales_obra.value =="" || enmarcado_obra.value=="" || descripcion_obra.value=="" || factura_fiscal.value==""||
                    descripcion_tecnica_obra.value=="" || estilo_obra.value=="" || tema_obra.value=="" || categoria_obra.value=="" || fejecucion_obra.value=="" || imagenObra.value=="" || certificado_autenticidad.value==""
                ){
                    alert("Favor de completar todos campos obligatorios *");
            }
            else {
                let sizeDocCert= document.getElementById("certificaciones_autenticidad_obra").files[0].size;
                let sizeDocFact= document.getElementById("factura_fiscal_obra").files[0].size;
                if(!valDimPeso(dimAlto_obra.value.trim()) || valDimAncho(dimAncho_obra.value) == "NO" || !valDimPeso(dimLargo_obra.value.trim()) || valFormatoSerie(serie_obra.value) == "NO" ||
                    valFejecucion(fejecucion_obra.value) != "SI" || !valDimPeso(peso_obra.value.trim()) || selectMultipleTecnicas()=="NO" || selectMultipleColores()=="NO" || valDoc(sizeDocCert) == "NO" || valDoc(sizeDocFact) == "NO"){
                        alert("Datos incorrectos, favor de verificarlos");
                        if(!valDimPeso(dimAlto_obra.value.trim())){
                            document.getElementById("dimAlto_obra").classList.add("is-invalid");
                            document.getElementById("dimAlto_obra").value="";
                            document.getElementById("alertaDAl").innerHTML = "Inválido, ingrese un valor numérico";
                        }
                        if(valDimAncho(dimAncho_obra.value) == "NO"){
                            document.getElementById("dimAncho_obra").classList.add("is-invalid");
                            document.getElementById("dimAncho_obra").value="";
                            document.getElementById("alertaDAn").innerHTML = "Inválido, ingrese un valor numérico";
                        }
                        if(!valDimPeso(dimLargo_obra.value.trim())){
                            document.getElementById("dimLargo_obra").classList.add("is-invalid");
                            document.getElementById("dimLargo_obra").value="";
                            document.getElementById("alertaDlg").innerHTML = "Inválido, ingrese un valor numérico";
                        }
                        if(!valDimPeso(peso_obra.value.trim())){
                            document.getElementById("peso_obra").classList.add("is-invalid");
                            document.getElementById("peso_obra").value="";
                            document.getElementById("alertaPeso").innerHTML = "Inválido, ingrese un valor numérico";
                        }
                        if(valFejecucion(fejecucion_obra.value) != "SI"){
                            document.getElementById("fejecucion_obra").value="";
                            document.getElementById("fejecucion_obra").classList.add("is-invalid");
                        }
                        if(valFormatoSerie(serie_obra.value) == "NO"){
                            document.getElementById("serie_obra").value="";
                            document.getElementById("serie_obra").classList.add("is-invalid");
                        }
                        if(selectMultipleTecnicas() == "NO"){
                            document.getElementById("tecnica_obra").classList.add("is-invalid");
                            document.getElementById("alertaTnc").innerHTML = "No puede seleccionar más de 3 técnicas";
                        }
                        if(selectMultipleColores() == "NO"){
                            document.getElementById("colores_obra").classList.add("is-invalid");
                            document.getElementById("alertaCol").innerHTML = "No puede seleccionar más de 5 colores";
                        }
                        if(valDoc(sizeDocCert) == "NO"){
                            $("#certificaciones_autenticidad_obra").val("");
                            $("#certificaciones_autenticidad_obra").html("");
                            document.getElementById("alertaCer").innerHTML = "* El archivo debe pesar menos de 2MB";
                            document.getElementById("certificaciones_autenticidad_obra").classList.add("is-invalid");
                        }
                        if(valDoc(sizeDocFact) == "NO"){
                            $("#factura_fiscal_obra").val("");
                            $("#factura_fiscal_obra").html("");
                            document.getElementById("alertaFac").innerHTML = "* El archivo debe pesar menos de 2MB";
                            document.getElementById("factura_fiscal_obra").classList.add("is-invalid");
                        }
                }else{
                    camposval = "SI";
                }
            }
            return camposval;
        }
        function limpiarCampos(){
            document.getElementById("titulo_obra").classList.remove("is-invalid");
            document.getElementById("originalidad_obra").classList.remove("is-invalid");
            document.getElementById("tecnica_obra").classList.remove("is-invalid");
            document.getElementById("orientacion_obra").classList.remove("is-invalid");
            document.getElementById("dimAlto_obra").classList.remove("is-invalid");
            document.getElementById("dimAncho_obra").classList.remove("is-invalid");
            document.getElementById("dimLargo_obra").classList.remove("is-invalid");
            document.getElementById("peso_obra").classList.remove("is-invalid");
            document.getElementById("materiales_obra").classList.remove("is-invalid");
            document.getElementById("enmarcado_obra").classList.remove("is-invalid");
            document.getElementById("descripcion_obra").classList.remove("is-invalid");
            document.getElementById("descripcion_tecnica_obra").classList.remove("is-invalid");
            document.getElementById("estilo_obra").classList.remove("is-invalid");
            document.getElementById("tema_obra").classList.remove("is-invalid");
            document.getElementById("categoria_obra").classList.remove("is-invalid");
            document.getElementById("fejecucion_obra").classList.remove("is-invalid");
            document.getElementById("serie_obra").classList.remove("is-invalid");
            document.getElementById("certificaciones_autenticidad_obra").classList.remove("is-invalid");
            document.getElementById("factura_fiscal_obra").classList.remove("is-invalid");

            document.getElementById("alertaDAl").innerHTML = "";
            document.getElementById("alertaDAn").innerHTML = "";
            document.getElementById("alertafe").innerHTML = "";
            document.getElementById("alertaTnc").innerHTML = "";
            document.getElementById("alertaCol").innerHTML = "";
            document.getElementById("alertaSer").innerHTML = "";
            document.getElementById("alertaCer").innerHTML = "";
            document.getElementById("alertaFac").innerHTML = "";
        }

/*------REGISTRO DE LA OBRA PARA FICHA TÉCNICA--------------------------------------------------*/
function solicitudFichaT(e){
    e.preventDefault();
    limpiarCampos();

    if(validarCampos() == "SI"){
        Swal.fire({
            title: "El sistema se encuentra en fase de interconexión con nodos informáticos",
            text: "En breve estará en fase operativa.",
            imageUrl: "https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_conoBuild.png",
            imageWidth: 250,
            imageHeight: 250,
            confirmButtonColor: "#f89815",
            confirmButtonText: "Regresar"
          });
        document.getElementById("frmSlFichaTecnica").reset();
    }
  
}
/*------CARGAR Y/O ACCIONES RESPECTO A LA IMAGEN DE LA OBRA-------------------------------------*/
function previewObra(e){
    let fileInput = document.getElementById('imagenObra');
    let filePath = fileInput.value;
    let allowedExtensions = /(.jpg|.png|.PNG|.JPG)$/i;
    let sizeCV= document.getElementById("imagenObra").files[0].size;
    if(!allowedExtensions.exec(filePath)){
        alert('¡ERROR! Únicamente se permiten archivos .jpg / .png');
        fileInput.value = '';
        document.getElementById("contimg").classList.add("border-danger");
    }else if(sizeCV>2097152){
        alert("¡ERROR! El archivo debe pesar más de 2MB");
        $("#imagenObra").val("");
        $("#imagenObra").html("");
        document.getElementById("contimg").classList.add("border-danger");
    }else{
        document.getElementById("contimg").classList.remove("border-danger");
        //Image preview
        //console.log(e.target.files);//verificar la imagen seleccionada
        const url = e.target.files[0];
        const urlTmp = URL.createObjectURL(url);

        //Agregar previsualizacion
        
        document.getElementById("imgObra-preview").src = urlTmp;
        //Ocultar el que pueda seleccionar otra imagen
        document.getElementById("icon-image").classList.add("d-none");
        //Mostrar para que pueda cancelar imagen
        document.getElementById("icon-cerrar").innerHTML = `
        <button class="btn btn-danger rounded-0 px-2 pt-1 pb-2" onclick="deleteImgObra()"><img class="icons-fichat" src="https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_trash.png"></button>
        ${url['name']}`;
    }
    
}   
function deleteImgObra(){
    document.getElementById("icon-cerrar").innerHTML = ''; //Limpiar
    document.getElementById("icon-image").classList.remove("d-none"); //Agregar el otro ícono
    document.getElementById("imgObra-preview").src = '';//Quitar la vista previa de la imagenObra
    document.getElementById("imagenObra").value = '';//Limpiar la inf de la imagen
    //Limpiar el input file
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


/************************************************************************************************/
/*------API PARA OBTENER PAÍSES-----------------------------------------------------------------*/
var config = {
    cUrl:'https://api.countrystatecity.in/v1/countries',
    ckey: 'UXZoN0t1cEJJUUg1aEJuMWMxNXlGSVE2OWtkQlRMTjVyTFo4cUZyTQ=='
}
var countrySelect = document.querySelector('.country');

function cargarPaises(){
    let apiEndPoint = config.cUrl

    fetch(apiEndPoint, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(Response => Response.json())
    .then(data => {
        //console.log(data);
        data.forEach(country => {
            const option = document.createElement('option')
            option.value = country.iso2
            option.textContent = country.name
            countrySelect.appendChild(option)

        });
    })
    .catch(error => console.error('Error al cargar países'));
}
window.onload = cargarPaises

/*------VALIDAR CAMPOS PARA AGREGAR AUTOR-------------------------------------------------------*/
        function valNombreAutor(nombre){
            //Validar nombres
            return /^[a-zA-ZÃ-Ã¿\s]{1,40}$/.test(nombre); //Letras , espacios y acentos.
        }
        function valFechaN(nacimientoautor){//validar el año de nacimiento y que sea mayor de edad

            let validarFN = "SI";
            let fActual = new Date();
            let aActual = fActual.getFullYear();
            //saber la edad.
            let edadautor = parseInt(aActual) - parseInt(nacimientoautor);

            if(!valYear(nacimientoautor.trim())){
                //Si el año de nacimiento son letras o es un numero diferente a 4 cifras
                validarFN = "NO"
                document.getElementById("alertaffn").innerHTML = "Inválido, ingrese el año nuevamente";
            }else{
                if(nacimientoautor > aActual){
                    //Si el año de ejecución es mayor al año actual no es válido
                    validarFN = "NO";
                    document.getElementById("alertaffn").innerHTML = "Inválido, ingrese el año nuevamente";
                }
                else if(edadautor < 18){
                    //A partir de la fecha actual, el autor no puede tener 1 año, ni 2, por lo que se establece que no sea menor de edad.
                    validarFN = "NO";
                    document.getElementById("alertaffn").innerHTML = "Inválido, el autor no puede ser menor de edad";
                }
            }

            return validarFN;
        }
        function valFechaD(decesoautor, nacimientoautor){//validar el año de deceso

            let validarFD = "SI";
            let fActual = new Date();
            let aActual = fActual.getFullYear();
            let edadautor = parseInt(decesoautor) - parseInt(nacimientoautor);
            
            if(decesoautor != ""){//Si está vacío significa que el autor sigue vivo
                if(!valYear(decesoautor.trim())){
                    //Si el añi de ejecucion son letras o es un numero diferente a 4 cifras
                    validarFD = "NO"
                    document.getElementById("alertaffd").innerHTML = "Inválido, ingrese el año nuevamente";
                }else{
                    if(decesoautor > aActual){
                        //Si el año de deceso es mayor al año actual no es válido
                        validarFD = "NO";
                        document.getElementById("alertaffd").innerHTML = "Inválido, ingrese el año nuevamente";
                    }
                    else if(parseInt(decesoautor) < parseInt(nacimientoautor) || edadautor < 10){
                        //Si el año de deceso es menor al año de nacimiento no es válido o murio antes de los 10
                        validarFD = "NO";
                        document.getElementById("alertaffd").innerHTML = "Inválido, ingrese el año nuevamente";
                    }
                }
            }

            return validarFD;
        }
    /**/
        function valCamposAutor(){
            let valcamposa = "NO";

            select = document.getElementById("nacionalidad_autor");
            let options = select.getElementsByTagName("option"); //Regresa un arrego con todos los options del select
            let optionHTML = options[select.selectedIndex].innerHTML;  //Regresa el innetHTML del option seleccionado
            document.getElementById('nacionalidadd_autor').value = optionHTML;

            const idUsuario = document.getElementById("idUsuario");
            const nombre_autor = document.getElementById("nombre_autor");
            const nacionalidad_autor = document.getElementById("nacionalidadd_autor");
            const nacimiento_autor = document.getElementById("nacimiento_autor");
            const deceso_autor = document.getElementById("deceso_autor");
            const obra_representativa_autor = document.getElementById("obra_representativa_autor");
            const descripcion_autor = document.getElementById("descripcion_autor");

            if(idUsuario.value==""){
                alert("Ocurrió un error, intente más tarde");
            }
            else if(nombre_autor.value=="" || nacionalidad_autor.value=="" || nacimiento_autor.value=="" || obra_representativa_autor.value=="" || descripcion_autor.value==""){
                alert("Favor de completar todos los campos que son obligatorios");
            }
            else if(!valNombreAutor(nombre_autor.value.trim()) || valFechaN(nacimiento_autor.value) == "NO" || valFechaD(deceso_autor.value, nacimiento_autor.value) == "NO"){
                if(!valNombreAutor(nombre_autor.value.trim())){
                    document.getElementById("nombre_autor").value="";
                    document.getElementById("alertanna").innerHTML = "Inválido, vuelva a ingresar su nombre";
                    document.getElementById("nombre_autor").classList.add("is-invalid");
                }
                if(valFechaN(nacimiento_autor.value) == "NO"){
                        document.getElementById("nacimiento_autor").classList.add("is-invalid");
                        document.getElementById("nacimiento_autor").value="";
                }
                if(valFechaD(deceso_autor.value, nacimiento_autor.value) == "NO"){
                    document.getElementById("deceso_autor").classList.add("is-invalid");
                    document.getElementById("deceso_autor").value="";
                }
            }
            else{
                valcamposa = "SI";
            }
            return valcamposa;
        }
        function limpiarCamposA(){
            document.getElementById("nombre_autor").classList.remove("is-invalid");
            document.getElementById("nacimiento_autor").classList.remove("is-invalid");
            document.getElementById("deceso_autor").classList.remove("is-invalid");

            document.getElementById("alertanna").innerHTML = "";
            document.getElementById("alertaffn").innerHTML = "";
            document.getElementById("alertaffd").innerHTML = "";
        }

/*------AGREGAR AUTOR DE OBRA------------------------------------------------------------------*/
function btnAgregarAutor(e){
    e.preventDefault();
    limpiarCamposA();

    if(valCamposAutor() == "SI"){
        

        Swal.fire({
            title: "El sistema se encuentra en fase de interconexión con nodos informáticos",
            text: "En breve estará en fase operativa.",
            imageUrl: "https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_conoBuild.png",
            imageWidth: 250,
            imageHeight: 250,
            confirmButtonColor: "#f89815",
            confirmButtonText: "Regresar"
          });
          document.getElementById("frmAgregarAutorFichaTecnica").reset();
        
    }
}

