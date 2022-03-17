$(function () {



    

    $('#container').show();
    $('#updateBanner').click(function () {
        $(this).hide();
    });

    Data.GetFrasesInspiradoras().then(frases => {
        console.log(frases);
    });
    Data.GetCursos().then(cursos => {
        console.log(cursos);
    });
    Data.GetEventos().then(eventos => {
        console.log(eventos);
    });


    if ('serviceWorker' in navigator) {
        //registro el serviceWorker




    } else {
        //poner banner para que piense en actualizar el navegador!!
        $('#updateBanner').show();
    }



















    
});