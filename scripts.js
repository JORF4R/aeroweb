const parkingAvailability = [
    { date: '2024-10-01', availableSlots: 10 },
    { date: '2024-10-02', availableSlots: 8 },
    { date: '2024-10-03', availableSlots: 15 },
    { date: '2024-10-04', availableSlots: 5 },
    { date: '2024-10-05', availableSlots: 12 },
    { date: '2024-10-06', availableSlots: 7 },
    { date: '2024-10-07', availableSlots: 10 },
    { date: '2024-10-08', availableSlots: 9 },
    { date: '2024-10-09', availableSlots: 0 },
    { date: '2024-10-10', availableSlots: 6 },
    { date: '2024-10-11', availableSlots: 11 },
    { date: '2024-10-12', availableSlots: 3 },
    { date: '2024-10-13', availableSlots: 14 },
    { date: '2024-10-14', availableSlots: 4 },
    { date: '2024-10-15', availableSlots: 8 },
    { date: '2024-10-16', availableSlots: 2 },
    { date: '2024-10-17', availableSlots: 5 },
    { date: '2024-10-18', availableSlots: 12 },
    { date: '2024-10-19', availableSlots: 9 },
    { date: '2024-10-20', availableSlots: 10 },
    { date: '2024-10-21', availableSlots: 5 },
    { date: '2024-10-22', availableSlots: 0 },
    { date: '2024-10-23', availableSlots: 12 },
    { date: '2024-10-24', availableSlots: 8 },
    { date: '2024-10-25', availableSlots: 15 },
    { date: '2024-10-26', availableSlots: 7 },
    { date: '2024-10-27', availableSlots: 10 },
    { date: '2024-10-28', availableSlots: 3 },
    { date: '2024-10-29', availableSlots: 9 },
    { date: '2024-10-30', availableSlots: 0 },
    { date: '2024-10-31', availableSlots: 14 }
];


