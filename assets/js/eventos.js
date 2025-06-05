// Calendário
// https://dev.to/wizdomtek/creating-a-dynamic-calendar-using-html-css-and-javascript-29m


document.querySelectorAll('.evento').forEach(evento => {
  const dataText = evento.querySelector('.nome-local p:last-child')?.innerText;
  if (!dataText) return;

  const regex = /(\d{1,2})\.(\w{3})\.(\d{4})/;
  const meses = { jan: "01", fev: "02", mar: "03", abr: "04", mai: "05", jun: "06", 
                  jul: "07", ago: "08", set: "09", out: "10", nov: "11", dez: "12" };

  const match = dataText.match(regex);
  if (match) {
    const [_, dia, mesAbrev, ano] = match;
    const mes = meses[mesAbrev.toLowerCase()];
    const id = `evento-${ano}-${mes}-${dia.padStart(2, '0')}`;
    evento.setAttribute('id', id);
  }
});


const datasEventos = [];

document.querySelectorAll('.evento').forEach(evento => {
  const dataText = evento.querySelector('.nome-local p:last-child')?.innerText;
  const regex = /(\d{1,2})\.(\w{3})\.(\d{4})/;
  const meses = { jan: "01", fev: "02", mar: "03", abr: "04", mai: "05", jun: "06", 
                  jul: "07", ago: "08", set: "09", out: "10", nov: "11", dez: "12" };
  const match = dataText.match(regex);
  if (match) {
    const [_, dia, mesAbrev, ano] = match;
    const mes = meses[mesAbrev.toLowerCase()];
    const dataFormatada = `${ano}-${mes}-${dia.padStart(2, '0')}`;
    datasEventos.push(dataFormatada);
  }
});



const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'junho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function renderCalendar(month, year) {
  calendarDates.innerHTML = '';
  monthYear.textContent = `${months[month]} ${year}`;

  // Get the first day of the month
  const firstDay = new Date(year, month, 1).getDay();

  // Get the number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create blanks for days of the week before the first day
  for (let i = 0; i < firstDay; i++) {
    calendarDates.appendChild(document.createElement('div'));
  }

  // Get today's date
  const today = new Date();

  // Populate the days
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.textContent = i;

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

    // Verifica se há evento nesse dia
    if (datasEventos.includes(dateStr)) {
      day.classList.add('dia-com-evento');
      const img = document.createElement('img');
      img.src = './assets/media/favorite.svg';
      img.alt = 'Evento';
      img.classList.add('evento-icon');
      day.appendChild(img);

      day.classList.add('tem-evento');
      day.dataset.eventDate = dateStr;
    }

    calendarDates.appendChild(day);
  }
}

renderCalendar(currentMonth, currentYear);

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

calendarDates.addEventListener('click', (e) => {
  const target = e.target.closest('div[data-event-date]');
  if (target) {
    const data = target.dataset.eventDate;
    const el = document.getElementById(`evento-${data}`);

    if (el) {
      // Verifica se está visível
      const isHidden = el.style.display === 'none' || window.getComputedStyle(el).display === 'none';

      // Se está escondido, simula clique no "ver mais"
      if (isHidden) {
        const btnVerMais = document.getElementById("ver-mais-eventos");
        if (btnVerMais && btnVerMais.style.display !== 'none') {
          btnVerMais.click(); // expandir eventos
        }

        // Espera brevemente o DOM atualizar antes de scroll e destaque
        setTimeout(() => {
          highlightEvento(el);
        }, 300);
      } else {
        highlightEvento(el);
      }
    }
  }
});

// Função para scroll e destaque
function highlightEvento(el) {
  document.querySelectorAll('.evento.highlighted').forEach(evt => {
    evt.classList.remove('highlighted');
  });

  el.classList.add('highlighted');
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Remove a borda após 3 segundos
  setTimeout(() => {
    el.classList.remove('highlighted');
  }, 1500);
}




// BOTÃO ADICIONAR AO CALENDÁRIO - CONFIRMADO
document.querySelectorAll('.btn-calendario').forEach(button => {
  button.addEventListener('click', () => {
    const evento = button.closest('.evento');
    const nome = evento.querySelector('.nome-local h2').innerText.trim();
    const local = evento.querySelector('.nome-local p').innerText.trim();
    const data = evento.querySelector('.data-hora p:nth-child(1)').innerText.trim(); // "06.jul.2025"
    const hora = evento.querySelector('.data-hora p:nth-child(2)').innerText.trim(); // "10h00"

    const meses = { jan: "01", fev: "02", mar: "03", abr: "04", mai: "05", jun: "06", 
                    jul: "07", ago: "08", set: "09", out: "10", nov: "11", dez: "12" };
    const [dia, mesAbrev, ano] = data.split('.');
    const mes = meses[mesAbrev.toLowerCase()];
    const horaFormatada = hora.replace('h', '');
    
    const dtStart = `${ano}${mes}${dia}T${horaFormatada}00`;
    const dtEnd = `${ano}${mes}${dia}T${(parseInt(horaFormatada) + 1).toString().padStart(2, '0')}0000`;

    const dtStartISO = `${ano}-${mes}-${dia}T${horaFormatada.slice(0, 2)}:${horaFormatada.slice(2)}:00`;

    // ICS
    const ics = `
    BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:${nome}
    LOCATION:${local}
    DTSTART:${dtStart}
    DTEND:${dtEnd}
    DESCRIPTION:${nome} - ${local}
    END:VEVENT
    END:VCALENDAR
    `.trim();

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const urlICS = URL.createObjectURL(blob);

    // Google Calendar Link
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(nome)}&location=${encodeURIComponent(local)}&dates=${dtStart}/${dtEnd}&details=${encodeURIComponent(nome + ' - ' + local)}`;

    const container = button.nextElementSibling;
    const googleLink = container.querySelector('.google-link');
    const icsLink = container.querySelector('.ics-link');

    googleLink.href = googleUrl;
    icsLink.href = urlICS;
    icsLink.download = `${nome.replace(/\s+/g, "_")}.ics`;

    container.style.display = container.style.display === 'flex' ? 'none' : 'flex';
  });
});









// BOTÃO VER MAIS NO EVENTOS - CONFIRMADO
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