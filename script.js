document.addEventListener('DOMContentLoaded', function() {
    
    const formulario = document.querySelector('.formulario-vintage');

    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault(); 

            const nombre = document.getElementById('nombre').value;
            const tipo = document.getElementById('tipo').value;
            const lugar = document.getElementById('lugar').value;
            const descripcion = document.getElementById('descripcion').value;

            const textoArchivo = 
`---- NUEVA SUGERENCIA PARA EL ARCHIVO ----
/Nombre: ${nombre}
/Formato: ${tipo}
/Lugar: ${lugar}
/Descripción: ${descripcion}
--------------------------------------------
Sera revisada la propuesto y en casa de ser aceptada actualizarte la pagina lo mas pronto posible`;

            const blob = new Blob([textoArchivo], { type: 'text/plain;charset=utf-8' });
            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = URL.createObjectURL(blob);
            
            const nombreArchivo = nombre.replace(/\s+/g, '_');
            enlaceDescarga.download = `Sugerencia_${nombreArchivo}.txt`; 

            enlaceDescarga.click();
            URL.revokeObjectURL(enlaceDescarga.href);
            formulario.reset();
            
            alert('¡Tu sugerencia se ha guardado y descargado correctamente!');
        });
    }

    const contenedoresEstrellas = document.querySelectorAll('.calificacion-estrellas');

    contenedoresEstrellas.forEach((contenedor, indiceContenedor) => {
        const estrellas = contenedor.querySelectorAll('span');
        const itemId = `calificacion_item_${indiceContenedor}`; 

        const calificacionGuardada = localStorage.getItem(itemId);
        if (calificacionGuardada) {
            marcarEstrellas(estrellas, calificacionGuardada);
            contenedor.dataset.calificacion = calificacionGuardada;
        }

        estrellas.forEach((estrella, indiceEstrella) => {
            const valorEstrella = indiceEstrella + 1;

            estrella.addEventListener('mouseover', () => {
                marcarEstrellas(estrellas, valorEstrella);
            });

            estrella.addEventListener('mouseout', () => {
                const calificacionActual = contenedor.dataset.calificacion || 0;
                marcarEstrellas(estrellas, calificacionActual);
            });

            estrella.addEventListener('click', () => {
                contenedor.dataset.calificacion = valorEstrella;
                localStorage.setItem(itemId, valorEstrella);
                
                estrella.style.transform = 'scale(1.4)';
                setTimeout(() => {
                    estrella.style.transform = 'scale(1.15)';
                }, 150);
            });
        });
    });

    function marcarEstrellas(arregloEstrellas, valor) {
        arregloEstrellas.forEach((estrella, indice) => {
            if (indice < valor) {
                estrella.classList.add('activa');
            } else {
                estrella.classList.remove('activa');
            }
        });
    }

});