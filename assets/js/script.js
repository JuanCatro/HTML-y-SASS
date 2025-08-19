document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const btnEnviar = document.getElementById("btnEnviar");
    const mensajeExito = document.getElementById("mensajeExito");

    // Expresiones regulares
    const regexNombre = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const regexCelular = /^3\d{9}$/; // Celulares en Colombia empiezan en 3
    const regexTelefono = /^\d{10,}$/;

    function validarCampo(campo, regex, errorId, mensaje) {
        const valor = campo.value.trim();
        if (!regex.test(valor)) {
            document.getElementById(errorId).innerText = mensaje;
            return false;
        }
        document.getElementById(errorId).innerText = "";
        return true;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let valido = true;

        // Nombre
        if (!validarCampo(nombre, regexNombre, "errorNombre", "Mínimo 3 letras.")) valido = false;

        // Correo
        if (!validarCampo(correo, regexCorreo, "errorCorreo", "Correo inválido.")) valido = false;

        // Password
        if (!validarCampo(password, regexPassword, "errorPassword", "Min 8, 1 mayúscula, 1 número y 1 símbolo.")) valido = false;

        // Confirmar Password
        if (confirmar.value !== password.value) {
            document.getElementById("errorConfirmar").innerText = "Las contraseñas no coinciden.";
            valido = false;
        } else {
            document.getElementById("errorConfirmar").innerText = "";
        }

        // Fecha de nacimiento
        const fechaNacimiento = new Date(fecha.value);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const m = hoy.getMonth() - fechaNacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        if (edad < 18) {
            document.getElementById("errorFecha").innerText = "Debes tener al menos 18 años.";
            valido = false;
        } else {
            document.getElementById("errorFecha").innerText = "";
        }

        // Celular
        if (!validarCampo(celular, regexCelular, "errorCelular", "Número celular inválido (10 dígitos, empieza en 3).")) valido = false;

        // Teléfono opcional
        if (telefono.value.trim() !== "" && !regexTelefono.test(telefono.value.trim())) {
            document.getElementById("errorTelefono").innerText = "Teléfono inválido (mínimo 10 dígitos).";
            valido = false;
        } else {
            document.getElementById("errorTelefono").innerText = "";
        }

        // Términos
        if (!terminos.checked) {
            document.getElementById("errorTerminos").innerText = "Debes aceptar los términos.";
            valido = false;
        } else {
            document.getElementById("errorTerminos").innerText = "";
        }

        // Mensaje final
        if (valido) {
            mensajeExito.innerText = "Registro exitoso 🎉";
            form.reset();
        } else {
            mensajeExito.innerText = "";
        }
    });
});
