function updateRating() {
    var ratings = document.querySelectorAll('.rating');

    ratings.forEach(function (ratingContainer) {
        var ratingValue = parseFloat(ratingContainer.getAttribute('data-rating'));

        // Si el valor es -1, no mostramos las estrellas pero mantenemos el espacio
        if (ratingValue === -1) {
            for (var i = 0; i < 5; i++) {
                var star = document.createElement('div');
                star.classList.add('star', 'hidden-star');
                ratingContainer.appendChild(star);
            }
            return; // Salimos de la función para esta iteración
        }

        var normalizedRating = ratingValue / 2;

        for (var i = 0; i < 5; i++) {
            var star = document.createElement('div');
            star.classList.add('star');

            if (normalizedRating >= 1) {
                star.classList.add('filled');
            } else if (normalizedRating > 0) {
                var decimal = normalizedRating - Math.floor(normalizedRating);
                if (decimal >= 0.5) {
                    star.classList.add('half-filled');
                } else {
                    star.classList.add('empty');
                }
            } else {
                star.classList.add('empty');
            }

            ratingContainer.appendChild(star);
            normalizedRating--;
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const nsfwToggle = document.getElementById('nsfwToggle');

    function toggleNsfwImages(display) {
        const nsfwImages = document.querySelectorAll('.portfolio-image[data-nsfw="true"]');
        nsfwImages.forEach(img => {
            if (display) {
                img.classList.remove('nsfw-hidden'); // Hace visible la imagen con desenfoque
                img.style.filter = 'blur(8px)';
                img.onclick = function () {
                    if (nsfwToggle.checked) { // Solo permite quitar el desenfoque si el interruptor está activado
                        this.style.filter = 'none';
                    }
                };
            } else {
                img.classList.add('nsfw-hidden'); // Oculta la imagen
                img.style.filter = ''; // Quita cualquier filtro aplicado
                img.onclick = null; // Remueve el manejador de clic
            }
        });
    }

    nsfwToggle.addEventListener('change', function () {
        toggleNsfwImages(this.checked);
    });

    // Inicializa la funcionalidad NSFW basada en el estado del interruptor
    toggleNsfwImages(nsfwToggle.checked);

    // Llama a updateRating para inicializar las calificaciones
    updateRating();
});

// Desplazamiento suave para los enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

window.addEventListener('load', function () {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        images[i].ondragstart = function () { return false; };
    }
});
