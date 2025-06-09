// BOTÃO ADICIONAR AO CALENDÁRIO
document.querySelectorAll('.btn-calendario').forEach(btn => {
  btn.addEventListener('click', () => {
    const evento = btn.closest('.evento');
    const nome = evento.querySelector('.nome-local h2').innerText.trim();
    const local = evento.querySelector('.nome-local p').innerText.trim();
    const dataText = evento.querySelector('.data-hora p:nth-child(1)').innerText.trim(); // "06.jul.2025"
    const horaText = evento.querySelector('.data-hora p:nth-child(2)').innerText.trim(); // "10h00"

    // Mapear mês
    const meses = { jan: "01", fev: "02", mar: "03", abr: "04", mai: "05", jun: "06", 
                    jul: "07", ago: "08", set: "09", out: "10", nov: "11", dez: "12" };
    const [dia, mesAbrev, ano] = dataText.split('.');
    const mes = meses[mesAbrev.toLowerCase()];
    const hora = horaText.replace('h', '').padStart(4, '0');

    const dtStart = `${ano}${mes}${dia}T${hora}00`;
    const dtEnd = `${ano}${mes}${dia}T${(parseInt(hora.slice(0, 2)) + 1).toString().padStart(2, '0')}${hora.slice(2)}00`;

    // GOOGLE CALENDAR
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(nome)}&dates=${dtStart}/${dtEnd}&details=${encodeURIComponent(nome)}&location=${encodeURIComponent(local)}&sf=true&output=xml`;

    // ICS FILE (para iPhone / Outlook)
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${nome}
LOCATION:${local}
DESCRIPTION:${nome}
DTSTART:${dtStart}
DTEND:${dtEnd}
END:VEVENT
END:VCALENDAR`.trim();

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const icsUrl = URL.createObjectURL(blob);

    // Atualiza links
    const container = btn.nextElementSibling;
    container.querySelector('.google-link').href = googleUrl;
    container.querySelector('.ics-link').href = icsUrl;

// Toggle visibilidade
if (container.style.display === 'block') {
  
  container.style.display = 'none';
  btn.classList.remove('active'); // remove o roxo
} else {
  container.style.display = 'block';
  btn.classList.add('active'); // aplica o roxo
}


  });
});



// BOTÃO VER MAIS NO EVENTOS PASSADOS
document.addEventListener("DOMContentLoaded", function () {
    const eventosContainer = document.querySelector(".eventos-passados");
    const eventos = eventosContainer.querySelectorAll(".evento");
    const btnVerMais = document.getElementById("ver-mais-eventos");
    const limite = 3;

    if (eventos.length > limite) {
      // Oculta todos além dos 5 primeiros
      eventos.forEach((evento, index) => {
        if (index >= limite) {
          evento.style.display = "none";
        }
      });

      btnVerMais.style.display = "block";

      let expandido = false;

      btnVerMais.addEventListener("click", function () {
        expandido = !expandido;

        eventos.forEach((evento, index) => {
          if (index >= limite) {
            evento.style.display = expandido ? "flex" : "none";
          }
        });

        btnVerMais.textContent = expandido ? "Ver menos" : "Ver mais";
      });
    } 
    
    else {
      btnVerMais.style.display = "none";
    }
});



// BOTÃO VER MAIS NO EVENTOS FUTUROS
document.addEventListener("DOMContentLoaded", function () {
  const eventosFuturosContainer = document.querySelector(".eventos-futuros");
  const eventosFuturos = eventosFuturosContainer.querySelectorAll(".evento");
  const btnVerMaisFuturos = document.getElementById("ver-mais-futuros");
  const limiteFuturos = 2;

  if (eventosFuturos.length > limiteFuturos) {
    eventosFuturos.forEach((evento, index) => {
      if (index >= limiteFuturos) {
        evento.style.display = "none";
      }
    });

    btnVerMaisFuturos.style.display = "block";

    let expandidoFuturos = false;

    btnVerMaisFuturos.addEventListener("click", function () {
      expandidoFuturos = !expandidoFuturos;

      eventosFuturos.forEach((evento, index) => {
        if (index >= limiteFuturos) {
          evento.style.display = expandidoFuturos ? "flex" : "none";
        }
      });

      btnVerMaisFuturos.textContent = expandidoFuturos ? "Ver menos" : "Ver mais";
    });
  } else {
    btnVerMaisFuturos.style.display = "none";
  }
});
