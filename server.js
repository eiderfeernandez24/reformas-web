const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

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

app.use(cors());
app.use(bodyParser.json());

// REGISTRO - Guardar contraseña hasheada
app.post('/api/register', (req, res) => {
    const { nombre, email, telefono, password } = req.body;

    if (!nombre || !email || !telefono || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    // Hashear la contraseña
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

// LOGIN - Comparar con hash
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

        // Comparar la contraseña ingresada con la almacenada (hash)
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
