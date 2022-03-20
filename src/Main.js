$(function () {

    var DicMenuData = {};
    var DicMenuMethodUpdate = {};
    var DicMenuItemColors = {};


    $('#container').show();
    $('#updateBanner').click(function () {
        $(this).hide();
    });

    /*
        
        <div id="presentacionAdelaida" class="row"></div>
        <div id="origenReiki" class="row"></div>
        <div id="introduccionReiki" class="row"></div>
        <div id="cursos" class="row"></div>
        <div id="terapias" class="row"></div>
        <div id="circulos" class="row"></div>
        <div id="siemprEnContacto" class="row"></div>
        <div id="mensaje" class="row"></div>
        <div id="contacto" class="row"></div>
        <div id="links" class="row"></div>
     
     */

    //pongo la información de la web
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

    $('#presentacionAdelaida').append('<div id="testMenu"><label id="lblTestMenu"></label></div>');
    loadMenuEInicializa('testMenu', "", "", (item) => { $("lblTestMenu").text(item);}, new Array(1, 2, 3, 4, 5));




    console.log('cargado');





    function loadMenuEInicializa(idParent, itemColorEnable, itemColorDisabled, metodoUpdateItem, arrayDataItems) {

        const ISON = 'isOn';
        const DISABLED = 1;
        const ENABLED = 0;
        
        var menuItem;
        var idMenu;
        var idMenuItemPrefix;
        var idMenuItem;
        var menu;

        if (arrayDataItems.length > 1) {

            idMenu = 'menu_' + idParent;
            idMenuItemPrefix = 'item_' + idParent + '_';
            menu = '<div id="' + idMenu + '"></div>';

            $('#' + idParent).append(menu);
            $('#' + idMenu).load('Views/Menu.html');

            document.getElementById('#aux_menu').id = idMenu;
          

            DicMenuData[idMenuItemPrefix] = arrayDataItems;
            DicMenuMethodUpdate[idMenuItemPrefix] = metodoUpdateItem;
            DicMenuItemColors[idMenuItemPrefix] = [itemColorEnable, itemColorDisabled];

            for (var i = 0; i < arrayDataItems.length; i++) {
                idMenuItem = idMenuItemPrefix + i;
                menuItem = '<div id="' + idMenuItem + '"></div>';
                $('#' + idMenu).append(menuItem);
                $('#' + idMenuItem).load('Views/MenuItem.html');
                document.getElementById('#aux_menuItem').id = idMenuItem;
      
                $('#' + idMenuItem).attr('prefix', idMenuItemPrefix);
                $('#' + idMenuItem).attr('pos', i);
                $('#' + idMenuItem).click(function () {

                    var prefix = $(this).attr('prefix');
                    var pos = parseInt($(this).attr('pos'));

                    if (!$(this).hasClass(ISON)) {


                        for (var j = 0, jF = DicMenuData[prefix].length; j < jF; j++) {
                            if (j != pos) {
                                $('#' + prefix + j).removeClass(ISON);
                                $('#' + prefix + j).css('background-color', DicMenuItemColors[prefix][DISABLED]);
                            }
                        }

                        $(this).addClass(ISON);
                        $(this).css('background-color', DicMenuItemColors[prefix][ENABLED]);

                        DicMenuMethodUpdate[idMenuItemPrefix](DicMenuData[prefix][pos]);
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