class Data {

    static GetCursos() {
        return fetch("Data/Cursos.json")
            .then(r => r.json())
            .then(j => j.Cursos);
    }
    static GetEventos() {
        return fetch("Data/Eventos.json")
            .then(r => r.json())
            .then(j => j.Eventos);
    }
    static GetFrasesInspiradoras() {
        return fetch("Data/FrasesInspiradoras.json")
            .then(r => r.json())
            .then(jData => jData.Frases);
    }
}