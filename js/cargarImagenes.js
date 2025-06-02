document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("button");
    const items = document.querySelectorAll(".flip-card");
    let currentIndex = 0; // Empezamos con las primeras 3 imágenes por mostrar

    // Función para mostrar las siguientes 3 tarjetas
    function loadMoreItems() {
        let count = 0;

        // Verificar si ya no hay más imágenes para cargar
        if (currentIndex >= items.length) {
            button.style.display = "none"; // Ocultamos el botón si no hay más imágenes
            return; // Salimos del evento si no hay más imágenes
        }

        // Mostrar las siguientes 3 imágenes
        for (let i = currentIndex; i < currentIndex + 3 && i < items.length; i++) {
            if (items[i]) {
                items[i].style.display = "block"; // Mostramos la tarjeta
            }
            currentIndex++;
            count++;
        }

        // Si ya no hay más imágenes, ocultamos el botón
        if (currentIndex >= items.length) {
            button.style.display = "none"; // Ocultamos el botón cuando ya no hay más imágenes
        }
    }

    // Inicialmente mostrar las primeras 3 imágenes
    loadMoreItems();

    // Escuchar el clic en el botón para cargar más imágenes
    button.addEventListener("click", loadMoreItems);
});
