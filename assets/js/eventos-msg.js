// Mensagens
// TIVE QUE ADICIONAR POR CAUSA DE UM VARIAVEL. NAO FUNCIONA EM EVENTOS. NAO APAGAR
const mensagens = document.querySelectorAll(".mensagem");
let indexAtual = 0;

// Mostrar mensagem ativa
function mostrarMensagem(index) {
  mensagens.forEach(m => m.classList.remove("ativa"));
  mensagens[index].classList.add("ativa");

  // Atualiza a URL sem recarregar
  const id = mensagens[index].dataset.id;
  const novaUrl = `${window.location.pathname}?mensagem=${id}`;
  history.pushState(null, "", novaUrl);
}

// Navegar para anterior
document.querySelectorAll(".anterior").forEach(btn => {
  btn.addEventListener("click", () => {
    if (indexAtual > 0) {
      indexAtual--;
      mostrarMensagem(indexAtual);
    }
  });
});

// Navegar para seguinte
document.querySelectorAll(".seguinte").forEach(btn => {
  btn.addEventListener("click", () => {
    if (indexAtual < mensagens.length - 1) {
      indexAtual++;
      mostrarMensagem(indexAtual);
    }
  });
});

// Aplicar a mensagem ao carregar a página
function aplicarMensagemDaURL() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("mensagem");
  const index = Array.from(mensagens).findIndex(m => m.dataset.id === id);
  indexAtual = index >= 0 ? index : 0;

  mostrarMensagem(indexAtual);
}

aplicarMensagemDaURL();