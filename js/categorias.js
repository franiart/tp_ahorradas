// ****---- Variables ----****

let categoriasLocalStorage = JSON.parse(localStorage.getItem("categorias"));

let categorias = categoriasLocalStorage || [
  {
    nombre: "Comida",
    id: "comida",
  },
  {
    nombre: "Servicios",
    id: "servicios",
  },
  {
    nombre: "Salidas",
    id: "salidas",
  },
  {
    nombre: "Educación",
    id: "educacion",
  },
  {
    nombre: "Transporte",
    id: "transporte",
  },
  {
    nombre: "Trabajo",
    id: "trabajo",
  },
];

let categoriaSeleccionada;

// ****---- Functions ----****

const eliminarCategoria = (id) => {
  eliminarOperacionCategoria(id);

  categorias = categorias.filter((categoria) => categoria.id !== id);

  actualizarCategorias();
};

const editarCategoria = (id) => {
  ocultarElemento($boxCategoria);
  mostrarElemento($seccionEditarCategoria);

  categoriaSeleccionada = categorias.find((categoria) => categoria.id === id);

  $inputEditCategoria.value = categoriaSeleccionada["nombre"];
};

const eliminarOperacionCategoria = (id) => {
  operaciones = operaciones.filter((operacion) => {
    categoriaSeleccionada = categorias.find((categoria) => categoria.id === id);

    return operacion.categoria !== categoriaSeleccionada.nombre;
  });

  actualizacionOperaciones();
};

const mostrarCategoria = (categorias) => {
  $selectCategoriaNewOperacion.innerHTML = "";
  $filtroCategoria.innerHTML = `<option value="todas">Todas</option>`;

  const divContainer = document.createElement("div");

  $divCategoria.innerHTML = "";

  for (const { nombre, id } of categorias) {
    $selectCategoriaNewOperacion.innerHTML += `<option value="${nombre}" id="${id}">${nombre}</option>`;
    $inputEditCategoriaOperacion.innerHTML += `<option value="${nombre}" id="${id}">${nombre}</option>`;

    $filtroCategoria.innerHTML += `<option value="${nombre}" id="${id}">${nombre}</option>`;

    divContainer.innerHTML += `<div class="flex justify-between py-5">
          <span class="bg-blue-100 text-xs font-medium mr-2 px-2 py-1 rounded text-blue-900">${nombre}</span>
          <div class="">
            <a href="#" class="btn-categoria-edit text-xs text-blue-600 hover:text-blue-900" id="${id}">Editar</a>
            <a href="#" class="btn-categoria-delete text-xs text-blue-600 hover:text-blue-900" id="${id}">Eliminar</a>
          </div>
        </div>`;
  }

  const btnBorrarCategoria = divContainer.querySelectorAll(".btn-categoria-delete");

  for (const button of btnBorrarCategoria) {
    button.onclick = () => {
      eliminarCategoria(button.id);
    };
  }

  const btnEditaCategoria = divContainer.querySelectorAll(".btn-categoria-edit");

  for (const button of btnEditaCategoria) {
    button.onclick = () => {
      editarCategoria(button.id);
    };
  }

  $divCategoria.append(divContainer);
};

const actualizarCategorias = () => {
  localStorage.setItem("categorias", JSON.stringify(categorias));
  mostrarCategoria(categorias);
};

// ****---- Events ----****

$btnAgregarCategoria.addEventListener("click", (event) => {
  event.preventDefault();

  const nuevaCategoria = {
    nombre: $inputNuevaCategoria.value,
    id: uuidv4(),
  };

  categorias.push(nuevaCategoria);

  actualizarCategorias();

  $inputNuevaCategoria.value = "";
});

$btnCancelarEditCategoria.addEventListener("click", (e) => {
  e.preventDefault();

  ocultarElemento($seccionEditarCategoria);
  mostrarElemento($boxCategoria);
});

$btnEditarCategoria.addEventListener("click", (e) => {
  e.preventDefault();

  ocultarElemento($seccionEditarCategoria);
  mostrarElemento($boxCategoria);

  categorias = categorias.map((categoria) => {
    if (categoria.id === categoriaSeleccionada.id) {
      categoria.nombre = $inputEditCategoria.value;
    }

    return categoria;
  });

  actualizarCategorias();

  categoriaSeleccionada = null;
});
