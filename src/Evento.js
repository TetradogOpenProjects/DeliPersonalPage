class Evento{

    static get PathData(){
        return "Data/Eventos.json";
    }

    static Load(){
        return fetch(Evento.PathData)
                .then(r=>r.json())
                .then(j=>j.Eventos);
    }

}