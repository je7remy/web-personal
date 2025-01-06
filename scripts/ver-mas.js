// Selecciona todas las opiniones ocultas y los botones
const opinionesOcultas = document.querySelectorAll('.opinión.oculta');
const botonVerMas = document.getElementById('ver-mas');
const botonVerMenos = document.getElementById('ver-menos');

// Muestra solo 4 opiniones por fila
const maxOpinionesPorFila = 4;
const totalOpiniones = opinionesOcultas.length;
const totalOpinionesVisibles = document.querySelectorAll('.opinión').length - opinionesOcultas.length;

if (totalOpinionesVisibles >= maxOpinionesPorFila) {
    botonVerMas.style.display = 'block'; // Muestra el botón "Ver más"
}

// Evento para el botón "Ver más"
botonVerMas.addEventListener('click', () => {
    // Muestra las opiniones ocultas
    opinionesOcultas.forEach(opinion => {
        opinion.style.display = 'block';
    });
    // Oculta el botón "Ver más" y muestra "Ver menos"
    botonVerMas.style.display = 'none';
    botonVerMenos.style.display = 'block';
});

// Evento para el botón "Ver menos"
botonVerMenos.addEventListener('click', () => {
    // Oculta las opiniones adicionales
    opinionesOcultas.forEach(opinion => {
        opinion.style.display = 'none';
    });
    // Oculta el botón "Ver menos" y muestra "Ver más"
    botonVerMenos.style.display = 'none';
    botonVerMas.style.display = 'block';
});
