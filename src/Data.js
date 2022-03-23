class Data {

    static GetCirculos() {
        return fetch("Data/Circulos.json")
            .then(r => r.json())
            .then(j => j.Circulos);
    }
    static GetContactoYMetodosDePago() {
        return fetch("Data/ContactoYMetodosDePago.json")
            .then(r => r.json());
    }
    static GetCursos() {
        return fetch("Data/Cursos.json")
            .then(r => r.json())
            .then(jData => jData.Cursos);
    }

    static GetIntroduccionReiki() {
        return fetch("Data/IntroduccionReiki.json")
            .then(r => r.json());
    }
    static GetMeditaciones() {
        return fetch("Data/Meditaciones.json")
            .then(r => r.json())
            .then(j => j.Meditaciones);
    }
    static GetMensaje() {
        return fetch("Data/Mensaje.json")
            .then(r => r.json());
    }
    static GetOrientacion() {
        return fetch("Data/Orientacion.json")
            .then(r => r.json());
    }
    static GetOrigenReiki() {
        return fetch("Data/OrigenReiki.json")
            .then(r => r.json());
    }
    static GetPresentacion() {
        return fetch("Data/Presentacion.json")
            .then(r => r.json());
    }
    static GetSiempreEnContacto() {
        return fetch("Data/SiempreEnContacto.json")
            .then(r => r.json());
    }
    static GetSimbolos() {
        return fetch("Data/Simbolos.json")
            .then(r => r.json())
            .then(jData => jData.Simbolos);
    }

    static GetTerapias() {
        return fetch("Data/Terapias.json")
            .then(r => r.json())
            .then(j => j.Terapias);
    }
}