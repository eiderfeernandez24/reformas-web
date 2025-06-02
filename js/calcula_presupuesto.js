document.getElementById('presupuestoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tipoReforma = document.querySelector('input[name="tiporeforma"]:checked')?.value;
    const metrosCuadrados = parseFloat(document.getElementById('metros-cuadrados').value);

    if (isNaN(metrosCuadrados) || metrosCuadrados <= 0) {
        document.getElementById('resultado-presupuesto').innerText = 'Por favor, introduce un número válido de metros cuadrados.';
        document.getElementById('resultado-presupuesto').style.display = 'block';
        return;
    }

    let precioPorMetroCuadrado;

    // Lógica de precio por metro cuadrado para cada tipo de reforma
    switch(tipoReforma) {
        case 'cocina':
            precioPorMetroCuadrado = 250; // Ejemplo de precio por metro cuadrado
            break;
        case 'baño':
            precioPorMetroCuadrado = 350; // Ejemplo de precio por metro cuadrado
            break;
        case 'dormitorio':
            precioPorMetroCuadrado = 150; // Ejemplo de precio por metro cuadrado
            break;
        case 'salon':
            precioPorMetroCuadrado = 200; // Ejemplo de precio por metro cuadrado
            break;
        case 'exteriores':
            precioPorMetroCuadrado = 180; // Ejemplo de precio por metro cuadrado
            break;
        case 'oficina':
            precioPorMetroCuadrado = 220; // Ejemplo de precio por metro cuadrado
            break;
        default:
            document.getElementById('resultado-presupuesto').innerText = 'Por favor, selecciona un tipo de reforma.';
            document.getElementById('resultado-presupuesto').style.display = 'block';
            return;
    }

    

    // Calcular el presupuesto estimado
    const presupuestoEstimado = metrosCuadrados * precioPorMetroCuadrado;

    // Mostrar el resultado en la página
    const resultado = document.getElementById('resultado-presupuesto');
    resultado.innerText = `El presupuesto estimado para una reforma de ${tipoReforma} de ${metrosCuadrados} m² es de ${presupuestoEstimado.toLocaleString()}€`;
    resultado.style.display = 'block'; // Mostrar el resultado
});

    document.getElementById("presupuestoForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Evita que recargue la página

        const tipoReforma = document.querySelector('input[name="tiporeforma"]:checked').value;
        const metrosCuadrados = parseFloat(document.getElementById("metros-cuadrados").value);

        // Ejemplo simple de cálculo de presupuesto
        const precioPorMetro = 500; // Puedes ajustar según tipoReforma si quieres
        const presupuestoEstimado = precioPorMetro * metrosCuadrados;

        // Mostrar resultado
        const resultado = document.getElementById("resultado-presupuesto");
        resultado.style.display = "block";
        resultado.innerHTML = `
            <p>El presupuesto estimado para una reforma de <strong>${tipoReforma}</strong> de <strong>${metrosCuadrados}</strong> m² es de <strong>${presupuestoEstimado.toLocaleString()}€</strong>.</p>
            <p>¿Estás interesado?</p>
            <a href="contactanos.html">
                <button type="button">Contáctanos</button>
            </a>
        `;
    });
