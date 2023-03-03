// ****---- Functions ----****

let obtenerTotalCategoria = () => {

    const totalCategoria = operaciones.reduce((acc, operacion) => {
      let operacionCategoria = operacion.categoria;
  
      if (!acc[operacionCategoria]) {
        acc[operacionCategoria] = { ganancia: 0, gasto: 0, balance: 0 };
      }
  
      acc[operacionCategoria][operacion.tipo] += operacion.monto;
      acc[operacionCategoria]["balance"] =
        acc[operacionCategoria]["ganancia"] - acc[operacionCategoria]["gasto"];
  
      return acc;
    }, {});
  
     return totalCategoria;
  };
  
  const obtenerTotalMes = () => {
    const totalMes = operaciones.reduce((acc, operacion) => {
      fecha = nuevaFecha(operacion.fecha);
  
      const formatoFecha = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
  
      if (!acc[formatoFecha]) {
        acc[formatoFecha] = {
          ganancia: 0,
          gasto: 0,
          balance: 0,
        };
      }
  
      acc[formatoFecha][operacion.tipo] += operacion.monto;
      acc[formatoFecha]["balance"] =
        acc[formatoFecha]["ganancia"] - acc[formatoFecha]["gasto"];
  
      return acc;
    }, {});
  
    return totalMes;
  };
  
  const obtenerCantidadMayor = (object, keyFilter) => {
    let montoMasAlto = {
      filtro: "",
      monto: 0
  }
   const objectToIterate = Object.keys(object);
  
    for (const key of objectToIterate) {
      if (object[key][keyFilter] > montoMasAlto.monto) {
        montoMasAlto.filtro = key;
        montoMasAlto.monto = object[key][keyFilter];
      }
    }
  
    return montoMasAlto;
  };
  
  const categoriaMayorGanancia = () => {
  
    let resultado = obtenerCantidadMayor(obtenerTotalCategoria(), "ganancia");
  
    return resultado;
  };
  
  const categoriaMayorGasto = ()=>{
    
    let resultado = obtenerCantidadMayor(obtenerTotalCategoria(), "gasto");
  
    return resultado;
  }
  
  const categoriaMayorBalance = ()=>{
    let resultado = obtenerCantidadMayor(obtenerTotalCategoria(), "balance");
  
    return resultado;
  }
  
  const mesMayorGanancia = () => {
  
    let resultObject = obtenerCantidadMayor(obtenerTotalMes(),"ganancia");
  
    return resultObject;
  };
  
  const mesMayorGasto = ()=>{
    let resultado = obtenerCantidadMayor(obtenerTotalMes(),"gasto");;
  
  
    return resultado;
  }
  
  const mostrarReporte = () => {
    let categoriaMasGanancia = categoriaMayorGanancia();
    let categoriaMasGasto = categoriaMayorGasto();
    let categoriaMasBalance = categoriaMayorBalance();
    let totalPorCategoria = obtenerTotalCategoria();
    let mesMasGanancia = mesMayorGanancia();
    let mesMasGasto = mesMayorGasto();
    let totalPorMes = obtenerTotalMes();
  
    $reporteTotalPorCategoria.innerHTML = "";
    $reporteTotalPorMes.innerHTML = "";
  
  $reporteResumen.innerHTML =`<div class="flex justify-between mb-5">
      <p class="font-semibold">Categoría con mayor ganancia</p>
      <span class="bg-blue-100 text-xs font-medium mr-2 px-2 py-1 rounded text-blue-900" id="tag-mayorGanancia">${categoriaMasGanancia.filtro}</span>
      <p class="font-semibold text-green-600" id="monto-mayorGanancia">+${categoriaMasGanancia.monto}</p>
  </div>
  
  <div class="flex justify-between mb-5">
      <p class="font-semibold">Categoría con mayor gasto</p>
      <span class="bg-blue-100 text-xs font-medium mr-2 px-2 py-1 rounded text-blue-900" id="tag-mayorGasto">${categoriaMasGasto.filtro}</span>
      <p class="font-semibold text-red-600" id="monto-mayorGasto">-$${categoriaMasGasto.monto}</p>
  </div>
  
  <div class="flex justify-between mb-5">
      <p class="font-semibold">Categoría con mayor balance</p>
      <p class="bg-blue-100 text-xs font-medium mr-2 px-2 py-1 rounded text-blue-900" id="tag-mayorBalance">${categoriaMasBalance.filtro}</p>
      <p class="font-semibold" id="monto-mayorBalance">$${categoriaMasBalance.monto}</p>
  </div>
  <
  <div class="flex justify-between mb-5">
      <p class="font-semibold">Mes con mayor ganancia</p>
      <div class="column is-2 has-text-right" id="mes-mayorGanancia">${mesMasGanancia.filtro}</div>
      <p class="font-semibold text-green-600" id="monto-mesMayorGanancia">+$${mesMasGanancia.monto}</p>
  </div>
  <!-- mes mayor gasto -->
  <div class="flex justify-between mb-5">
      <p class="font-semibold">Mes con mayor gasto</p>
      <div class="column is-2 has-text-right" id="mes-mayorGasto">${mesMasGasto.filtro}</div>
      <p class="font-semibold text-red-600" id="monto-mesMayorGasto">-$${mesMasGasto.monto}</p>
  </div>`
  
  
  const categorias = Object.keys(totalPorCategoria)
    for (const categoria of categorias) {
      
      $reporteTotalPorCategoria.innerHTML += `<div class="flex justify-between mb-5">
      <p class="font-semibold">${categoria}</p>
      <p class="font-semibold">+$${totalPorCategoria[categoria]["ganancia"]}</p>
      <p class="font-semibold">-$${totalPorCategoria[categoria]["gasto"]}</p>
      <p class="font-semibold">$${totalPorCategoria[categoria]["ganancia"]-totalPorCategoria[categoria]["gasto"]}</p>
      </div>`
  }
  
  
  const fechas = Object.keys(totalPorMes);
  
  for (const fecha of fechas) {
    $reporteTotalPorMes.innerHTML += `<div class="flex justify-between mb-5">
    <p class="font-semibold">${fecha}</p>
    <p class="font-semibold">+$${totalPorMes[fecha]["ganancia"]}</p>
    <p class="font-semibold">-$${totalPorMes[fecha]["gasto"]}</p>
    <p class="font-semibold">$${totalPorMes[fecha]["ganancia"]-totalPorMes[fecha]["gasto"]}</p>
    </div>`
  }
  };
  
  // ***>>> Function to init app <<<*** //
  
  const iniciarApp = () => {
    if (operaciones.length > 0) {
  
      ocultarElemento($sinOperaciones);
      mostrarElemento($existeOperaciones);
  
      pintarOperaciones(operaciones);
    }
  
    mostrarBalance(getBalance(operaciones));
    mostrarCategoria(categorias);
  };
  
  iniciarApp();