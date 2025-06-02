CREATE DATABASE reformas;

USE reformas;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nombre_proyecto VARCHAR(255) NOT NULL,
    tipo_reforma VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_cita DATETIME NOT NULL,  
    direccion VARCHAR(255) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE imagenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL, 
    nombre_original VARCHAR(255),
    ruta_archivo VARCHAR(255),
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);



