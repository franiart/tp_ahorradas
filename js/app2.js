const $ = (selector) => document.querySelector(selector);
const $$ = (selector)=> document.querySelectorAll(selector);

//ELEMENTOS DE NAVEGACIÓN
const $vistaBalance = $("#vista-balance");
const $vistaCategorias = $("#vista-categorias");
const $vistaReportes = $("#vista-reportes")

//SECCIONES
const $seccionBalance = $("#seccion-balance");
const $seccionCategorias = $("#seccion-categorias");
const $seccionReportes = $("#seccion-reportes");

//SECCIONES DE VISTA BALANCE
const $seccionNuevaOperacion = $("#seccion-nuevaOperacion");
const $seccionEditarOperacion = $("#seccion-editarOperacion");

//SECCIONES DE VISTA CATEGORÍA
const $seccionEditarCategoria = $("#seccion-editarCategoria");

//ELEMENTOS DE VISTA CATEGORÍA
const $boxCategoria = $(".box-categoria");
const $inputEditCategoria = $('#input-editarCategoria');
const $selectCategoriaNewOperacion = $('#select-tipoCategoria');
const $divCategoria = $('.cont-categoria');
const $btnAgregarCategoria = $('#btn-agregarCategoria');
const $inputNuevaCategoria = $('#input-nombre-categoria');
const $btnCancelarEditCategoria = $('#btn-cancelarEditarCategoria');
const $btnEditarCategoria = $('#btn-editarCategoria');

//ELEMENTOS DE VISTA BALANCE
const $ocultarFiltros = $("#ocultarFiltros");
//Balance
const $boxBalance = $("#box-balance");
const $balanceGanancias = $('#balance-ganancias');
const $balanceGastos = $('#balance-gastos');
const $balanceTotal = $('#balance-total');
//Filtros
const $boxFiltros = $("#box-filtros");
const $filtroTipo = $("#filtro-tipo");
const $filtroCategoria = $("#filtro-categoria");
const $filtroFecha = $("#filtro-fecha");
const $filtroOrdenar = $("#filtro-ordenar");
//Operaciones
const $boxOperaciones = $("#box-operaciones");
const $sinOperaciones = $("#sin-operaciones");
const $existeOperaciones = $("#existe-operaciones");
const $vistaOperaciones = $("#operaciones");

//SECCIÓN NUEVA OPERACIÓN
const $btnNuevaOperacion = $("#btn-nuevaOperacion");
const $btnCancelarNuevaOperacion = $("#btn-cancelarOperacion");
const $btnAgregarOperacion = $("#btn-agregarOperacion")


//INPUTS PARA AGREGAR OPERACIÓN
const $descripcionInput = $('#input-descripcionOperacion');
const $montoInput = $('#input-montoOperacion');
const $tipoOperacion = $('#select-tipoOperacion');
const $categoriasSelect = $('#select-tipoCategoria');
const $fechaInput = $('#input-fechaOperacion');
const $agregarOperacion = $('#btn-agregarOperacion');
const $cancelarOperacion = $('#btn-cancelarOperacion');

//INPUTS EDITAR OPERACIÓN
const $descripcionEditOperacion = $('#input-editar-descripcionOperacion');
const $montoEditOperacion  = $('#input-editar-montoOperacion');
const $tipoEditOperacion = $('#select-editar-tipoOperacion');
const $categoriasEditOperacion  = $('#select-editar-tipoCategoria');
const $fechaEditOperacion  = $('#input-editar-fechaOperacion');
const $agregarEditOperacion = $('#btn-editar-agregarOperacion');
const $cancelarEditOperacion  = $('#btn-editar-cancelarOperacion');

const $btnEditarAgregarOperacion = $("#btn-editar-agregarOperacion");
const $btnCancelarEditarOperacion = $('#btn-editar-cancelarOperacion');

//SECCION REPORTES
const $boxReporteSinOperaciones = $("#sin-operacionesReporte");
const $boxReporteResumen = $("#reporteResumen");

const $$sections = $$(".seccion");


const cambiarVista = (ocultarSeccion, mostrarSeccion) => {
    for (const seccion of ocultarSeccion) {
      seccion.classList.add("hidden");
    }
    mostrarSeccion.classList.remove("hidden");
  };

const ocultarElemento = (elemento)=> elemento.classList.add("hidden");
const mostrarElemento = (elemento)=> elemento.classList.remove("hidden");


// ****---- Events to change the screens----****

$vistaBalance.addEventListener("click", () => {
    cambiarVista($$sections, $seccionBalance);
  });

$vistaCategorias.addEventListener("click", () => {
  cambiarVista($$sections, $seccionCategorias);
});

$vistaReportes.addEventListener("click", () => {
    cambiarVista($$sections, $seccionReportes);

        if (operaciones != 0) {
        ocultarElemento($boxReporteSinOperaciones);
        mostrarElemento($boxReporteResumen);
        mostrarReportes();
    } else {
        ocultarElemento($boxReporteResumen);
        mostrarElemento($boxReporteSinOperaciones);
    }
  });

$btnNuevaOperacion.addEventListener("click", ()=>{
    cambiarVista($$sections, $seccionNuevaOperacion);
})
