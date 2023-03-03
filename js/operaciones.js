// ****---- Variables ----****

let operacionesLocalStorage = JSON.parse(
    localStorage.getItem("datosIngresados")
  );
  
  let operaciones = operacionesLocalStorage || [];
  
  // ****---- Functions ----****
  
  let boxBalance = (operaciones) => {
  
    let nuevoBalance = {  
      ganancia: 0,
      gasto: 0,
      total: 0
    };
  
    for (const operacion of operaciones) {
      if (operacion.tipo === "ganancia") {
        nuevoBalance.ganancia += operacion.monto;
      } else if (operacion.tipo === "gasto") {
        nuevoBalance.gasto += operacion.monto;
      }
    }
  
    nuevoBalance.total = nuevoBalance.ganancia - nuevoBalance.gasto;
  
    return nuevoBalance;
  };
  
   const mostrarBalance = (balance) => {
    $balanceGanancias.innerText = `+$${balance.ganancia}`;
    $balanceGastos.innerText = `-$${balance.gasto}`;
    $balanceTotal.innerText = `$${balance.total}`;
  };

  
   
  const eliminarOperacion = (id) => {
     operaciones = operaciones.filter((operacion) => operacion.id !== id);
     
     actualizacionOperaciones();
  
     if (operaciones.length === 0) {
      ocultarElemento($vistaOperaciones);
      mostrarElemento($sinOperaciones);
    }
  };
  
  let operacionSeleccionada; 
  
  const editarOperacion = (id) => {
  
    cambiarVista($$sections, $seccionEditarOperacion);
  
    operacionSeleccionada = operaciones.find((operacion) => operacion.id === id);
  
    $descripcionEditOperacion.value = operacionSeleccionada["descripcion"];
    $montoEditOperacion.value = operacionSeleccionada["monto"];
    $tipoEditOperacion.value = operacionSeleccionada["tipo"];
    $fechaEditOperacion.value = operacionSeleccionada["fecha"];
    $categoriasEditOperacion.value = operacionSeleccionada["categoria"];
  };
  
  const limpiarNuevaOperacion = () => {
    $descripcionInput.value = "";
    $montoInput.value = 0;
    $tipoOperacion.value = "gasto";
    $categoriasSelect.value = "Comida";
  };
  
  
  const pintarOperaciones = (operaciones) => {
    $vistaOperaciones.innerHTML = "";
  
    const divContainer = document.createElement("div");
  
    for (const { id, descripcion, monto, categoria, fecha, tipo } of operaciones) {
      divContainer.innerHTML += `<div class="flex justify-between">
      <span class="">${descripcion}</span>
      <span class="text-end">${categoria}</span>
      <span class="">${fecha}</span>
      <span class=" ${tipo === 'ganancia'? 'text-green-600' : 'text-red-600'} ">${tipo === "ganancia" ? "+" : "-"}${monto}</span>
      <span class="">
          <a href="#" class="btn-editarOperacion text-xs text-blue-600 hover:text-blue-900" id="${id}">Editar</a>
          <a href="#" class="btn-eliminarOperacion text-xs text-blue-600 hover:text-blue-900" id="${id}">Eliminar</a>
      </span>
      </div>`;
  
      const btnsEliminar = divContainer.querySelectorAll(
        ".btn-eliminarOperacion"
      );
  
      for (const btn of btnsEliminar) {
        btn.onclick = () => {
          eliminarOperacion(btn.id);
        };
      }
  
      const btnsEditarOperacion = divContainer.querySelectorAll(".btn-editarOperacion");
  
      for (const btn of btnsEditarOperacion) {
        btn.onclick = () => {
          editarOperacion(btn.id);
        };
      }
  
      $vistaOperaciones.append(divContainer);
    }
  };
  
  const actualizacionOperaciones = () => {
    localStorage.setItem("datosIngresados", JSON.stringify(operaciones));
    pintarOperaciones(operaciones);
    mostrarBalance(boxBalance(operaciones));
  };
  
  // ****---- Function to add current date in "formulary new operation" ----****
  
  window.onload = function(){
    let fecha = new Date(); 
    let mes = fecha.getMonth()+1; 
    let dia = fecha.getDate(); 
    let año = fecha.getFullYear(); 
    if(dia<10)
      dia='0'+dia; 
    if(mes<10)
      mes='0'+mes 
  
    $fechaInput.value=año+"-"+mes+"-"+dia;
  }
  
  // ****---- Events ----****
  
  $btnAgregarOperacion.addEventListener("click", (event) => {
  
    event.preventDefault()
    
    const objOperacion = { 
      id: uuidv4(),
      descripcion: $descripcionInput.value,
      monto: Number($montoInput.value),
      tipo: $tipoOperacion.value,
      categoria: $categoriasSelect.value,
      fecha: $fechaInput.value
     };
  
    operaciones.push(objOperacion);
  
    actualizacionOperaciones();
  
    limpiarNuevaOperacion();
  
    cambiarVista($$sections, $seccionBalance);
    ocultarElemento($sinOperaciones);
    mostrarElemento($existeOperaciones);
  });
  
   $btnCancelarNuevaOperacion.addEventListener("click", (e)=>{
    e.preventDefault();
    cambiarVista($$sections, $seccionBalance);
  })
  
  $btnEditarAgregarOperacion.addEventListener("click", (e)=>{
    e.preventDefault();
  
    operaciones = operaciones.map((operacion)=>{
      if (operacion.id === operacionSeleccionada.id){
  
      operacion.descripcion = $descripcionEditOperacion.value;
      operacion.monto = Number($montoEditOperacion.value);
      operacion.tipo = $tipoEditOperacion.value;
      operacion.fecha = $fechaEditOperacion.value;
      operacion.categoria = $categoriasEditOperacion.value;
  
      }
      return operacion; 
    })
  
  actualizacionOperaciones();
  cambiarVista($$sections, $seccionBalance);
  
  operacionSeleccionada = null;
  });
  
  $btnCancelarEditarOperacion.addEventListener("click", ()=>{
    cambiarVista($$sections, $seccionBalance);
  })