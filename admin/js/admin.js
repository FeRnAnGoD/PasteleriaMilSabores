document.addEventListener('DOMContentLoaded', function() {


  const dateElement = document.getElementById('current-date');


  if (dateElement) {
    const ahora = new Date();
    
    const opcionesDeFecha = {
      dateStyle: 'full',
      timeZone: 'America/Santiago' // Zona horaria de Chile
    };
    
    dateElement.textContent = new Intl.DateTimeFormat('es-CL', opcionesDeFecha).format(ahora);
  }

});