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
        // For demonstration, setting a generic date a month from now. 
        // In a real scenario, these would be precise event dates.
        startDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1, new Date().getDate(), new Date().getHours() + 4)),
      };

      const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '').substring(0, 15) + 'Z';
      };

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Escorpio Montagge//Ellas en el Spotlight//ES',
        'BEGIN:VEVENT',
        `UID:${new Date().getTime()}@escorpiomontagge.com`,
        `DTSTAMP:${formatDate(new Date())}`,
        `DTSTART:${formatDate(eventData.startDate)}`,
        `DTEND:${formatDate(eventData.endDate)}`,
        `SUMMARY:${eventData.title}`,
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
