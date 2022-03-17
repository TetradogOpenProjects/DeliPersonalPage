class Data {

    static GetCirculos() {
        return fetch("Data/Circulos.json")
            .then(r => r.json())
            .then(j => j.Circulos);
    }
    static GetContacto() {
        return fetch("Data/Contacto.json")
            .then(r => r.json());
    }
    static GetCursos() {
        return fetch("Data/Cursos.json")
            .then(r => r.json())
            .then(jData => jData.Cursos);
    }
    static GetEventos() {
        return fetch("Data/Eventos.json")
            .then(r => r.json())
            .then(j => j.Eventos);
    }
    static GetFrasesInspiradoras() {
        return fetch("Data/FrasesInspiradoras.json")
            .then(r => r.json())
            .then(j => j.Frases);
    }
    static GetIntroduccionReiki() {
        return fetch("Data/IntroduccionReiki.json")
            .then(r => r.json())
            .then(jData => jData.Content);
    }
    static GetOrigenReiki() {
        return fetch("Data/OrigenReiki.json")
            .then(r => r.json());
    }
    static GetSiempreEnContacto() {
        return fetch("Data/SiempreEnContacto.json")
            .then(r => r.json())
            .then(j => j.Content);
    }
    static GetSimbolos() {
        return fetch("Data/Simbolos.json")
            .then(r => r.json())
            .then(jData => jData.Simbolos);
    }
    static GetsobreAdelaida() {
        return fetch("Data/SobreAdelaida.json")
            .then(r => r.json())
            .then(jData => jData.Content);
    }
}