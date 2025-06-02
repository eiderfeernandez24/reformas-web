const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'reformas'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida.');
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads')); // Servir imágenes si se acceden desde el frontend

// Crear carpeta de uploads si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configuración de Multer para archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// REGISTRO DE USUARIO
app.post('/api/register', (req, res) => {
    const { nombre, email, telefono, password } = req.body;

    if (!nombre || !email || !telefono || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error al hashear contraseña:', err);
            return res.status(500).json({ success: false, message: 'Error interno.' });
        }

        const query = 'INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)';
        db.query(query, [nombre, email, telefono, hash], (err, result) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ success: false, message: 'Error al registrar.' });
            }

            res.status(200).json({
                success: true,
                message: 'Usuario registrado con éxito.',
                id: result.insertId,
                nombre,
                email
            });
        });
    });
});


// LOGIN DE USUARIO
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email y contraseña requeridos.' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al iniciar sesión.' });
        }

        if (result.length === 0) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas.' });
        }

        const usuario = result[0];

        bcrypt.compare(password, usuario.password, (err, isMatch) => {
            if (err) {
                console.error('Error al comparar contraseñas:', err);
                return res.status(500).json({ success: false, message: 'Error al iniciar sesión.' });
            }

            if (isMatch) {
                res.status(200).json({
                    success: true,
                    message: 'Inicio de sesión exitoso.',
                    user: {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        email: usuario.email
                    }
                });
            } else {
                res.status(401).json({ success: false, message: 'Credenciales incorrectas.' });
            }
        });
    });
});


// GUARDAR PROYECTO CON IMÁGENES
app.post('/api/reformas', upload.array('imagenes'), (req, res) => {
    const {
        usuario_id,
        nombre,
        email,
        telefono,
        direccion,
        descripcion,
        tiporeforma,
        fecha_cita
    } = req.body;

    if (!usuario_id || !nombre || !email || !telefono || !direccion || !descripcion || !tiporeforma || !fecha_cita) {
        return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
    }

    const insertProyecto = `
        INSERT INTO proyectos (usuario_id, nombre_proyecto, tipo_reforma, descripcion, direccion, fecha_cita, ubicacion)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertProyecto, [usuario_id, nombre, tiporeforma, descripcion, direccion, fecha_cita, direccion], (err, result) => {
        if (err) {
            console.error('Error al insertar proyecto:', err);
            return res.status(500).json({ success: false, message: 'Error al guardar proyecto.' });
        }

        const proyectoId = result.insertId;
        const files = req.files;

        if (files && files.length > 0) {
            const values = files.map(file => [proyectoId, file.originalname, file.path]);

            const insertImagenes = `
                INSERT INTO imagenes (proyecto_id, nombre_original, ruta_archivo)
                VALUES ?
            `;

            db.query(insertImagenes, [values], (err2) => {
                if (err2) {
                    console.error('Error al guardar imágenes:', err2);
                    return res.status(500).json({ success: false, message: 'Proyecto guardado, pero error en imágenes.' });
                }

                res.status(200).json({ success: true, message: 'Proyecto guardado con imágenes.' });
            });
        } else {
            res.status(200).json({ success: true, message: 'Proyecto guardado sin imágenes.' });
        }
    });
});


// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
