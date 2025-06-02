document.getElementById("presupuestoForm").addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("Formulario enviado");

    const tipo = document.querySelector('input[name="tiporeforma"]:checked');
    const metros = document.getElementById("metros-cuadrados").value;

    if (!tipo || !metros) {
        alert("Por favor, complete el formulario.");
        return;
    }

    const precioBase = 500; // Precio base por m² (ejemplo)
    const presupuesto = metros * precioBase;

    const resumen = `
        <span class="negrita">Tipo de reforma: </span>${tipo.value}
        <span class="negrita">Metros cuadrados: </span>${metros} m²
        <span class="negrita">Presupuesto estimado: </span>${presupuesto < 1000 ? presupuesto : presupuesto.toLocaleString('es-ES')} €
    `;

    document.getElementById("resultado-presupuesto").style.display = "block";
    document.getElementById("resultado-presupuesto").innerHTML = `
        <h3>Resultado de tu presupuesto</h3>
        <pre>${resumen}</pre>
        <button onclick="descargarPDF('${tipo.value}', ${metros}, ${presupuesto})">📄 Descargar PDF</button>
    `;
});

function descargarPDF(tipo, metros, presupuesto) {
    console.log("Generando PDF", tipo, metros, presupuesto);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const fecha = new Date().toLocaleDateString("es-ES");
    const nombreEmpresa = "Reformas y Construcciones JES";
    const telefono = "(+34) 910 219 854";
    const telefono2 = "(+34) 658 567 273";
    const email = "espinosa@reformasespinosa.com";
    const direccion = "Calle Luis I, 86 - 3ª Planta Madrid, España"

    const logo = new Image();
    logo.src = "/imagenes/logo.JPG";

    logo.onload = function () {
        // Cabecera
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 30, "F");
        doc.setFont("times", "normal");
        doc.setFontSize(16);
        doc.setTextColor(33, 33, 33);
        doc.text(nombreEmpresa, 10, 20);
        doc.setFontSize(10);
        doc.setTextColor(90, 90, 90);
        doc.text(`Fecha: ${fecha}`, 10, 26);

        // Logo
        doc.addImage(logo, "JPG", 170, 6, 20, 20);

        // Línea divisoria
        doc.setDrawColor(0);
        doc.line(10, 35, 200, 35);

        // Título del presupuesto
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0);


        const pageWidth = doc.internal.pageSize.getWidth();
        const title = "Presupuesto Estimado de Reforma";
        const textWidth = doc.getTextWidth(title);
        const x = (pageWidth - textWidth) / 2;

        doc.text(title, x, 50);  



        // Título de sección
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text("Detalles de la Reforma", 10, 65);


        // Detalles de la reforma
        doc.setFont("times", "normal");
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);

        doc.text(`Tipo de reforma:`, 10, 75); 
        doc.text(`${tipo}`, 50, 75);  

        doc.text(`Metros cuadrados:`, 10, 85);  
        doc.text(`${metros} m²`, 50, 85);  

        doc.text(`Presupuesto estimado:`, 10, 95);  
        doc.setFont("times", "bold");
        doc.text(`${presupuesto.toLocaleString()} €`, 50, 95);  


        // Nueva sección: Descripción de los servicios
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text("Descripción de la reforma:", 10, 110); 
        doc.setFont("times", "normal");
        doc.setFontSize(11);
        doc.text(
        `Realizamos reformas integrales de ${tipo.toLowerCase()}. Trabajamos con materiales de alta calidad y ofrecemos un servicio personalizado.`,
        10,
        120,  // Desplazado de 110 a 120
        { maxWidth: 190 }
        );

        // Nueva sección: Condiciones del presupuesto
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text("Condiciones del presupuesto:", 10, 140);  
        doc.setFont("times", "normal");
        doc.setFontSize(11);
        doc.text("Este presupuesto tiene una validez de 30 días y es orientativo. El presupuesto final puede variar dependiendo de la visita presencial y de los materiales elegidos.", 10, 150, {maxWidth: 190});  // Desplazado de 140 a 150

        // Datos de contacto
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.text("Datos de contacto:", 10, 170);  

        doc.setFont("times", "normal");
        doc.setFontSize(11);
        doc.text(`Dirección:  ${direccion}`, 10, 180);  // Dirección en primer lugar
        doc.text(`Teléfono 1: ${telefono}`, 10, 185);  // Teléfono en segundo lugar
        doc.text(`Teléfono 2: ${telefono2}`, 10, 190);  // Segundo teléfono en tercer lugar
        doc.text(`Email: ${email}`, 10, 195);  // Email en último lugar


        // Pie de página
        doc.setFont("times", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Este presupuesto es estimativo y debe ser validado tras visita presencial.", 10, 280);

        // Guardar el archivo PDF
        doc.save("Presupuesto de tu reforma.pdf");
    };
}


