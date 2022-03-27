$(function () {
    const SHOWUPDATEBANNER = "showUpdateBanner";

    var partes = [];
    Views.Init();

    //asi si en el futuro cambio la forma de detactarlo solo lo cambio aqui
    window.EsMobil = navigator.userAgent.match(/Android|iPhone|iPad|iPod|Mobile/i) != null;
    window.IsTouch = jQuery.support.touch;
    
    $('#container').show();
    $('#updateBanner').click(function () {
        $(this).hide();
        localStorage.setItem(SHOWUPDATEBANNER, 'true');
    });

    //pongo la información de la web
    Promise.all([Data.GetPresentacion(), Data.GetSimbolos()]).then(data => {
        var presentacion = data[0];
        var simbolos = data[1];
        addBlock('presentacionAdelaida', null, '<div id="presentacion" class="row"><img class="fondo col-12" src="' + getRandom(presentacion.ImagenesFondo).Path + '" />' +
            '<div class="col-12"><div class="row">' +
            '<label id="tituloWeb" class="colorPrincipal col-12">Adelaida</label>' +
            '<img id="imgSimbolo" src="' + getRandom(simbolos) + '"/>' +
            '<div class="col-12"><div class="row">' +
            '<div id="sobreAdelaida" class="texto col-4  col-md-4 "><p>' + getRandom(presentacion.SobreAdelaida) + '</p></div>' +
            '<div id="fraseInspiradora" class="texto col-4  col-md-5 "><p>' + getRandom(presentacion.FrasesInspiradoras) + '</p></div>' +
            '</div></div>' +
            '</div>' +
            '</div>',

            "col-12 col-md-8  offset-md-2");
    });


    Data.GetOrientacion().then(orientacion => {
        addBlock('orientacion', 'Orientación', Views.GetContentView('orientacion', orientacion));
        Views.SetClicContentViewMenus('orientacion', orientacion);
    });

    Data.GetOrigenReiki().then(origen => {
        var pos = getRandomPos(origen.Partes);
        var content = '<div class="partesOrigen">';
        var foto = origen.ImagenMaestro;

        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            foto = '#';
        }
        for (var i = 0; i < origen.Partes.length; i++) {
            content += '<p>' + (i + 1) + '- ' + origen.Partes[i] + '</p>';
        }
        content += '</div>';
        addBlock('origenReiki', 'El Origen del Reiki', '<div id="' + Views.GetId(origen, 'origenReiki') + '" class="row" ><div class="col-8"><p class="preContent">' + (pos + 1) + '- ' + origen.Partes[pos] + '</p><div class="content" style="display:none;">' + content + '</div>' + Views.GetMasOMenosInfo() + '</div><img id="imgMaestroReiki" class="col-4" src="' + foto + '" /></div>');
        Views.SetClicMasOMenosInfo(origen, 'origenReiki');
    });

    Data.GetIntroduccionReiki().then(introduccionReiki => {

        addBlock('introduccionReiki', 'Introducción Reiki', '<div id="' + Views.GetId(introduccionReiki, 'introduccionReiki') + '" class="introduccionReiki"><p class="preContent row">' +
            introduccionReiki.Content[0].Value + '</p>' +
            Views.GetContentView('introduccionReiki', introduccionReiki, true) +
            '<div class="row">' + Views.GetMasOMenosInfo() + '</div>' + '</div>');
        Views.SetClicMasOMenosInfo(introduccionReiki, 'introduccionReiki');


    });



    partes[0]=  Data.GetCursos().then(cursos => {

        addSlideBlock('Cursos con título oficial', 'cursos', Views.GetCursoDiv, cursos, 'curso');
    });

    partes[1] =  Data.GetTerapias().then(terapias => {

        addSlideBlock('Terapias', 'terapias', Views.GetTerapiaDiv, terapias, 'terapia');

    });

    partes[2] =  Data.GetCirculos().then(circulos => {

        addSlideBlock('Círculos', 'circulos', Views.GetCirculoDiv, circulos, 'circulo');

    });

    partes[3] =  Data.GetMeditaciones().then(meditaciones => {

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

        addBlock('links', null, '<div><span><a class="textoSinDestacar" href="' + links.PerfilFederada + '" target="_blanc" >Acreditaciones</a><a class="textoSinDestacar" href="' + links.SourceCode + '" target="_blanc" >Source Code</a><div><a class="textoSinDestacar" href="LicenciasSoftware.html" target="_blanc" >Licencias Software</a></div></span><img id="imgFederacion"  /></div>');
    });
    Promise.all(partes).then(() => {
        Promise.all([Views.GetImagenesWeb(), Data.GetContactoYMetodosDePago()]).then(data => {

            var divMetodosDePagos;
            var imagenesWeb = data[0];
            var contactoYMetodosDePago = data[1];
            var sibling, content;
            var fondos;
            var divContacto;
            addBlock('contactoYMetodosDePago', 'Contacto', '');
            divContacto = '<div id="contacto" class="d-flex flex-row justify-content-center alig-items-center" >';

            divContacto += '<div><div class="row">';
            divContacto += '<div class="col-12">';

            if (contactoYMetodosDePago.HasWhatsapp) {
                divContacto += '<a href ="https://api.whatsapp.com/send?phone=' + contactoYMetodosDePago.Telefono + '" target="_blanc" ><img id="imgWhatsapp"/></a>';
            }
            if (contactoYMetodosDePago.HasTelegram) {
                divContacto += '<a href="https://t.me/' + contactoYMetodosDePago.Telegram + '" target="_blanc" ><img id="imgTelegram"/></a>';
            }
            divContacto += '<a href="https://www.instagram.com/' + contactoYMetodosDePago.Instagram + '" target="_blanc" ><img id="imgInstagram"/></a>';
            divContacto += '<a href="https://www.facebook.com/' + contactoYMetodosDePago.Facebook + '" target="_blanc" ><img id="imgFacebook"/></a>';
            divContacto += '</div>';
            divContacto += '</div>';
            divContacto += '<div class="row">';
            divContacto += '<div class="col-12">';
            if (window.EsMobil) {
                divContacto += '<a href="mailto:' + contactoYMetodosDePago.Email + '" target="_blanc" ><img id="imgGMail"/></a>';
         
                divContacto += '<a href="tel:+34' + contactoYMetodosDePago.Telefono + '" target="_blanc" ><img id="imgTelefono"/></a>';
             }
            divContacto += '</div>';

            divContacto += '</div>';
            if (!window.EsMobil) {
                divContacto += '<div class="row"><div class="col-10"><label > email: ' + contactoYMetodosDePago.Email + '</label></div>';
                if (navigator.clipboard) {
                    divContacto += '<div class=" col-2"> <button id="btnCopiarEmail" type="button" class="btn-clipboard" title="" data-bs-original-title="Copiar en el portapapeles">Copiar</button></div>';
                }
                divContacto += '</div>';
                divContacto += '<div class="row"><div class="col-10"><label > teléfono: ' + contactoYMetodosDePago.Telefono + '</label></div>';
                if (navigator.clipboard) {
                    divContacto += '<div class=" col-2"> <button id="btnCopiarNumero" type="button" class="btn-clipboard" title="" data-bs-original-title="Copiar en el portapapeles">Copiar</button></div>';
                }
                divContacto +='</div>';
                
            }
            divContacto += '</div></div>';

            addBlock('contactoYMetodosDePago', null, divContacto, 'offset-2 col-8 col-md-10 offset-md-1');

            divMetodosDePagos = '<div id="pagos" class="d-flex flex-row justify-content-center alig-items-center" >';
            divMetodosDePagos += '<div class="row">';
            divMetodosDePagos += '<div class="col-12">';
            if (contactoYMetodosDePago.HasBizum) {
                divMetodosDePagos += '<a href ="' + contactoYMetodosDePago.Bizum + '" target="_blanc" ><img id="imgBizum"/></a>';
            }
            if (contactoYMetodosDePago.HasPayPal) {
                divMetodosDePagos += '<a href ="https://paypal.me/' + contactoYMetodosDePago.PayPalMe + '" target="_blanc" ><img id="imgPayPal"/></a>';
            }
            divMetodosDePagos += '<img id="imgDinero"/>';
            divMetodosDePagos += '</div>';
            divMetodosDePagos += '</div>';
            divMetodosDePagos += '</div>';
            addBlock('contactoYMetodosDePago', 'Métodos de pago', divMetodosDePagos);


            $('#btnCopiarNumero').click(function () {
                Data.GetContactoYMetodosDePago().then(contacto => {

                    //copy into the clipboard
                    navigator.clipboard.writeText(contacto.Telefono);
                    $('#btnCopiarNumero').blur();
                });
               

            });
            $('#btnCopiarEmail').click(function () {
                Data.GetContactoYMetodosDePago().then(contacto => {

                    //copy into the clipboard
                    navigator.clipboard.writeText(contacto.Email);
                    $('#btnCopiarEmail').blur();
                });


            });
            $('#imgBizum').attr('src', imagenesWeb.Bizum.Path);
            $('#imgPayPal').attr('src', imagenesWeb.PayPal.Path);
            $('#imgDinero').attr('src', imagenesWeb.Dinero.Path);



            $('#imgWhatsapp').attr('src', imagenesWeb.Whatsapp.Path);
            $('#imgTelegram').attr('src', imagenesWeb.Telegram.Path);
            $('#imgInstagram').attr('src', imagenesWeb.Instagram.Path);
            $('#imgFacebook').attr('src', imagenesWeb.Facebook.Path);
            $('#imgGMail').attr('src', imagenesWeb.GMail.Path);
            $('#imgTelefono').attr('src', imagenesWeb.Telefono.Path);
            $('#imgFederacion').attr('src', imagenesWeb.FederacionReiki.Path);


            //pongo los fondos
            $('#imgFondoCurso').attr('src', imagenesWeb.FondoCurso.Path);
            $('#imgFondoTerapia').attr('src', imagenesWeb.FondoTerapia.Path);
            $('#imgFondoCirculo').attr('src', imagenesWeb.FondoCirculo.Path);
            $('#imgFondoMeditacion').attr('src', imagenesWeb.FondoMeditacion.Path);

            fondos = ['#imgFondoCurso', '#imgFondoTerapia', '#imgFondoCirculo', '#imgFondoMeditacion'];
            for (var i = 0; i < fondos.length; i++) {
                sibling = $(fondos[i]).next();
                content = $(fondos[i]).detach();
                sibling.prepend(content);
            }

        });
    });

    

    if ('serviceWorker' in navigator) {
        //registro el serviceWorker




    } else {
        //poner banner para que piense en actualizar el navegador!!
        //compruebo que no lo haya quitado
        if (localStorage.getItem(SHOWUPDATEBANNER) === null) {
            $('#updateBanner').show();
        }
    }






    console.log('###');
    $('.ui-loader-header').remove();










    function getRandomPos(array) {
        return Math.floor(Math.random() * array.length);
    }
    function getRandom(array) {
        return array[getRandomPos(array)];
    }

    function addSlideBlock(titulo, idParent, methodGetOneView, arrayData, tipo) {
        const PARENTSLIDE = 'parentSlide';
        var id = 'parent_items_' + idParent;
        var content = '<div id="' + id + '" class="' + PARENTSLIDE + '" ></div>';

        addBlock(idParent, titulo, content + Views.getMenu(id, 'menuItemPrincipalOff', arrayData.length));

        Views.setClickMenu(id, 'menuItemPrincipalOn', 'menuItemPrincipalOff', (data, idMedia) => {

            var item = data[0];
            var tipo = data[1];

            $('#' + id).html(methodGetOneView(item, tipo));
            Views.SetClicMasOMenosInfo(item, tipo);
            if (window.IsTouch) {
                if (!window.DicSwipe[id]) {
                    window.DicSwipe[id] = true;
                    $("#" + id).on("swipeleft", (event) => {
                        const ISON = 'isON';
                        var menuId = "menu_" + event.delegateTarget.id;
                        if (event.target.id) {
                            if (event.target.id.includes('media_')) {
                                menuId = "menu" + event.target.id.replace('img', '').replace('video', '');
                            }
                        }

                        if ($("#" + menuId + ' :last-child').hasClass(ISON)) {
                            $("#" + menuId + ' :first-child').click();
                        } else {
                            $("#" + menuId + ' .' + ISON).next().click();

                        }




                    });

                    $("#" + id).on("swiperight", (event) => {
                        const ISON = 'isON';
                        var menuId = "menu_" + event.delegateTarget.id;
                        if (event.target.id) {
                            if (event.target.id.includes('media_')) {
                                menuId = "menu" + event.target.id.replace('img', '').replace('video', '');
                            }
                        }


                        if ($("#" + menuId + ' :first-child').hasClass(ISON)) {
                            $("#" + menuId + ' :last-child').click();
                        } else {
                            $("#" + menuId + ' .' + ISON).prev().click();

                        }




                    });
                }
            } else {
                //poner algo para moverse de izquierda a derecha y viceversa 
            }

        }, arrayData, tipo);
    }

    function addBlock(idParent, title, content, bootstrap = "col-11  col-md-6 offset-md-3") {
        var div = "<div class='" + bootstrap + "'>";
        div += "<div class='item'>";
        if (title != null) {
            div += "<h2>" + title + "</h2>";
        }
        $("#" + idParent).append(div + content + "</div>" + "</div>");
    }











});