class Menu {

    static MenuItem(id, dic = {}, clases = '') {
        var div = '<div id="' + id + '" class="menuItem ' + clases + '" ';
        for (var key in dic) {
            div += key + '="' + dic[key] + '" ';
        }
        return div + '></div>';
    }

    static Menu(id, innerHTML = '') {
        return '<div id="' + id + '" class="menu d-flex flex-row justify-content-center alig-items-center ">' + innerHTML + '</div>';
    }

    static get(idParent, itemColorDisabled, arrayDataItemsLength) {

        var idMenu = 'menu_' + idParent;
        var idMenuItemPrefix = 'item_' + idParent;

        var items = '';
        
        Menu.Init();
        
        for (var i = 0; i < arrayDataItemsLength; i++) {

            items += Menu.MenuItem(idMenuItemPrefix + '_' + i, {
                'prefix': idMenuItemPrefix,
                'pos': i,
            }, itemColorDisabled);
            

            
        }

        return Menu.Menu(idMenu, items);



    }

    static setClick(idParent, itemColorEnable, itemColorDisabled, metodoUpdateItem,methodSecondTime, arrayDataItems, tipo = null) {
        const ISON = 'isON';
        const DISABLED = 1;
        const ENABLED = 0;


        var idMenuItemPrefix;
        var idMenuItem;

        Menu.Init();

        idMenuItemPrefix = 'item_' + idParent;
        Menu.DicMethodSecondTime[idMenuItemPrefix] = methodSecondTime;
        Menu.DicMenuData[idMenuItemPrefix] = arrayDataItems;
        Menu.DicMenuMethodUpdate[idMenuItemPrefix] = metodoUpdateItem;
        Menu.DicMenuItemColors[idMenuItemPrefix] = [itemColorEnable, itemColorDisabled];

        for (var i = 0; i < arrayDataItems.length; i++) {
            idMenuItem = idMenuItemPrefix + '_' + i;

            $('#' + idMenuItem).click(function () {

                var prefix = $(this).attr('prefix');
                var pos = parseInt($(this).attr('pos'));

                if (!$(this).hasClass(Menu.DicMenuItemColors[prefix][ENABLED])) {


                    for (var j = 0, jF = Menu.DicMenuData[prefix].length; j < jF; j++) {
                        if (j != pos) {
                            $('#' + prefix + '_' + j).removeClass(Menu.DicMenuItemColors[prefix][ENABLED]);
                            $('#' + prefix + '_' + j).addClass(Menu.DicMenuItemColors[prefix][DISABLED]);
                            $('#' + prefix + '_' + j).removeClass(ISON);
                        }
                    }

                    $(this).removeClass(Menu.DicMenuItemColors[prefix][DISABLED]);
                    $(this).addClass(Menu.DicMenuItemColors[prefix][ENABLED]);
                    $(this).addClass(ISON);
                    if (tipo != null) {
                        Menu.DicMenuMethodUpdate[prefix]([Menu.DicMenuData[prefix][pos], tipo], prefix);
                        if (Menu.DicNotFirstTime[tipo]) {
                            Menu.DicMethodSecondTime[prefix](tipo);
                        } else {
                            Menu.DicNotFirstTime[tipo] = true;
                        }

                    }
                    else
                        Menu.DicMenuMethodUpdate[prefix](Menu.DicMenuData[prefix][pos], prefix);

                }


            });
        }
        //pongo el primer item
        $('#' + idMenuItemPrefix + '_' + '0').click();




    }
    static Siguiente(menuId) {
        const ISON = 'isON';
        if ($("#" + menuId + ' :last-child').hasClass(ISON)) {
            $("#" + menuId + ' :first-child').click();
        } else {
            $("#" + menuId + ' .' + ISON).next().click();

        }

    }

    static Anterior(menuId) {
        const ISON = 'isON';
        if ($("#" + menuId + ' :first-child').hasClass(ISON)) {
            $("#" + menuId + ' :last-child').click();
        } else {
            $("#" + menuId + ' .' + ISON).prev().click();

        }

    }

    static Init() {
        if (!Menu.hasOwnProperty('DicNotFirstTime')) {
            Menu.DicNotFirstTime = {
                'circulo': false,
                'curso': false,
                'terapia': false,
                'meditacion': false
            };

            Menu.DicMenuData = {};
            Menu.DicMenuMethodUpdate = {};
            Menu.DicMenuItemColors = {};

            Menu.DicMethodSecondTime = {};
        }
    }
}