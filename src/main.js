document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animation
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  // Trigger once on load
  revealOnScroll();

  // 2. Add to Calendar Functionality
  const addToCalBtn = document.getElementById('addToCalBtn');

  if (addToCalBtn) {
    addToCalBtn.addEventListener('click', () => {
      // Event Details
      const eventData = {
        title: "Ellas en el Spotlight",
        description: "Proyecto artístico y social diseñado para abrir conversación desde la empatía. Arte, conciencia y comunidad.",
        location: "Academia Escorpio Montagge",
      };

      const date1Start = new Date("2026-03-15T18:00:00");
      const date1End = new Date("2026-03-15T22:00:00");

      const date2Start = new Date("2026-03-22T18:00:00");
      const date2End = new Date("2026-03-22T22:00:00");

      const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '').substring(0, 15) + 'Z';
      };

      const nowFormatted = formatDate(new Date());

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Escorpio Montagge//Ellas en el Spotlight//ES',
        // Event 1
        'BEGIN:VEVENT',
        `UID:event1_${new Date().getTime()}@escorpiomontagge.com`,
        `DTSTAMP:${nowFormatted}`,
        `DTSTART:${formatDate(date1Start)}`,
        `DTEND:${formatDate(date1End)}`,
        `SUMMARY:${eventData.title} (Sesión 1)`,
        `DESCRIPTION:${eventData.description}`,
        `LOCATION:${eventData.location}`,
        'END:VEVENT',
        // Event 2
        'BEGIN:VEVENT',
        `UID:event2_${new Date().getTime()}@escorpiomontagge.com`,
        `DTSTAMP:${nowFormatted}`,
        `DTSTART:${formatDate(date2Start)}`,
        `DTEND:${formatDate(date2End)}`,
        `SUMMARY:${eventData.title} (Sesión 2)`,
        `DESCRIPTION:${eventData.description}`,
        `LOCATION:${eventData.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'ellas_en_el_spotlight.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Temporary feedback
      const originalText = addToCalBtn.innerText;
      addToCalBtn.innerText = "¡Agregado!";
      setTimeout(() => {
        addToCalBtn.innerText = originalText;
      }, 3000);
    });
  }
});
