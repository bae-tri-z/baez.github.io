const filterCheckboxes = document.querySelectorAll(".filter-option");
const frames = document.querySelectorAll(".colecao .frame");
const todosCheckbox = document.querySelector('.filter-option[value="todos"]');

// Função principal para atualizar os filtros
function updateFilters(changedCheckbox = null) {
    const checkedFilters = Array.from(filterCheckboxes)
        .filter(cb => cb.checked && cb.value !== "todos");

    // Se o utilizador clicou em "todos", desseleciona os outros
    if (changedCheckbox && changedCheckbox.value === "todos") {
        filterCheckboxes.forEach(cb => {
            if (cb.value !== "todos") cb.checked = false;
        });
    }

    // Se o utilizador clicou noutro filtro, desmarca "todos"
    if (changedCheckbox && changedCheckbox.value !== "todos") {
        if (checkedFilters.length > 0) {
            todosCheckbox.checked = false;
        } 
        else {
            todosCheckbox.checked = true;
        }
    }

    // Garante que pelo menos um está ativo
    const hasActive = Array.from(filterCheckboxes).some(cb => cb.checked);
    if (!hasActive) {
        todosCheckbox.checked = true;
    }

    // Determina filtros ativos
    const activeFilters = todosCheckbox.checked ? [] : checkedFilters.map(cb => cb.value);

    // Atualiza o URL
    if (activeFilters.length > 0) {
        const query = `?filtro=${activeFilters.join("-")}`;
        history.pushState(null, "", query);
    } 
    else {
        const cleanURL = window.location.pathname;
        history.pushState(null, "", cleanURL);
    }

    // Mostra ou esconde produtos
    frames.forEach(frame => {
        const tipo = frame.dataset.name;
        if (todosCheckbox.checked || activeFilters.includes(tipo)) {
            frame.classList.remove("hide");
        } 
        else {
            frame.classList.add("hide");
        }
    });
}

// Aplica filtros com base no URL ao carregar
function applyFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    const filtro = params.get("filtro");

    if (filtro) {
        const tipos = filtro.split("-");
        filterCheckboxes.forEach(cb => {
            cb.checked = tipos.includes(cb.value);
        });
    } 
    else {
        todosCheckbox.checked = true;
    }

    updateFilters();
}

// Eventos
filterCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => updateFilters(cb));
});

// Inicialização
applyFiltersFromURL();