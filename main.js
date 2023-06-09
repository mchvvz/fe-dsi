class PantallaRespuestaOperador {
    constructor(nombreCliente, categoriaLlamada, opcionLlamada, subOpcionLlamada, validacionList, respuestasCliente,descripcionAccionSeleccionada,boolConfirmacion) {
      this.nombreCliente = nombreCliente;
      this.categoriaLlamada = categoriaLlamada;
      this.opcionLlamada = opcionLlamada;
      this.subOpcionLlamada = subOpcionLlamada;
      this.validacionesSubopcion = validacionList;
      this.respuestasCliente = respuestasCliente;
      this.descripcionAccionSeleccionada = descripcionAccionSeleccionada;
      this.boolConfirmacion = boolConfirmacion;
    }
    // getters
    getNombreCliente() {
      return this.nombreCliente;
    }
  
    getCategoriaLlamada() {
      return this.categoriaLlamada;
    }
  
    getOpcionLlamada() {
      return this.opcionLlamada;
    }
  
    getSubOpcionLlamada() {
      return this.subOpcionLlamada;
    }
  
    getValidacionesSubopcion() {
      return this.validacionesSubopcion;
    }
  
    getRespuestasCliente() {
      return this.respuestasCliente;
    }
  
    getDescripcionAccionSeleccionada() {
      return this.descripcionAccionSeleccionada;
    }
  
    getBoolConfirmacion() {
      return this.boolConfirmacion;
    }

    //setters
    setNombreCliente(nombreCliente) {
      this.nombreCliente = nombreCliente;
    }
  
    setCategoriaLlamada(categoriaLlamada) {
      this.categoriaLlamada = categoriaLlamada;
    }
  
    setOpcionLlamada(opcionLlamada) {
      this.opcionLlamada = opcionLlamada;
    }
  
    setSubOpcionLlamada(subOpcionLlamada) {
      this.subOpcionLlamada = subOpcionLlamada;
    }
  
    setValidacionesSubopcion(validacionesSubopcion) {
      this.validacionesSubopcion = validacionesSubopcion;
    }
  
    setRespuestasCliente(respuestasCliente) {
      this.respuestasCliente = respuestasCliente;
    }
  
    setDescripcionAccionSeleccionada(descripcionAccionSeleccionada) {
      this.descripcionAccionSeleccionada = descripcionAccionSeleccionada;
    }
  
    setBoolConfirmacion(boolConfirmacion) {
      this.boolConfirmacion = boolConfirmacion;
    }
}
let pantallaRespuestaOperador = new PantallaRespuestaOperador();

// HabilitarPantalla() es la arrow function cuando se hace click en el boton de obtener datos llamada
const apiButton = document.getElementById('api-button');
apiButton.addEventListener('click',habilitarPantalla)

function habilitarPantalla(){
  fetch('http://localhost:8080/api/cu17/llamada')
  .then(response => response.json())
  .then(data => {
    pantallaRespuestaOperador.setNombreCliente(data.nombreCliente);
    pantallaRespuestaOperador.setCategoriaLlamada(data.categoriaLlamada);
    pantallaRespuestaOperador.setOpcionLlamada(data.opcionLlamada);
    pantallaRespuestaOperador.setSubOpcionLlamada(data.subOpcionLlamada);
    pantallaRespuestaOperador.setValidacionesSubopcion(data.validacionList);
    console.log(pantallaRespuestaOperador);

    // segundo metodo de la pantalla
    mostrarDatosLlamada()

  })
  .catch(error => {
      alert(error);
  });
}

function mostrarDatosLlamada(){
  const apiButton = document.getElementById('api-button');
  apiButton.style.display = 'none';

  const divDatos = document.getElementById('datos-llamada');
  divDatos.style.display = 'block';

  const nombreClienteDiv = document.getElementById('nombre-cliente');
  nombreClienteDiv.textContent = pantallaRespuestaOperador.getNombreCliente();

  const categoriaLlamadaDiv = document.getElementById('categoria-llamada');
  categoriaLlamadaDiv.textContent = `Categoría de llamada: ${pantallaRespuestaOperador.getCategoriaLlamada().nombre}, Mensaje en audio: ${pantallaRespuestaOperador.getCategoriaLlamada().audioMensajeOpciones}`;

  const opcionLlamadaDiv = document.getElementById('opcion-llamada');
  opcionLlamadaDiv.textContent = `Opción de llamada: ${pantallaRespuestaOperador.getOpcionLlamada().nombre}, Número de orden: ${pantallaRespuestaOperador.getOpcionLlamada().nroOrden}`;

  const subopcionLlamadaDiv = document.getElementById('subopcion-llamada');
  subopcionLlamadaDiv.textContent = `Subopción de llamada: ${pantallaRespuestaOperador.getSubOpcionLlamada().nombre}`;

  const validacionesDiv = document.getElementById('validaciones-list');
  const validacionesList = pantallaRespuestaOperador.getValidacionesSubopcion();

  validacionesList.forEach(validacion => {
    const validacionDiv = document.createElement('div');
    validacionDiv.textContent = `Validación necesaria: ${validacion.nombre}, Número de orden: ${validacion.nroOrden}`;
    validacionesDiv.appendChild(validacionDiv);
  });

  const abrirFormbutton = document.getElementById('validaciones-button');
  abrirFormbutton.addEventListener('click',mostrarValidaciones)

}
// tercer metodo de la pantalla
function mostrarValidaciones(){
  const abrirFormbutton = document.getElementById('validaciones-button');
  abrirFormbutton.style.display = 'none';

  const divValidaciones = document.getElementById('respuestas-validaciones');
  divValidaciones.style.display = 'block';
  const formValidaciones = document.getElementById('respuestas-form');
  pantallaRespuestaOperador.getValidacionesSubopcion().forEach(validacion =>{
    const label = document.createElement('label');
    label.textContent = `Respuesta para ${validacion.nombre}: `;
    formValidaciones.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('id', validacion.nombre.replace(/\s+/g, '-').toLowerCase());
    formValidaciones.appendChild(input);

    formValidaciones.appendChild(document.createElement('br'));

  });
  const validarButton = document.getElementById('respuestas-button');
  validarButton.addEventListener('click',tomarRespuestaCliente);

}

