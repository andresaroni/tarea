const form = document.querySelector("#contactoForm");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const edad = document.querySelector("#edad");
const comentarios = document.querySelector("#comentarios");
const mensajeDiv = document.querySelector("#mensaje");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    limpiarErrores();
    mensajeDiv.innerHTML = "";

    let validado = true;

    if (nombre.value.trim() === "") {
        mostrarError("error-nombre", "El nombre es obligatorio");
        validado = false;
    }

    if (correo.value.trim() === "") {
        mostrarError("error-correo", "El correo es obligatorio");
        validado = false;
    } else if (!validarCorreo(correo.value)) {
        mostrarError("error-correo", "Correo no válido");
        validado = false;
    }

    if (edad.value.trim() === "") {
        mostrarError("error-edad", "La edad es obligatoria");
        validado = false;
    } else if (parseInt(edad.value) <= 17) {
        mostrarError("error-edad", "Debes tener más de 17 años");
        validado = false;
    }

    if (comentarios.value.trim() === "") {
        mostrarError("error-comentarios", "Escribe un comentario");
        validado = false;
    }

    if (validado) {
        const mensaje = document.createElement("p");
        mensaje.textContent = `¡Gracias por contactarnos, ${nombre.value}!`;
        mensaje.classList.add("success");
        mensajeDiv.appendChild(mensaje);
        form.reset();
    }
});

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function mostrarError(idElemento, mensaje) {
    const errorSpan = document.querySelector(`#${idElemento}`);
    errorSpan.textContent = mensaje;
}

function limpiarErrores() {
    const errores = document.querySelectorAll(".error");
    errores.forEach(e => e.textContent = "");
}

[nombre, correo, edad, comentarios].forEach(input => {
    input.addEventListener("input", () => limpiarErrores());
});
