$(function () {

    window.DicMenuData = {};
    window.DicMenuMethodUpdate = {};
    window.DicMenuItemColors = {};
   
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
        <div id="siemprEnContacto" class="row"></div>
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

        $("#orientacion").append("<div><h2>Orientación</h2>" + Views.GetContentView('orientacion', orientacion) + "</div>");
        Views.SetClicContentView('orientacion', orientacion);
    });
    Data.GetMensaje().then(mensaje => {

        $("#mensaje").append("<div><h2>Mensaje</h2>" + Views.GetContentView('mensaje', mensaje) + "</div>");
        Views.SetClicContentView('mensaje', mensaje);
    });

    if ('serviceWorker' in navigator) {
        //registro el serviceWorker

        


    } else {
        //poner banner para que piense en actualizar el navegador!!
        $('#updateBanner').show();
    }
    





    console.log('cargado');



    function testMenu() {
        $('#presentacionAdelaida').append('<div id="testMenu"><label id="lblTestMenu"></label></div>');
        loadMenuEInicializa('testMenu', Views.MenuItemColorPhotosOn, Views.MenuItemColorPhotosOff, (item) => { $("#lblTestMenu").text(item); }, new Array(1, 2, 3, 4, 5));
    }

    function loadMenuClic(idParent, itemColorEnable, itemColorDisabled, metodoUpdateItem, arrayDataItems) {

        const ISON = 'isOn';
        const DISABLED = 1;
        const ENABLED = 0;

        var idMenu;
        var idMenuItemPrefix;
        var idMenuItem;

        if (arrayDataItems.length > 1) {

            idMenu = 'menu_' + idParent;
            idMenuItemPrefix = 'item_' + idParent + '_';

            window.DicMenuData[idMenuItemPrefix] = arrayDataItems;
            window.DicMenuMethodUpdate[idMenuItemPrefix] = metodoUpdateItem;
            window.DicMenuItemColors[idMenuItemPrefix] = [itemColorEnable, itemColorDisabled];

            for (var i = 0; i < arrayDataItems.length; i++) {
                idMenuItem = idMenuItemPrefix + i;

                $('#' + idMenuItem).click(function () {

                    var prefix = $(this).attr('prefix');
                    var pos = parseInt($(this).attr('pos'));

                    if (!$(this).hasClass(ISON)) {


                        for (var j = 0, jF = window.DicMenuData[prefix].length; j < jF; j++) {
                            if (j != pos) {
                                $('#' + prefix + j).removeClass(ISON);
                                $('#' + prefix + j).css('background-color', window.DicMenuItemColors[prefix][DISABLED]);
                            }
                        }

                        $(this).addClass(ISON);
                        $(this).css('background-color', window.DicMenuItemColors[prefix][ENABLED]);
                        window.DicMenuMethodUpdate[prefix](window.DicMenuData[prefix][pos]);

                    }


                });
            }
            //pongo el primer item
            $('#' + idMenuItemPrefix + '0').click();

        } else if (arrayDataItems.length == 1) {
            //si no hay más elementos no añado el menu y solo pongo el primer item
            metodoUpdateItem(arrayDataItems[0]);
        }


    }











});