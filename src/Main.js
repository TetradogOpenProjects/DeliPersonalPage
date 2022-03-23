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
    Promise.all([Data.GetPresentacion(), Data.GetSimbolos()]).then(data => {
        var presentacion = data[0];
        var simbolos = data[1];
        addBlock('presentacionAdelaida', null, '<div class="presentacion" style="background-image:url(' + getRandom(presentacion.ImagenesFondo) + ')" >' +
            '<div class="row">' +
            '<img id="imgPerfil" src="' + getRandom(presentacion.ImagenesPerfil) + '" />' +
            '<label class="colorPrincipal">Adelaida</label>' +
            '<img id="imgSimbolo" src="'+getRandom(simbolos)+'"/>' +
            '<div id="sobreAdelaida" class="texto"><p>' + getRandom(presentacion.SobreAdelaida) + '</p></div>' +
            '<div id="fraseInspiradora" class="texto"><p>' + getRandom(presentacion.FrasesInspiradoras) + '</p></div></div>' 
            
            );
    });

    Data.GetOrientacion().then(orientacion => {
        addBlock('orientacion', 'Orientación', Views.GetContentView('orientacion', orientacion));
        Views.SetClicContentViewMenus('orientacion', orientacion);
    });
    
    Data.GetIntroduccionReiki().then(introduccionReiki => {

        addBlock('introduccionReiki', 'Introducción Reiki', '<div id="' + Views.GetId(introduccionReiki, 'introduccionReiki') + '" class="introduccionReiki"><p class="preContent">' +
                                                                introduccionReiki.Content[0].Value + '</p>' +
                                                                Views.GetContentView('introduccionReiki', introduccionReiki, true) +
                                                                Views.GetMasOMenosInfo() + '</div>');
        Views.SetClicMasOMenosInfo(introduccionReiki, 'introduccionReiki');


    });



    Data.GetCursos().then(cursos => {
        
        addSlideBlock('Cursos con título oficial','cursos', Views.GetCursoDiv, cursos,'curso');
    });

    Data.GetTerapias().then(terapias => {

        addSlideBlock('Terapias','terapias', Views.GetTerapiaDiv, terapias);

    });

    Data.GetCirculos().then(circulos => {

        addSlideBlock('Círculos','circulos', Views.GetCirculoDiv, circulos);

    });

    Data.GetMeditaciones().then(meditaciones => {

        addSlideBlock('Meditaciones guiadas','meditaciones', Views.GetMeditacionDiv, meditaciones);
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

    function getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function addSlideBlock(titulo,idParent, methodGetOneView, arrayData,tipo) {
        var id = 'parent_items_' + idParent ;
        var content = '<div id="' + id + '"></div>';
    
        addBlock(idParent, titulo, content + Views.getMenu(id, 'menuItemPrincipalOff', arrayData.length));

        Views.setClickMenu(id, 'menuItemPrincipalOn', 'menuItemPrincipalOff', (item) => {
            
            $('#' + id).html(methodGetOneView(item,tipo));
            Views.SetClicMasOMenosInfo(item, tipo);
        }, arrayData);
    }

    function addBlock(idParent, title, content) {
        var div = "<div class='col-8 offset-2 col-md-6  offset-md-3 col-lg-5 offset-lg-3'>";
        if (title != null) {
            div += "<h2>" + title + "</h2>";
        }
        $("#" + idParent).append( div + content + "</div>");
    }
    










});