document.getElementById('parking-reservation-form').addEventListener('submit', function(e) {
e.preventDefault();

// Mostrar spinner de carga
document.getElementById('loading-spinner').style.display = 'block';

// Ocultar el botón de reserva
document.getElementById('reserve-button-container').style.display = 'none';

// Obtener valores del formulario
const reservationDate = document.getElementById('reservationDate').value;
const entryTime = document.getElementById('entryTime').value;
const exitTime = document.getElementById('exitTime').value;

// Validación de horas
if (entryTime >= exitTime) {
    document.getElementById('availability-result').style.display = 'none';
    alert("La hora de entrada debe ser menor que la hora de salida.");
    document.getElementById('loading-spinner').style.display = 'none';
    return;
}

// Simular verificación de disponibilidad
setTimeout(() => {
    const availability = parkingAvailability.find(slot => slot.date === reservationDate);

    document.getElementById('loading-spinner').style.display = 'none';
    const availabilityResult = document.getElementById('availability-result');
    const reserveButtonContainer = document.getElementById('reserve-button-container');
    const placa = document.getElementById('placa-vehiculo').value;
    if (availability && availability.availableSlots > 0) {
        availabilityResult.classList.remove('alert-danger');
        availabilityResult.classList.add('alert-success');
        availabilityResult.innerHTML = `Hay ${availability.availableSlots} espacios disponibles para la fecha seleccionada.`;

        // Mostrar botón de reservar
        reserveButtonContainer.style.display = 'block';

        // Añadir evento al botón de reservar
        document.getElementById('reserve-button').onclick = function() {
            // Realizar la reserva
            availability.availableSlots--; // Reducir los espacios disponibles

            // Actualizar el mensaje de disponibilidad
            availabilityResult.innerHTML = `Reserva confirmada para el vehiculo ${placa}. Espacios restantes: ${availability.availableSlots}.`;

            // Ocultar el botón de reservar tras la reserva
            reserveButtonContainer.style.display = 'none';
        };
    } else {
        availabilityResult.classList.remove('alert-success');
        availabilityResult.classList.add('alert-danger');
        availabilityResult.innerHTML = `No hay espacios disponibles para la fecha seleccionada.`;

        // Ocultar el botón de reservar si no hay espacios
        reserveButtonContainer.style.display = 'none';
    }

    availabilityResult.style.display = 'block';
}, 1000); // Simula la verificación con un retraso de 1 segundo
});
document.addEventListener('DOMContentLoaded', function() {
    const employeeForm = document.getElementById('employee-form');
    const employeeTableBody = document.getElementById('employeeTableBody');

    // Cargar empleados de localStorage
    let empleados = JSON.parse(localStorage.getItem('empleados')) || [];

    // Función para renderizar empleados
    function renderEmployees() {
        employeeTableBody.innerHTML = '';
        empleados.forEach((empleado, index) => {
            const row = `
                <tr>
                    <td>${empleado.nombre}</td>
                    <td>${empleado.rol}</td>
                    <td>${empleado.acceso}</td>
                    <td>${empleado.turno}</td>
                    <td>${empleado.estado}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarEmpleado(${index})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarEmpleado(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
            employeeTableBody.innerHTML += row;
        });
    }

    // Guardar empleados en localStorage
    function saveEmployees() {
        localStorage.setItem('empleados', JSON.stringify(empleados));
        renderEmployees();
    }

    // Manejar el envío del formulario
    employeeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre-empleado').value;
        const rol = document.getElementById('rol-empleado').value;
        const acceso = document.getElementById('area-acceso').value;
        const turno = document.getElementById('turno-empleado').value;
        const estado = document.getElementById('estado-empleado').value;

        empleados.push({ nombre, rol, acceso, turno, estado });
        saveEmployees();

        // Resetear formulario
        employeeForm.reset();
    });

    // Función para eliminar empleado
    window.eliminarEmpleado = function(index) {
        empleados.splice(index, 1);
        saveEmployees();
    }

    // Función para editar empleado (simplificada)
    window.editarEmpleado = function(index) {
        const empleado = empleados[index];
        document.getElementById('nombre-empleado').value = empleado.nombre;
        document.getElementById('rol-empleado').value = empleado.rol;
        document.getElementById('area-acceso').value = empleado.acceso;
        document.getElementById('turno-empleado').value = empleado.turno;
        document.getElementById('estado-empleado').value = empleado.estado;

        empleados.splice(index, 1); // Eliminar temporalmente para que se actualice
    }

    // Inicializar la tabla al cargar la página
    renderEmployees();
});

//--------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function() {
    const incidenceForm = document.getElementById('incidence-form');
    const incidenceCards = document.getElementById('incidenceCards');
    let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];
    let editingIndex = null;  // Para saber si estamos editando una incidencia

    // Función para renderizar las incidencias en tarjetas horizontales
    function renderIncidencias() {
        incidenceCards.innerHTML = '';  // Limpiar el contenedor de tarjetas
        incidencias.forEach((incidencia, index) => {
            const card = `
                <div class="card mb-3" style="width: 100%;" data-index="${index}">
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${incidencia.tipo}</h5>
                                <p class="card-text">
                                    <strong>Descripción:</strong> ${incidencia.descripcion}<br>
                                    <strong>Fecha:</strong> ${formatFecha(incidencia.fecha)}<br>
                                    <strong>Estado:</strong> ${incidencia.estado}
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4 d-flex align-items-center">
                            <div class="card-body">
                                <button class="btn btn-warning btn-sm editar" data-index="${index}">Editar</button>
                                <button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            incidenceCards.innerHTML += card;
        });

        // Asignar eventos a los botones de editar y eliminar después de renderizar
        document.querySelectorAll('.editar').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                editarIncidencia(index);
            });
        });

        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                eliminarIncidencia(index);
            });
        });
    }

    // Guardar las incidencias en localStorage
    function saveIncidencias() {
        localStorage.setItem('incidencias', JSON.stringify(incidencias));
        renderIncidencias();
    }

    // Manejar el envío del formulario de incidencias
    incidenceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const tipo = document.getElementById('tipo-incidencia').value;
        const descripcion = document.getElementById('descripcion').value;
        const fecha = document.getElementById('fecha').value;
        const estado = document.getElementById('estado').value;

        if (editingIndex === null) {
            // Si no estamos editando, añadimos una nueva incidencia
            incidencias.push({ tipo, descripcion, fecha, estado });
        } else {
            // Si estamos editando, actualizamos la incidencia
            incidencias[editingIndex] = { tipo, descripcion, fecha, estado };
            editingIndex = null;  // Resetear el índice de edición
        }

        saveIncidencias();  // Guardar y renderizar
        incidenceForm.reset();  // Limpiar el formulario
    });

    // Función para formatear la fecha en DD/MM/YYYY
    function formatFecha(fecha) {
        if (!fecha || !fecha.includes('-')) {
            return 'Fecha no válida';
        }
        
        const [year, month, day] = fecha.split('-');
        return `${day}/${month}/${year}`;
    }

    // Función para eliminar una incidencia
    function eliminarIncidencia(index) {
        // Confirmar eliminación
        if (confirm("¿Estás seguro de que quieres eliminar esta incidencia?")) {
            incidencias.splice(index, 1);  // Eliminar la incidencia
            saveIncidencias();  // Guardar cambios y renderizar nuevamente
        }
    }

    // Función para editar una incidencia
    function editarIncidencia(index) {
        const incidencia = incidencias[index];
        // Cargar los datos en el formulario
        document.getElementById('tipo-incidencia').value = incidencia.tipo;
        document.getElementById('descripcion').value = incidencia.descripcion;
        document.getElementById('fecha').value = incidencia.fecha;
        document.getElementById('estado').value = incidencia.estado;
        editingIndex = index;  // Guardar el índice de edición
    }

    // Inicializar la renderización de incidencias
    renderIncidencias();
});

