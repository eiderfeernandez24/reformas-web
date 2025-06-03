# 🏠 Reformas y Construcciones JES

Bienvenido a **Reformas y Construcciones JES**, tu plataforma para transformar tu hogar con estilo, eficiencia y profesionalismo.  
Desde cocinas y baños hasta oficinas y exteriores, ¡tenemos todo lo que necesitas para tu reforma ideal!

---

## 🚀 Funcionalidades principales

- 👤 **Acceso personalizado**  
  Regístrate y accede a tu perfil de forma segura mediante autenticación protegida.

- 🖼️ **Inspiración real con proyectos**  
  Explora una galería de reformas reales en cocinas, salones, baños, exteriores y más.

- 🛠️ **Calidad garantizada con marcas líderes**  
  Trabajamos con marcas como **Roca**, **Saltoki**, **Geotiles**, **Cosmic**, y más.

- 📝 **Formulario de solicitud de reformas**  
  Envíanos directamente tu proyecto desde la sección “Contáctanos”.

- 📄 **Presupuestos instantáneos en PDF**  
  Calcula el precio estimado de tu reforma según los metros cuadrados y descarga tu presupuesto al instante.

---

## 🧩 Estructura del proyecto

src/
├── css/
│   ├── cocina.css
│   ├── contactanos.css
│   ├── galeriaProyectos.css
│   ├── index.css
│   ├── login.css
│   ├── marcas.css
│   ├── política_privacidad.css
│   ├── registro.css
│   ├── terminos_condiciones.css
│   └── terminos_uso.css
│
├── imagenes/
│   ├── cosmic-sinfondo.png
│   ├── cosmic.png
│   ├── geotiles-sinfondo.png
│   ├── geotiles.png
│   ├── honnun-sinfondo.png
│   ├── honnun.png
│   ├── icono-casa.png
│   ├── icono-edificio.png
│   ├── icono-locales.png
│   ├── icono-oficina.png
│   ├── imagen1.png
│   ├── imAGEN2.png
│   ├── imagen3.png
│   ├── LEVANTINA_logo.webp
│   ├── logo.JPG
│   ├── roca-sinfondo.png
│   ├── roca.png
│   ├── saltoki.sinfondo.webp
│   └── saltoki.jpg
│
├── js/
│   ├── activarenlace.js
│   ├── calcula_presupuesto.js
│   ├── calendario.js
│   ├── cargarImagenes.js
│   ├── desplegable.js
│   ├── galeria.js
│   ├── girar_imagen.js
│   └── pdf_reforma.js
│
├── app.py
├── baño.html
├── blog.html
├── cocina.html
├── contactanos.html
├── dormitorio.html
├── exterior.html
├── galeria_proyectos.html
├── index.html
├── login.html
├── marcas.html
├── package.json
├── package-lock.json
├── planos_de_obra.html
├── plítica_privacidad.html
├── readme.md
├── registro.html
├── salones_comedor.html
├── server.js
├── sobre_nosotros.html
├── terminos_condiciones.html
└── terminos_uso.html



Tecnologias utilizadas:

- Fronted:
    - HTML5
    - CSS3 (ubicado en src/css)
    - JavaScript (funcionalidades interactivas en js/)


- Backend:
    - Python (Flask) – para funcionalidades adicionales (app.py)
    - Node.js – gestión del servidor y conexión a base de datos (server.js)


- Base de Datos:
    - MySQL (estructura documentada en BBDD.md)


- Generación de documentos:
    - PDF generado automáticamente con los datos del usuario (pdf_reforma.js)



Cómo ejecutar el proyecto expliacado por pasos:

    Paso 1:
        - Estar en la carpeta del proyecto y abrir el PowerShell

    Paso 2:
        - Instalar dependencias del backend (Node.js) mediante el comando 'npm install'

        Recuerda configurar correctamente las credenciales de la base de datos en server.js.

    Paso 3:
        - Iniciar el servidor mediante el comando 'node server.js'

    Paso 4:
        - (Opcional) Ejecutar Flask (si se utiliza app.py) mediante el comando 'python app.py'.

    Paso 5:
        - Acceder desde el navegador: http://localhost:3000 o el puerto definido en el archivo server.js