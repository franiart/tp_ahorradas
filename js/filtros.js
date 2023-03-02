// ****---- Functions ----****

const filtroTipo = (filtro, operaciones) => {

    let tipo = [];
    if (filtro === "todos") {
      tipo = operaciones;
    } else {
      tipo = operaciones.filter((operacion) => operacion.tipo === filtro)
    }
    return tipo;
  };
  
  const filtroCategoria = (filtro, operaciones) => {
  
    let categoria = [];
    if (filtro === "todas") {
      categoria = operaciones;
    } else {
     categoria = operaciones.filter((operacion) => operacion.categoria === filtro)
    }
    return categoria;
  
  };
  
  function nuevaFecha (fechaStr) {
    var arrFecha = fechaStr.split("-");
     var año = arrFecha[0];
     var mes = arrFecha[1] - 1;
     var dia = arrFecha[2];
  
    return new Date(año, mes, dia);
  }
  
  const filtroFecha = (filtro, operaciones)=> date = operaciones.filter((operacion) => operacion.fecha >= filtro)
  
  const filtroOrden = (filtro, operaciones) => {
    let sortOperaciones = [];
    switch (filtro) {
      case "mas reciente":
        sortOperaciones = operaciones.sort(
          (a, b) => nuevaFecha(b.fecha) - nuevaFecha(a.fecha)
        );
        break;
  
      case "menos reciente":
        sortOperaciones = operaciones.sort(
          (a, b) => nuevaFecha(a.fecha) - nuevaFecha(b.fecha)
        );
        break;
  
      case "menor monto":
        sortOperaciones = operaciones.sort((a, b) => a.monto - b.monto);
        break;
  
      case "mayor monto":
        sortOperaciones = operaciones.sort((a, b) => b.monto - a.monto);
        break;
  
      case "a/z":
        sortOperaciones = operaciones.sort(function(a, b){
          if(a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) { return -1; }
          if(a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) { return 1; }
          return 0;
      })
        break;
  
      case "z/a":
        sortOperaciones = operaciones.sort(function(a, b){
          if(a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) { return 1; }
          if(a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) { return -1; }
          return 0;
      })
        break;
    }
  
    return sortOperaciones;
  };
  
  let filtroOperacion = ()=>{
    let filtrandoOperaciones = [...operations];
  
    filtrandoOperaciones = filtroTipo($selectType.value, filtrandoOperaciones );
    filtrandoOperaciones = filtroCategoria($selectCategory.value, filtrandoOperaciones);
    filtrandoOperaciones = filtroOrden($selectOrder.value, filtrandoOperaciones);
    filtrandoOperaciones = filtroFecha($inputFilterDate.value, filtrandoOperaciones);
    
    return filtrandoOperaciones;
    }
  
  // ****---- Events ----****
  
  $ocultarFiltros.addEventListener("click", (event)=>{
    event.preventDefault()
    $filtrosBalance.classList.toggle("hidden");
  
    if ($ocultarFiltros.innerText.includes("Ocultar")) {
      $ocultarFiltros.innerText = "Mostrar filtros"
    } else if ($ocultarFiltros.innerText.includes("Mostrar")){
      $ocultarFiltros.innerText = "Ocultar filtros"
    }
  })
  
  $filtroTipo.addEventListener("change", () => {
    pintarOperaciones(filtroOperacion());
    mostrarBalance(boxBalance(filtroOperacion()));
  });
  
  $filtroCategoria.addEventListener("change", () => {
    pintarOperaciones(filtroOperacion());
   mostrarBalance(boxBalance(filtroOperacion()));
  });
  
  $filtroFecha.addEventListener("change", () => {
    pintarOperaciones(filtroOperacion());
    mostrarBalance(boxBalance(filtroOperacion()));
  });
  
  $filtroOrdenar.addEventListener("change", () => {
    pintarOperaciones(filtroOperacion());
    mostrarBalance(boxBalance(filtroOperacion()));
  });