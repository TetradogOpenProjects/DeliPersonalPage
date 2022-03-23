$(function () {

    Views.Init();
   
    $('#container').show();
    $('#updateBanner').click(function () {
        $(this).hide();
    });

    //pongo la información de la web
    Promise.all([Data.GetPresentacion(), Data.GetSimbolos()]).then(data => {
        var presentacion = data[0];
        var simbolos = data[1];
        addBlock('presentacionAdelaida', null, '<div id="presentacion" style="background-image:url(' + getRandom(presentacion.ImagenesFondo) + ')" >' +
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

    Data.GetOrigenReiki().then(origen => {


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

        addSlideBlock('Terapias', 'terapias', Views.GetTerapiaDiv, terapias, 'terapia');

    });

    Data.GetCirculos().then(circulos => {

        addSlideBlock('Círculos', 'circulos', Views.GetCirculoDiv, circulos, 'circulo');

    });

    Data.GetMeditaciones().then(meditaciones => {

        addSlideBlock('Meditaciones guiadas', 'meditaciones', Views.GetMeditacionDiv, meditaciones, 'meditacion');
    });

    Data.GetSiempreEnContacto().then(siempreEnContacto => {
        addBlock('siempreEnContacto', 'Siempre en contacto', Views.GetContentView('siempreEnContacto', siempreEnContacto));
        Views.SetClicContentViewMenus('siempreEnContacto', siempreEnContacto);
    });
    Data.GetMensaje().then(mensaje => {
        addBlock('mensaje', 'Mensaje', Views.GetContentView('mensaje', mensaje));
        Views.SetClicContentViewMenus('mensaje', mensaje);
    });


    Data.GetLinks().then(links => {

        addBlock('links', null, '<div><a href="' + links.PerfilFederada + '" target="_blanc" >Acreditaciones</a><a href="' + links.SourceCode +'" target="_blanc" >Source Code</a><a href="LicenciasSoftware.html" target="_blanc" >Licencias Software</a><img id="imgFederacion"  /></div>');
    });
    
    Promise.all([Views.GetImagenesWeb(), Data.GetContactoYMetodosDePago()]).then(data => {
        var imagenesWeb = data[0];
        var contactoYMetodosDePago = data[1];

        var divContacto = '<div id="contacto"><span class="fila">';
        var divMetodosDePagos= '<div id="pagos"><span class="fila">';
        if (contactoYMetodosDePago.HasWhatsapp) {
            divContacto += '<a href ="https://api.whatsapp.com/send?phone=' + contactoYMetodosDePago.Telefono + '" target="_blanc" ><img id="imgWhatsapp"/></a>';
        }
        if (contactoYMetodosDePago.HasTelegram) {
            divContacto += '<a href="' + contactoYMetodosDePago.Telegram + '" target="_blanc" ><img id="imgTelegram"/></a>';
        }
        divContacto += '<a href="https://www.instagram.com/' + contactoYMetodosDePago.Instagram + '" target="_blanc" ><img id="imgInstagram"/></a>';
        divContacto += '<a href="https://www.facebook.com/' + contactoYMetodosDePago.Facebook + '" target="_blanc" ><img id="imgFacebook"/></a>';
        divContacto += '</span><span class="fila">';
        divContacto += '<a href="mailto:' + contactoYMetodosDePago.Email + '" target="_blanc" ><img id="imgGMail"/></a>';
        divContacto += '<a href="tel:+34' + contactoYMetodosDePago.Telefono + '" target="_blanc" ><img id="imgTelefono"/></a>';
        divContacto += '</span>';
        addBlock('contactoYMetodosDePago', 'Contacto', divContacto);
       

        if (contactoYMetodosDePago.HasBizum) {
            divMetodosDePagos += '<a href ="' + contactoYMetodosDePago.Bizum + '" target="_blanc" ><img id="imgBizum"/></a>';
        }
        if (contactoYMetodosDePago.HasPayPal) {
            divMetodosDePagos += '<a href ="https://paypal.me/' + contactoYMetodosDePago.PayPalMe + '" target="_blanc" ><img id="imgPayPal"/></a>';
        }
        divMetodosDePagos += '<img id="imgDinero"/>';
        divMetodosDePagos += '</span></div>';
     
        addBlock('contactoYMetodosDePago', 'Métodos de pago', divMetodosDePagos);




        $('#imgBizum').attr('src', imagenesWeb.Bizum.Path);
        $('#imgPayPal').attr('src', imagenesWeb.PayPal.Path);
        $('#imgDinero').attr('src', imagenesWeb.Dinero.Path);

   

        $('#imgWhatsapp').attr('src', imagenesWeb.Whatsapp.Path);
        $('#imgTelegram').attr('src', imagenesWeb.Telegram.Path);
        $('#imgInstagram').attr('src', imagenesWeb.Instagram.Path);
        $('#imgFacebook').attr('src', imagenesWeb.Facebook.Path);
        $('#imgGMail').attr('src', imagenesWeb.GMail.Path);
        $('#imgTelefono').attr('src', imagenesWeb.Telefono.Path);
        $('#imgFederacion') .attr('src', imagenesWeb.FederacionReiki.Path);

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
        var content = '<div id="' + id + '" ></div>';
 
        addBlock(idParent, titulo, content + Views.getMenu(id, 'menuItemPrincipalOff', arrayData.length));

        Views.setClickMenu(id, 'menuItemPrincipalOn', 'menuItemPrincipalOff', (data) => {
            
            var item = data[0];
            var tipo = data[1];
            
            $('#' + id).html(methodGetOneView(item,tipo));
            Views.SetClicMasOMenosInfo(item, tipo);

        }, arrayData,tipo);
    }

    function addBlock(idParent, title, content) {
        var div = "<div class='col-8 offset-2 col-md-6  offset-md-3 col-lg-5 offset-lg-3'>";
        if (title != null) {
            div += "<h2>" + title + "</h2>";
        }
        $("#" + idParent).append( div + content + "</div>");
    }
    










});