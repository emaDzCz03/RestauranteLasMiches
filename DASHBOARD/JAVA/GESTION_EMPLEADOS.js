document.addEventListener('DOMContentLoaded', function () {
    // Inicializar tooltips si es necesario
    inicializarTooltips();

    // Configurar validación del formulario
    const formCrear = document.getElementById('form-crear-empleado');
    if (formCrear) {
        formCrear.addEventListener('submit', validarFormularioCrear);
    }

    // Cerrar modal al hacer clic fuera
    const modal = document.getElementById('modalEliminar');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                cerrarModalEliminar();
            }
        });
    }

    // Mostrar mensajes temporales
    mostrarMensajesTemporales();
});

function inicializarTooltips() {
    // Inicializar tooltips si se usa alguna librería
    console.log('Tooltips inicializados');
}

function validarFormularioCrear(e) {
    const contraseña = document.getElementById('contraseña');
    const usuario = document.getElementById('usuario');
    let isValid = true;

    // Validar longitud mínima de contraseña
    if (contraseña.value.length < 6) {
        mostrarError(contraseña, 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    } else {
        limpiarError(contraseña);
    }

    // Validar formato de usuario (solo letras y números)
    const usuarioRegex = /^[a-zA-Z0-9]+$/;
    if (!usuarioRegex.test(usuario.value)) {
        mostrarError(usuario, 'El usuario solo puede contener letras y números');
        isValid = false;
    } else {
        limpiarError(usuario);
    }

    if (!isValid) {
        e.preventDefault();
        mostrarToast('Por favor corrige los errores en el formulario', 'error');
    }
}

function mostrarError(campo, mensaje) {
    limpiarError(campo);
    campo.style.borderColor = '#e74c3c';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensaje}`;

    campo.parentNode.appendChild(errorDiv);
}

function limpiarError(campo) {
    campo.style.borderColor = '#e1e8ed';
    const errorDiv = campo.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function abrirModalEliminar(idEmpleado, nombreEmpleado) {
    const modal = document.getElementById('modalEliminar');
    const textoConfirmacion = document.getElementById('textoConfirmacion');
    const idInput = document.getElementById('id_empleado_eliminar');

    textoConfirmacion.textContent = `¿Está seguro que desea eliminar al empleado: ${nombreEmpleado}?`;
    idInput.value = idEmpleado;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarModalEliminar() {
    const modal = document.getElementById('modalEliminar');
    const form = document.getElementById('form-eliminar-empleado');

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';

    // Limpiar formulario
    if (form) {
        form.reset();
    }
}

function mostrarToast(mensaje, tipo = 'info') {
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${tipo === 'success' ? 'check' : tipo === 'error' ? 'exclamation' : 'info'}-circle"></i>
            <span>${mensaje}</span>
        </div>
    `;

    // Estilos del toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#27ae60' : tipo === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(toast);

    // Remover después de 5 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

function mostrarMensajesTemporales() {
    // Si hay un mensaje de éxito, mostrar toast
    const alertSuccess = document.querySelector('.alert-success');
    if (alertSuccess) {
        const mensaje = alertSuccess.textContent.trim();
        mostrarToast(mensaje, 'success');
    }

    // Si hay un mensaje de error, mostrar toast
    const alertError = document.querySelector('.alert-error');
    if (alertError) {
        const mensaje = alertError.textContent.trim();
        mostrarToast(mensaje, 'error');
    }
}

// Estilos CSS para animaciones del toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
document.head.appendChild(style);

// Exportar funciones para uso global
window.abrirModalEliminar = abrirModalEliminar;
window.cerrarModalEliminar = cerrarModalEliminar;