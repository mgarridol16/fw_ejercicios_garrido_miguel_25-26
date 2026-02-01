console.log("====== Utilities =====");
export class Utilities {
    static getISOWeek(fecha) {
        const año = fecha.getFullYear();
        const inicioAño = new Date(año, 0, 1);
        const milisegundosPorDia = 24 * 60 * 60 * 1000;
        const diferenciaMilisegundos = fecha.getTime() - inicioAño.getTime();
        const diaDelAño = Math.floor(diferenciaMilisegundos / milisegundosPorDia);
        const numeroSemana = Math.ceil((diaDelAño + 1) / 7);
        let semanaTexto = numeroSemana.toString();
        if (numeroSemana < 10) {
            semanaTexto = "0" + numeroSemana;
        }
        return año + "-W" + semanaTexto;
        /**
    "Para calcular la semana de forma sencilla, obtengo cuántos días han pasado desde el 1 de enero hasta hoy. Divido ese número de días entre 7 y
    redondeo hacia arriba para saber en qué bloque de 7 días nos encontramos.
    Finalmente, le doy formato de texto añadiendo un cero si la semana es menor de 10".
     */
    }
    static validarNombre(nombre) {
        return this.REGEX_NOMBRE.test(nombre);
    }
    static validarEmail(email) {
        return this.REGEX_EMAIL.test(email);
    }
    static validarPassword(pass) {
        return this.REGEX_PASS.test(pass);
    }
    static validarFormulario(nombre, email, pass) {
        if (!this.validarNombre(nombre)) {
            return "El nombre no cumple el patron necesario";
        }
        if (!this.validarEmail(email)) {
            return "El formato del email no es válido (ejemplo@dominio.com).";
        }
        if (!this.validarPassword(pass)) {
            return "La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.";
        }
        return "OK";
    }
    static limpiarTexto(texto) {
        if (!texto)
            return "";
        // Reemplaza múltiples espacios o saltos de línea por uno solo y quita los de los extremos
        return texto.replace(/\s+/g, " ").trim();
    }
    static formatearSemanaParaHumanos(idSemana) {
        // idSemana es "2026-W05"
        // split("-W") divide el texto por esa marca
        const partes = idSemana.split("-W");
        if (partes.length !== 2)
            return idSemana; // Por seguridad
        return `Semana ${partes[1]} del año ${partes[0]}`;
    }
}
Utilities.CATEGORIA_POR_DEFECTO = "Beef";
Utilities.NOMBRE_APP = "DAW Recipe Manager";
Utilities.REGEX_NOMBRE = /^[a-zA-ZÁ-ÿ\s]{3,20}$/;
Utilities.REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
Utilities.REGEX_PASS = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
//# sourceMappingURL=Utilities.js.map