function tomarRespuestaCliente(){
  const validarButton = document.getElementById('respuestas-button');
  
  try{
    if(validarIngresoOperador()){
      const url = 'http://localhost:8080/api/cu17/validar';
      const respuestas = [];
      const respuestasForm = document.getElementById('respuestas-form');

      const inputs = respuestasForm.querySelectorAll('input');
      inputs.forEach(input => {
        const respuesta = input.value;
        respuestas.push(respuesta);
      });
      console.log(`Una de las respuestas: ${respuestas}`);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(respuestas)
      };
    
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          var objLength = Object.keys(data).length;
          console.log(`Data como viene en el json: ${data}`);
          console.log(`Type of: ${typeof(data)}`);
          console.log(`Length: ${objLength}`);
          console.log(`JsonStringify: ${JSON.stringify(data)}`);

          if (objLength != 1){
            validarButton.style.display = 'none';
            pantallaRespuestaOperador.setDescripcionAccionSeleccionada(data);
            mostrarAcciones();
          }
          else{
            alert("No se pudo validar el Usuario, vuelva")
          }

        })
        .catch(error => {
          alert(error);
        });
    }
  }
  catch{
    alert("No ingreso todas las validaciones correspondientes");
  } 
}

function mostrarAcciones(){
  const divAcciones = document.getElementById('acciones');
  divAcciones.style.display = 'block';
  const acciones = document.createElement('tr');
  acciones.id = 'tabla-seleccion-acciones';
  divAcciones.appendChild(acciones);

  pantallaRespuestaOperador.getDescripcionAccionSeleccionada().forEach((accion) => {
    const label = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(accion));
    acciones.appendChild(label);
  });

  const buttonAccion = document.getElementById('accion');
  buttonAccion.addEventListener('click',tomarSeleccionAccion)

}
// metodo pantalla
function tomarSeleccionAccion() {
  let accionSeleccionada = null;
  const tabla = document.getElementById('tabla-seleccion-acciones');
  const filas = tabla.querySelectorAll('td');
  filas.forEach(fila =>{
    const checkbox = fila.querySelector('input[type="checkbox"]');
    const texto = fila.textContent.trim();
    if(checkbox.checked){
      accionSeleccionada = texto;
    }
    
  })

  if (accionSeleccionada != null) {
    console.log('Acción seleccionada:', accionSeleccionada);
    let respuestaOp = tomarRespuestaOp();

    const formData = new FormData();
    formData.append('descripcionOperador', respuestaOp);
    formData.append('accion', accionSeleccionada);

    fetch('http://localhost:8080/api/cu17/accion', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        pedirConfirmacion(data);
        
        

      })
      .catch(error => {
        alert(error);
      });

  } else {
    alert('No se pudo realizar la peticion');
  }
}

function tomarRespuestaOp() {
  const respuestaOperador = document.getElementById('descripcionOperador');
  if (respuestaOperador === null || respuestaOperador === undefined) {
    alert("Debe ingresar la descripción de la acción a realizar");
    return null;
  }
  return respuestaOperador.value;
}

function pedirConfirmacion(data){
  const divConfirmacion = document.getElementById('confirmacion');
  divConfirmacion.style.display = 'block';
  const mensaje = document.getElementById('respuesta-accion');
  mensaje.textContent = data;
  const btnConfirmar = document.getElementById('confirmar-accion');
  btnConfirmar.addEventListener('click',tomarConfirmacion)

}

function tomarConfirmacion(){
  const url = new URL('http://localhost:8080/api/cu17/confirmar');
  url.searchParams.append('confirmado', 'true');

  fetch(url, {
    method: 'POST'
  })
  .then(response => response.text())
  .then(data => {
      mostrarExitoOperacion(data);
      
  })
  .catch(error => {
      alert(error);
  });

}

function mostrarExitoOperacion(data){
  const finalizar = document.getElementById('respuesta-confirmacion');
  finalizar.textContent = data;

}

function validarIngresoOperador(){
  var cantidadHijos = document.getElementById('cantidad-de-hijos').value;
  var codigoPostal = document.getElementById('codigo-postal').value;
  var nombreMascota = document.getElementById('nombre-de-su-mascota').value;

  console.log(`Respuestas Cantidad de Hijos : ${cantidadHijos}`);
  console.log(`Respuestas Codigo Postal : ${codigoPostal}`);
  console.log(`Respuestas Nombre Mascota : ${nombreMascota}`);
  if(!isNaN(cantidadHijos) && !isNaN(codigoPostal) && isNaN(nombreMascota)){
    alert('Todo Ok')
    return true;
  }
  else{
    alert('Todo Mal ingresa bien')
    return false;
  }

}