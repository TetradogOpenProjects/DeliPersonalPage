$(function () {



    

    $('#container').show();
    $('#updateBanner').click(function () {
        $(this).hide();
    });

    FraseInspiradora.Load().then(frases => {
        console.log(frases);
    });
    Curso.Load().then(cursos => {
        console.log(cursos);
    });
    Evento.Load().then(eventos => {
        console.log(eventos);
    });


    if ('serviceWorker' in navigator) {
        //registro el serviceWorker




    } else {
        //poner banner para que piense en actualizar el navegador!!
        $('#updateBanner').show();
    }



















    
});