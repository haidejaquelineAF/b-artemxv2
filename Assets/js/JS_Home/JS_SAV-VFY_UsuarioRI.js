/*------API PARA OBTENER PAÍSES, ESTADOS T CIUDADES-----------------------------------*/
    var config = {
        cUrl:'https://api.countrystatecity.in/v1/countries',
        ckey: 'UXZoN0t1cEJJUUg1aEJuMWMxNXlGSVE2OWtkQlRMTjVyTFo4cUZyTQ=='
    }
    var countrySelect = document.querySelector('.country'),
        stateSelect = document.querySelector('.state'),
        citySelect = document.querySelector('.city');

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

        stateSelect.disabled = true
        citySelect.disabled = true
        stateSelect.style.pointerEvents = 'none'
        citySelect.style.pointerEvents = 'none'
    }
    function cargarEstados(){
        stateSelect.disabled = false
        citySelect.disabled = true
        stateSelect.style.pointerEvents = 'auto'
        citySelect.style.pointerEvents = 'none'

        const selectedCountryCode = countrySelect.value
        //console.log(selectedCountryCode);
        stateSelect.innerHTML = '<option value=""></option>'//para eliminar la existencia de los estados
        citySelect.innerHTML = '<option value=""></option>'
        
        fetch(`${config.cUrl}/${selectedCountryCode}/states`, {headers: {"X-CSCAPI-KEY": config.ckey}})
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            data.forEach(state => {
                const option = document.createElement('option')
                option.value = state.iso2
                option.textContent = state.name
                stateSelect.appendChild(option)
            })
        })
        .catch(error => console.error('Error al cargar países'))
    }
    function cargarCiudades(){
        citySelect.disabled = false
        citySelect.style.pointerEvents = 'auto'

        const selectedCountryCode = countrySelect.value
        const selectedStateCode = stateSelect.value
        //console.log(selectedCountryCode, selectedStateCode);

        citySelect.innerHTML = '<option value=""><option>' //Limpiar la exostencia de las opciones de ciudades

        fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, {headers: {"X-CSCAPI-KEY": config.ckey}})
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            data.forEach(city => {
                const option = document.createElement('option')
                option.value = city.iso2
                option.textContent = city.name
                citySelect.appendChild(option)
            })
        })
    }
    window.onload = cargarPaises

/*------VALIDAR CAMPOS----------------------------------------------------------------*/
        function valCorreo(correo){
            return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$/.test(correo);
        }
        function valNombre(nombre){
            return /^[a-zA-ZÃ-Ã¿\s]{1,40}$/.test(nombre); //Letras , espacios y acentos.
        }
        function valTelefono(telefono){
            return /^(\d{10})$/.test(telefono);
        }
        function valCodPostal(codpostal){
            return /^(\d{5})$/.test(codpostal);
        }
        function valRFC(rfc){
            return /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?/.test(rfc);
        }

