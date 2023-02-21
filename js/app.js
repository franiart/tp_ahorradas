//ELEMENTOS DE NAVEGACIÓN
const vistaBalance = document.getElementById("vista-balance");
const vistaCategorias = document.getElementById("vista-categorias");
const vistaReportes = document.getElementById("vista-reportes")

//SECCIONES
const seccionBalance = document.getElementById("seccion-balance");
const seccionCategorias = document.getElementById("seccion-categorias");
const seccionReportes = document.getElementById("seccion-reportes");
const seccionNuevaOperacion = document.getElementById("seccion-nuevaOperacion");
const seccionEditarOperacion = document.getElementById("seccion-editarOperacion");
const seccionEditarCategoria = document.getElementById("seccion-editarCategoria");

//ELEMENTOS DE VISTA BALANCE
const ocultarFiltros = document.getElementById("ocultarFiltros");
const boxBalance = document.getElementById("box-balance");
const boxFiltros = document.getElementById("box-filtros");
const boxOperaciones = document.getElementById("box-operaciones");

//FUNCIONALIDAD DEL MENU DE NAVEGACIÓN
vistaBalance.addEventListener('click', ()=>{
    seccionBalance.classList.remove('hidden')
    seccionCategorias.classList.add('hidden')
    seccionReportes.classList.add('hidden')
})

vistaCategorias.addEventListener('click', ()=>{
    seccionBalance.classList.add('hidden')
    seccionCategorias.classList.remove('hidden')
    seccionReportes.classList.add('hidden')
})

vistaReportes.addEventListener('click', ()=>{
    seccionBalance.classList.add('hidden')
    seccionCategorias.classList.add('hidden')
    seccionReportes.classList.remove('hidden')
})

//SECCIÓN NUEVA OPERACIÓN
const btnNuevaOperacion = document.getElementById("btn-nuevaOperacion");