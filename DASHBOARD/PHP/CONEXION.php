<?php
// CONEXION.php - Configuración compatible con XAMPP
$host = 'localhost';
$db   = 'pizzeria';  // Nombre de tu base de datos
$user = 'root';      // Usuario por defecto de XAMPP
$pass = 'abner';          // Contraseña vacía por defecto en XAMPP
$charset = 'utf8mb4';

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
    // Forzar el método de autenticación compatible
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
];

try {
    // Conexión con parámetro adicional para autenticación
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $conn = new PDO($dsn, $user, $pass, $options);
    
    // Verificación adicional de conexión
    $conn->query("SELECT 1");
} catch (PDOException $e) {
    // Mensaje de error más descriptivo
    die("Error de conexión a la base de datos: " . $e->getMessage() . 
        ". Asegúrate de haber ejecutado los comandos SQL de configuración.");
}
?>