/*------REGISTRO DE USUARIO------------------------------------------------------------*/
        function namepaisestadocd(){
            select = document.getElementById("selectpais");
            var options = select.getElementsByTagName("option"); //Regresa un arrego con todos los options del select
            var optionHTML = options[select.selectedIndex].innerHTML;  //Regresa el innetHTML de la opción que se seleccionó

            select2 = document.getElementById("selectestado");
            var options2 = select2.getElementsByTagName("option");
            var optionHTML2 = options2[select2.selectedIndex].innerHTML;

            select3 = document.getElementById("selectcd");
            var options3 = select3.getElementsByTagName("option");
            var optionHTML3 = options3[select3.selectedIndex].innerHTML;

            document.getElementById('pais_region_ru').value = optionHTML;
            document.getElementById('estado_region_ru').value = optionHTML2;
            document.getElementById('cd_munici_ru').value = optionHTML3;
        }
        function valFNacimiento(fnacimiento){
            //Validar fecha de nacimiento (sea mayor de edad)
            let fechaActual = new Date();
            let a_Actual = fechaActual.getFullYear();
            let m_Actual = fechaActual.getMonth()+1;
            let d_Actual = fechaActual.getDate();

            let fechaNacimiento = new Date(fnacimiento);
            let a_nacimiento = fechaNacimiento.getFullYear();
            let m_nacimiento = fechaNacimiento.getMonth()+1;
            let d_nacimiento = fechaNacimiento.getDate()+1;

            let edad_estimada = a_Actual-a_nacimiento;
            let mes_faltan = m_nacimiento - m_Actual;
            let dias_faltan = d_nacimiento - d_Actual;
            let edad_real = 0;
            let autorizado = "No";
            if(mes_faltan > 0){
                edad_real = edad_estimada - 1;
            }
            else if(mes_faltan == 0){
                if(dias_faltan > 0){
                    edad_real = edad_estimada - 1;
                    console.log("entro");
                }else{
                    console.log("entro al else");
                    edad_real = edad_estimada;
                }
            }
            else{
                edad_real = edad_estimada;
            }

            if(edad_real >= 18 && edad_real < 100){
                autorizado = "Si"
            }
            return autorizado;

        }
        function fechaActual(){
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
            let fechaActualI = a_Actual+"-"+m_Actual+"-"+d_Actual;
            document.getElementById('fecharegistro_ru').value = fechaActualI;
        }
        function registrarUser(e) {
            e.preventDefault();
            document.getElementById("btnRegistro").classList.add("d-none");
    
            //Obtener la fecha actual y asignarle valor al input correspondiente en caso de posibilidad de mostrarlo 
            fechaActual();
            //Obtener el nombre del país, estado o ciudad que seleccionó
            namepaisestadocd();

            const nombre_ru = document.getElementById("nombre_ru");
            const rfc_ru = document.getElementById("rfc_ru"); 
            const appaterno_ru = document.getElementById("appaterno_ru");
            const apmaterno_ru = document.getElementById("apmaterno_ru");
            const correo_ru = document.getElementById("correo_ru");
            const fnacimiento_ru = document.getElementById("fnacimiento_ru");
            const telefono_ru = document.getElementById("telefono_ru");
            const pais_region_ru = document.getElementById("pais_region_ru");
            const estado_region_ru = document.getElementById("estado_region_ru");
            const cd_munici_ru = document.getElementById("cd_munici_ru");
            const direccion_ru = document.getElementById("direccion_ru");
            const codpostal_ru = document.getElementById("codpostal_ru");
            const termscond_ru = document.getElementById("termscond_ru");
            const fecharegistro_ru = document.getElementById("fecharegistro_ru");

            //valFNacimiento(fnacimiento_ru.value);
            if(fecharegistro_ru.value==""){
                alert("Error al obtener fecha de registro, intente más tarde");
            }
            else if(nombre_ru.value =="" || appaterno_ru.value == "" || apmaterno_ru.value=="" || correo_ru.value == "" || fnacimiento_ru.value == ""
                || telefono_ru.value == "" || pais_region_ru.value == "" || estado_region_ru.value == "" || cd_munici_ru.value == "" || direccion_ru.value == ""
                || codpostal_ru.value == ""){//verificar que todos los campos obligatorios estén completos
                    removeClassInput();

                    if(nombre_ru.value == ""){
                        document.getElementById("alerta1").innerHTML = "";
                        document.getElementById("nombre_ru").classList.add("is-invalid");
                    }
                    if(appaterno_ru.value == ""){
                        document.getElementById("alerta3").innerHTML = "";
                        document.getElementById("appaterno_ru").classList.add("is-invalid");
                    }
                    if(apmaterno_ru.value == ""){
                        document.getElementById("alerta4").innerHTML = "";
                        document.getElementById("apmaterno_ru").classList.add("is-invalid");
                    }
                    if(correo_ru.value == ""){
                        document.getElementById("alerta5").innerHTML = "";
                        document.getElementById("correo_ru").classList.add("is-invalid");
                    }
                    if(fnacimiento_ru.value == ""){
                        document.getElementById("alerta6").innerHTML = "";
                        document.getElementById("fnacimiento_ru").classList.add("is-invalid");
                    }
                    if(telefono_ru.value == ""){
                        document.getElementById("alerta7").innerHTML = "";
                        document.getElementById("telefono_ru").classList.add("is-invalid");
                    }
                    if(pais_region_ru.value == ""){
                        document.getElementById("selectpais").classList.add("border-danger");
                        document.getElementById("pais_region_ru").classList.add("is-invalid");
                    }
                    if(estado_region_ru.value == ""){
                        document.getElementById("selectestado").classList.add("border-danger");
                        document.getElementById("estado_region_ru").classList.add("is-invalid");
                    }
                    if(cd_munici_ru.value == ""){
                        document.getElementById("selectcd").classList.add("border-danger");
                        document.getElementById("cd_munici_ru").classList.add("is-invalid");
                    }
                    if(direccion_ru.value == ""){
                        document.getElementById("direccion_ru").classList.add("is-invalid");
                    }
                    if(codpostal_ru.value == ""){
                        document.getElementById("alerta12").innerHTML = "";
                        document.getElementById("codpostal_ru").classList.add("is-invalid");
                    }
                    alert("Completar todos los campos");
            }
            else if(!valNombre(nombre_ru.value.trim()) || !valNombre(appaterno_ru.value.trim())|| !valNombre(apmaterno_ru.value.trim())|| !valCorreo(correo_ru.value.trim()) || valFNacimiento(fnacimiento_ru.value) != "Si"||
                !valTelefono(telefono_ru.value.trim()) || !valCodPostal(codpostal_ru.value.trim()) || !termscond_ru.checked){
                    removeClassInput();

                    alert("¡ERROR! Favor de verificar su información");
                    if(!valNombre(nombre_ru.value.trim())){
                        document.getElementById("nombre_ru").value="";
                        document.getElementById("alerta1").innerHTML = "Inválido, vuelva a ingresar su nombre";
                        document.getElementById("nombre_ru").classList.add("is-invalid");
                    }
                    if(!valNombre(appaterno_ru.value.trim())){
                        document.getElementById("appaterno_ru").value="";
                        document.getElementById("alerta3").innerHTML = "Inválido, vuelva a ingresar su apellido";
                        document.getElementById("appaterno_ru").classList.add("is-invalid");
                    }
                    if(!valNombre(apmaterno_ru.value.trim())){
                        document.getElementById("apmaterno_ru").value="";
                        document.getElementById("alerta4").innerHTML = "Inválido, vuelva a ingresar su apellido";
                        document.getElementById("apmaterno_ru").classList.add("is-invalid");
                    }
                    if(!valCorreo(correo_ru.value.trim())){
                        document.getElementById("correo_ru").value="";
                        document.getElementById("alerta5").innerHTML = "Inválido, vuelva a ingresar su correo";
                        document.getElementById("correo_ru").classList.add("is-invalid");
                    }
                    if(valFNacimiento(fnacimiento_ru.value) != "Si"){
                        document.getElementById("fnacimiento_ru").value="";
                        document.getElementById("alerta6").innerHTML = "Debe ser mayor de edad";
                        document.getElementById("fnacimiento_ru").classList.add("is-invalid");
                    }
                    if(!valTelefono(telefono_ru.value.trim())){
                        document.getElementById("telefono_ru").value="";
                        document.getElementById("alerta7").innerHTML = "Inválido, vuelva a ingresar su teléfono";
                        document.getElementById("telefono_ru").classList.add("is-invalid");
                    }
                    if(!valCodPostal(codpostal_ru.value.trim())){
                        document.getElementById("codpostal_ru").value="";
                        document.getElementById("alerta12").innerHTML = "Inválido, vuelva a ingresar su CP";
                        document.getElementById("codpostal_ru").classList.add("is-invalid");
                    }
                    if(!termscond_ru.checked){
                        document.getElementById("termscond_ru").classList.add("is-invalid");
                    }
            }
            else{
                removeClassInput();
                Swal.fire({
                    title: "El sistema se encuentra en mantenimiento.",
                    text: "Por el momento no es posible realizar esta acción. Por favor, intente más tarde.",
                    imageUrl: "https://haidejaquelineaf.github.io/b-artemxv1/Assets/img/ImgsIconos/icon_conoBuild.png",
                    imageWidth: 250,
                    imageHeight: 250,
                    confirmButtonColor: "#f89815",
                    confirmButtonText: "Regresar"
                  });
            }
        }
 

