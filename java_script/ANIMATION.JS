document.addEventListener("DOMContentLoaded", () => {
    const cervezin = document.getElementById("cervezin");

    const animaciones = [
        () => {
            // Rotación
            cervezin.style.transition = "transform 1s ease-in-out";
            cervezin.style.transform = "rotate(360deg)";
            setTimeout(() => cervezin.style.transform = "rotate(0deg)", 1000);
        },
        () => {
            // Agrandamiento (Zoom In)
            cervezin.style.transition = "transform 0.5s ease-in-out";
            cervezin.style.transform = "scale(1.5)";
            setTimeout(() => cervezin.style.transform = "scale(1)", 500);
        },
        () => {
            // Rebote vertical
            cervezin.style.transition = "transform 0.6s ease";
            cervezin.style.transform = "translateY(-20px)";
            setTimeout(() => cervezin.style.transform = "translateY(0)", 600);
        }
    ];

    // Función para aplicar una animación aleatoria cada 3 segundos
    setInterval(() => {
        const animacion = animaciones[Math.floor(Math.random() * animaciones.length)];
        animacion();
    }, 3000);
});


document.addEventListener("DOMContentLoaded", () => {
    const cervezin = document.getElementById("cervezin");

    const animaciones = [
        () => {
            // Rotación
            cervezin.style.transition = "transform 1s ease-in-out";
            cervezin.style.transform = "rotate(360deg)";
            setTimeout(() => cervezin.style.transform = "rotate(0deg)", 1000);
        },
        () => {
            // Agrandamiento (Zoom In)
            cervezin.style.transition = "transform 0.5s ease-in-out";
            cervezin.style.transform = "scale(1.5)";
            setTimeout(() => cervezin.style.transform = "scale(1)", 500);
        },
        () => {
            // Rebote vertical
            cervezin.style.transition = "transform 0.6s ease";
            cervezin.style.transform = "translateY(-20px)";
            setTimeout(() => cervezin.style.transform = "translateY(0)", 600);
        }
    ];

    // Función para aplicar una animación aleatoria cada 3 segundos
    setInterval(() => {
        const animacion = animaciones[Math.floor(Math.random() * animaciones.length)];
        animacion();
    }, 3000);

    // === NUEVAS ANIMACIONES AL PASAR EL MOUSE ===
    const animacionesHover = [
        () => {
            // Giro horizontal (flip)
            cervezin.style.transition = "transform 0.8s ease";
            cervezin.style.transform = "rotateY(180deg)";
            setTimeout(() => cervezin.style.transform = "rotateY(0deg)", 800);
        },
        () => {
            // Temblor (shake)
            cervezin.style.transition = "transform 0.1s";
            let i = 0;
            const shake = setInterval(() => {
                cervezin.style.transform = `translateX(${i % 2 === 0 ? 5 : -5}px)`;
                i++;
                if (i > 10) {
                    clearInterval(shake);
                    cervezin.style.transform = "translateX(0)";
                }
            }, 50);
        },
        () => {
            // Rebote más grande
            cervezin.style.transition = "transform 0.8s ease";
            cervezin.style.transform = "translateY(-40px)";
            setTimeout(() => cervezin.style.transform = "translateY(0)", 800);
        }
    ];

    // Evento al pasar el mouse
    cervezin.addEventListener("mouseenter", () => {
        const animacion = animacionesHover[Math.floor(Math.random() * animacionesHover.length)];
        animacion();
    });
});
