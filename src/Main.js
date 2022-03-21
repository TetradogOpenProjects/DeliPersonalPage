$(function () {

    Views.Init();
   
    $('#container').show();
    $('#updateBanner').click(function () {
        $(this).hide();
    });

    /*
        
        <div id="presentacionAdelaida" class="row"></div>
        <div id="orientacion" class="row"></div>
        <div id="origenReiki" class="row"></div>
        <div id="introduccionReiki" class="row"></div>
        <div id="cursos" class="row"></div>
        <div id="terapias" class="row"></div>
        <div id="circulos" class="row"></div>
        <div id="siempreEnContacto" class="row"></div>
        <div id="mensaje" class="row"></div>
        <div id="contactoYMetodosDePago" class="row"></div>
        <div id="links" class="row"></div>
     
     */

    //pongo la información de la web
    Data.GetFrasesInspiradoras().then(frases => {
        console.log(frases);
    });
    Data.GetCursos().then(cursos => {
        console.log(cursos);
    });
    Data.GetMeditaciones().then(meditaciones => {
        console.log(meditaciones);
    });

    Data.GetOrientacion().then(orientacion => {
        addBlock('orientacion', 'Orientación', Views.GetContentView('orientacion', orientacion));
        Views.SetClicContentViewMenus('orientacion', orientacion);
    });
    Data.GetSiempreEnContacto().then(siempreEnContacto => {
        addBlock('siempreEnContacto', 'Siempre en contacto', Views.GetContentView('siempreEnContacto', siempreEnContacto));
        Views.SetClicContentViewMenus('siempreEnContacto', siempreEnContacto);
    });
    Data.GetMensaje().then(mensaje => {
        addBlock('mensaje', 'Mensaje', Views.GetContentView('mensaje', mensaje));
        Views.SetClicContentViewMenus('mensaje', mensaje);
    });

    if ('serviceWorker' in navigator) {
        //registro el serviceWorker

        


    } else {
        //poner banner para que piense en actualizar el navegador!!
        $('#updateBanner').show();
    }
    





    console.log('###');


    function addBlock(idParent, title, content) {
        $("#" + idParent).append("<div class='col-8 offset-2 col-md-6  offset-md-3 col-lg-5 offset-lg-3'><h2>"+title+"</h2>" + content + "</div>");
    }











});