<?php

$host = 'localhost';
$db = 'res';
$user = 'root';
$pass = '1234';
$charset = 'utf8mb4';

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

// Declarar $conn como variable global
global $conn;

try {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $conn = new PDO($dsn, $user, $pass, $options);

    // Verificación adicional de conexión
    $conn->query("SELECT 1");

} catch (PDOException $e) {

    throw new PDOException(
        "Error de conexión a la base de datos: " . $e->getMessage() .
        ". Asegúrate de haber ejecutado los comandos SQL de configuración.",
        (int) $e->getCode()
    );
}