function btnGenerarPDF(id){

    //console.log('Mi id es= '+id);
    const url = url_raiz + "Perfil/descargarPDF";//Agregamos el controlador Registros y mandar el método registrarUser
    const frm = document.getElementById("frmPerfil");//Almacenar el id del formulario
    const http = new XMLHttpRequest();//Instancia del objeto XMLHttpRequest
    http.open("POST", url, true);//Abrir una conexion e indicar que se ejecuta de forma asíncrona con true
    http.send(new FormData(frm)); //Enviar la peticion
    //Verificar el estado
    http.onreadystatechange = function(){
        //Si el readystate =4 y el status =200 eso quiere decir que la respuesta está lista 
        //Este onreadystate se ejecuta cada vez que cambia el ready state
        if(this.readyState == 4 && this.status == 200){
            //console.log(this.responseText);
            const res = JSON.parse(this.responseText);//Parsear el mensaje
            if(res == "rvalido"){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Registro completado con éxito',
                    showConfirmButton: false,
                    timer: 3000
                  })  
                //Limpiar formulario
                frm.reset();

            }else if(res == "existe"){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Ya existe un registro con ese correo',
                    showConfirmButton: false,
                    timer: 3000
                })  
            }else{
                console.log(res);
            }
        }
    }

}



function btnDescargarPDF(id){
    //console.log('Mi iid es= '+id);
    window.location = url_raiz + "AVRusuarios/crearPDF/"+id;
    //const url = url_raiz + "Perfil/crearPDF";//Agregamos el controlador Registros y mandar el método registrarUser
}