/*------VALIDAR INICIO DE SESIÓN--------------------------------------------------------*/
        function frmLoginU(e){
            e.preventDefault();

            const correo_lgn = document.getElementById("correo_lgn");
            const pass_lgn = document.getElementById("pass_lgn");

            //console.log ("email: "+correo_lgn.value+" pass: "+pass_lgn.value);
            if(correo_lgn.value =="" || pass_lgn.value==""){
                alert("Favor de completar todos los campos");
            }else{
                if((correo_lgn.value == "haide.aguilar14@gmail.com" && pass_lgn.value=="123Haide") || (correo_lgn.value=="gsalmont@prodigy.net.mx" && pass_lgn.value=="ZacZac2141")){
                    //Entra a la página de inicio como administrador
                    window.location = "https://haidejaquelineaf.github.io/b-artemxv1/Views/Inicio/";
                }else{
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
            }
        }

/*-----LIMPIAR LOS INPUT DE CLASES DE ERRORES-------------------------------------------*/
        function removeClassInput(){
                    document.getElementById("nombre_ru").classList.remove("is-invalid");
                    document.getElementById("appaterno_ru").classList.remove("is-invalid");
                    document.getElementById("apmaterno_ru").classList.remove("is-invalid");
                    document.getElementById("correo_ru").classList.remove("is-invalid");
                    document.getElementById("fnacimiento_ru").classList.remove("is-invalid");
                    document.getElementById("telefono_ru").classList.remove("is-invalid");
                    document.getElementById("selectpais").classList.remove("border-danger");
                    document.getElementById("pais_region_ru").classList.remove("is-invalid");
                    document.getElementById("selectestado").classList.remove("border-danger");
                    document.getElementById("estado_region_ru").classList.remove("is-invalid");
                    document.getElementById("selectcd").classList.remove("border-danger");
                    document.getElementById("cd_munici_ru").classList.remove("is-invalid");
                    document.getElementById("direccion_ru").classList.remove("is-invalid");
                    document.getElementById("codpostal_ru").classList.remove("is-invalid");
                    document.getElementById("termscond_ru").classList.remove("is-invalid");
        }