//--------------------------------------------------------------------------------------------//
// URL de la API con tu APPID
// URL de la API con tu clave API
// Clave de la API
const apiKey = '9eef21e320b55e643c3d93d313317346'; // Reemplaza con tu clave
const ciudad = 'London,uk'; 
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9eef21e320b55e643c3d93d313317346`;

// Función para convertir de Kelvin a Celsius
function kelvinACelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}

// Función para convertir la hora en formato UNIX a una hora legible
function convertirHora(unixTimestamp, zonaHoraria) {
    const fecha = new Date((unixTimestamp + zonaHoraria) * 1000);
    return fecha.toUTCString().slice(17, 22); // Muestra solo horas y minutos
}

// Llamada a la API para obtener los datos del clima
fetch(apiUrl)
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        return respuesta.json();
    })
    .then(datos => {
        console.log(datos); // Muestra los datos en la consola para depuración

        // Actualiza el contenido del HTML con los datos de la API
        document.getElementById('nombre-ciudad').textContent = datos.name;
        document.getElementById('coordenadas').textContent = `${datos.coord.lat}, ${datos.coord.lon}`;
        document.getElementById('temperatura').textContent = kelvinACelsius(datos.main.temp);
        document.getElementById('sensacion-termica').textContent = kelvinACelsius(datos.main.feels_like);
        document.getElementById('descripcion-clima').textContent = datos.weather[0].description;
        document.getElementById('velocidad-viento').textContent = datos.wind.speed;
        document.getElementById('humedad').textContent = datos.main.humidity;
        document.getElementById('amanecer').textContent = convertirHora(datos.sys.sunrise, datos.timezone);
        document.getElementById('atardecer').textContent = convertirHora(datos.sys.sunset, datos.timezone);
    })
    .catch(error => {
        console.error('Error al obtener los datos del clima:', error);
    });

