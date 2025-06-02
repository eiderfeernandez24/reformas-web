function mostrarSeccion(categoria) {
    const titulo = {
        cocinas: "Cocinas",
        baños: "Baños",
        dormitorios: "Dormitorios",
        salones: "Salones y Comedores",
        exteriores: "Exteriores"
    };

    const imagenEjemplo = "/imagenes/imagen1.jpg"; // Puedes cambiar esto

    // Cambiar el título
    document.getElementById("titulo-categoria").innerText = titulo[categoria];

    // Mostrar proyectos (aquí solo es ejemplo)
    const galeria = document.getElementById("galeria-categoria");
    galeria.innerHTML = ""; // Limpiar anterior
    for (let i = 1; i <= 3; i++) {
        galeria.innerHTML += `
            <div class="project-card">
                <img src="${imagenEjemplo}" alt="${categoria} ${i}">
                <p>Proyecto ${i} de ${titulo[categoria]}</p>
            </div>
        `;
    }

    document.getElementById("proyectos-detalle").style.display = "block";
    document.getElementById("portadas").style.display = "none";
}




