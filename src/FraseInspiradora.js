class FraseInspiradora{

    static get PathData(){
        return 'Data/FrasesInspiradoras.json';
    }
    static Load(){
        return fetch(FraseInspiradora.PathData)
                .then(r=>r.json())
                .then(jData=>jData.Frases);
    }

}