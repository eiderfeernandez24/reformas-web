document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split("/").pop(); // Obtiene el nombre de la página actual.
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (item.href.includes(currentPage)) {
            item.classList.add('active'); // Agrega una clase "active" al enlace correspondiente.
        }
    });
});
