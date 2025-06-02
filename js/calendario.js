// Inicializa Flatpickr en el input de fecha
flatpickr("#fecha-cita", {
    enableTime: true,  // Permite seleccionar la hora
    dateFormat: "Y-m-d H:i", // Formato de fecha y hora
    minDate: "today", // No permite seleccionar fechas pasadas
});