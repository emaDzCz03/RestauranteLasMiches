<?php
session_start();

// Evitar caché del navegador
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

$host = 'localhost';
$db = 'pizzeria';
$user = 'root';
$pass = 'abner';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Inicializar variables
$mensaje = '';
$mostrarMensaje = false;

// Procesar formulario solo si es POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = $_POST['username'] ?? '';
    $clave = $_POST['password'] ?? '';

    // Validar que no estén vacíos
    if (empty($usuario) || empty($clave)) {
        $mensaje = "⚠️ Por favor, complete todos los campos.";
        $mostrarMensaje = true;
    } else {
        $stmt = $pdo->prepare("SELECT id_empleado, nombre, contraseña, tipo 
                               FROM empleados 
                               WHERE usuario = ?");
        $stmt->execute([$usuario]);
        $user_data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user_data) {
            // Verificar contraseña (comparación directa ya que no está encriptada)
            if ($clave === $user_data['contraseña']) {

                // Verificar tipo de empleado permitido
                if ($user_data['tipo'] === 'venta' || $user_data['tipo'] === 'recepcionista') {

                    // Guardar datos en sesión
                    $_SESSION['empleado_id'] = $user_data['id_empleado'];
                    $_SESSION['empleado_tipo'] = $user_data['tipo'];
                    $_SESSION['empleado_nombre'] = $user_data['nombre'];

                    // Redirigir según el tipo de empleado
                    if ($user_data['tipo'] === 'venta') {
                        header("Location: ../DASHBOARD/MENU_VENTAS.html");
                    } else {
                        header("Location: ../DASHBOARD/MESAS.html");
                    }
                    exit;

                } else {
                    $mensaje = "⚠️ Solo los empleados de ventas o recepcionistas pueden ingresar aquí.";
                    $mostrarMensaje = true;
                }

            } else {
                $mensaje = "❌ Contraseña incorrecta.";
                $mostrarMensaje = true;
            }
        } else {
            $mensaje = "❌ Usuario no encontrado.";
            $mostrarMensaje = true;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Empleados - Las Miches</title>
    <link rel="stylesheet" href="../CSS/CSS_EMP.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link rel="icon" type="image/x-icon" href="../IMAGES/pizza.ico">
</head>

<body>
    <img src="../IMAGES/hamburguesa.ico" alt="Decoración" class="agave-decoration agave-1 floating"
        style="animation-delay: 0s;" />
    <img src="../IMAGES/pizza.ico" alt="Decoración" class="agave-decoration agave-2 floating"
        style="animation-delay: 2s;" />

    <div class="login-container">
        <div class="glass-effect"></div>
        <div class="logo">
            <h1>Las Miches</h1>
            <p>Sabores ancestrales, experiencias modernas</p>
            <img src="../IMAGES/CERVEZIN.PNG" alt="Logo" class="logo-img" />
        </div>

        <!-- Formulario de inicio de sesión -->
        <form action="<?= htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="POST" autocomplete="off">
            <div class="input-group">
                <i class="fas fa-user"></i>
                <input type="text" id="username" name="username" placeholder="Nombre de usuario" required
                    autocomplete="username" />
            </div>

            <div class="input-group">
                <i class="fas fa-lock"></i>
                <input type="password" id="password" name="password" placeholder="Contraseña" required
                    autocomplete="current-password" />
            </div>

            <button type="submit" class="btn-login">Ingresar</button>
        </form>

        <!-- Mostrar mensaje solo cuando sea necesario -->
        <?php if ($mostrarMensaje && !empty($mensaje)): ?>
            <div class="mensaje-error">
                <?= htmlspecialchars($mensaje) ?>
            </div>
        <?php endif; ?>

        <p class="footer-text">Cuenta de Empleados de Ventas y Recepcionistas</p>
    </div>

</body>

</html>