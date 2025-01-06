document.addEventListener('DOMContentLoaded', function () {
    const skillItems = document.querySelectorAll('.skill-item');
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const closeButton = document.querySelector('.close-button');

    // Datos del popup para cada skill
    const skillTexts = {
        "Diseño y Software": " - Creación de interfaces gráficas y recursos digitales personalizados.\n - Diseño de soluciones gráficas para proyectos educativos y empresariales.",
        "Programación y Desarrollo": " - Creación y personalización de aplicaciones interactivas.\n - Diseño de videojuegos educativos y recreativos con fines específicos.",
        "Redes y Servicio Técnico": " - Mantenimiento y reparación de equipos informáticos.\n - Diagnóstico y solución de problemas técnicos en hardware y software."
    };
    
    

    skillItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const skillTitle = this.getAttribute('data-skill');
            popupTitle.textContent = skillTitle;
            popupText.textContent = skillTexts[skillTitle] || "No hay información adicional disponible.";
            popup.style.display = 'flex';
        });
    });

    closeButton.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});
