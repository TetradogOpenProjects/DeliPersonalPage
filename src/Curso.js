class Curso{

    static get PathData(){
        return "Data/Cursos.json";
    }

    static Load(){
        return fetch(Curso.PathData)
                .then(r=>r.json())
                .then(j=>j.Cursos);
    }

}