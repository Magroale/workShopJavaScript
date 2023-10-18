
function calcularCalorias() {

    let caloriasResultado = 0;
    let grupoPoblacional = "";

    let campos = {
        nombre: document.getElementById('nombre').value,
        tipoDocumento: document.getElementById('tipoCedula').value,
        numeroDocumento: document.getElementById('cedula').value,
        edad: document.getElementById('edad').value,
        peso: document.getElementById('peso').value,
        altura: document.getElementById('altura').value,
        actividad: document.getElementById('actividad').value,
        genero: document.querySelector('input[name="genero"]:checked').value
    }

    if (validarCampos(campos)) {

        aparecerResultado();
        if (campos.genero.includes("M")) {
            caloriasResultado = campos.actividad * (10 * campos.peso) + (6.25 * campos.altura) - (5 * campos.edad) + 5;
        } else {
            caloriasResultado = campos.actividad * (10 * campos.peso) + (6.25 * campos.altura) - (5 * campos.edad) - 165;
        }

        switch (true) {
            case campos.edad <= 29:
                grupoPoblacional = " jovenes";
                break;

            case campos.edad >= 30 && campos.edad <= 59:
                grupoPoblacional = "adultos";
                break;

            case campos.edad >= 60:
                grupoPoblacional = "mayores";
                break;

            default:
                alert("La edad del paciente no se encuentra en un grupo poblacional definido.");
        }

        resultado.innerHTML =
            `
    <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
    <h5 class="card-title h2">Calorias Requeridas</h5>
    <div class="mb-3 w-100">
        <p class="form-control text-center"> El paciente ${campos.nombre} identificado con ${campos.tipoDocumento}
        NO. ${campos.numeroDocumento}, perteneciente al grupo poblacional de ${grupoPoblacional}, requiere un total de ${Math.floor(caloriasResultado)} kcal
        para el sostenimiento de su TBM</p>
    </div>
    </div>
    `
    } else {
        alert('Por favor, complete todos los campos obligatorios.');
    }

    resetearCampos(campos);
    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
}

function validarCampos(campos) {
    for (const key in campos) {
        if (campos.hasOwnProperty(key) && campos[key].trim() === '') {
            return false;
        }
    }
    return true;
}

function resetearCampos(campos) {
    for (const key in campos) {
        if (campos.hasOwnProperty(key)) {
            campos[key] = '';
        }
    }
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';

    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
