from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Configura tu conexión a la base de datos MySQL
def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='1234',  # Asegúrate de usar tu contraseña
        database='reformas'  # La base de datos que creaste
    )

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()  # Recibe los datos enviados desde el frontend

    nombre = data.get('nombre')
    email = data.get('email')
    telefono = data.get('telefono')
    password = data.get('password')

    if not nombre or not email or not telefono or not password:
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Insertar datos en la base de datos
    cursor.execute('INSERT INTO usuarios (nombre, email, telefono, password) VALUES (%s, %s, %s, %s)',
    (nombre, email, telefono, password))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Usuario registrado exitosamente"}), 201

if __name__ == '__main__':
    app.run(debug=True)
