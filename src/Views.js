class Views {
    static GetImagenesWeb() {
        return fetch("Data/ImagenesWeb.json")
            .then(r => r.json());
    }

    static MenuItem(id, dic = {}, clases = '') {
        var div = '<div id="' + id + '" class="circulo ' + clases + '" ';
        for (var key in dic) {
            div += key + '="' + dic[key] + '" ';
        }
        return div + '></div>';
    }

    static Menu(id, innerHTML = '') {
        return '<div id="' + id + '" class="menu col-auto">' + innerHTML + '</div>';
    }

    static GetContentView(idParent, item) {
        var idMediaCarrusel;//necesito añadir videos en el metodo
        var divContent = "<div id='content_" + idParent + "'class='content'>";
        for (var i = 0; i < item.Content.length; i++) {
            if (item.Content[i].IsUrl) {
                if (item.Content[i].Value.length == 1) {
                    if (item.Content[i].Value[0].indexOf('www.') == -1) {
                        divContent += "<img src='" + item.Content[i].Value[0] + "' class='row col-12' ></img>";
                    } else {
                        divContent += "<iframe src='" + item.Content[i].Value[0] + "' class='row col-12' ></iframe>";
                    }
                }
                else {

                    idMediaCarrusel = "media_" + i + "_" + idParent;
                    divContent += "<div class='col-auto' ><img id='img_" + idMediaCarrusel + "'  style='display:none;' />";
                    divContent += "<iframe id='video_" + idMediaCarrusel + "' style='display:none;' ></iframe></div>";
                    divContent += this.getMenu(idMediaCarrusel, 'menuItemSecundarioOff', item.Content[i].Value.length);

                }
            } else {
                divContent += "<p class='row'>" + item.Content[i].Value + "</p>";
            }
        }
        divContent += "</div>";

        return divContent;
    }
    static SetClicContentViewMenus(idParent, item) {
        var idMediaCarrusel;
        for (var i = 0; i < item.Content.length; i++) {
            if (item.Content[i].IsUrl && item.Content[i].Value.length > 1) {

                idMediaCarrusel = "media_" + i + "_" + idParent;
                this.setClickMenu(idMediaCarrusel, 'menuItemSecundarioOn', 'menuItemSecundarioOff', (pathImg) => {
                    if (pathImg.indexOf('www.') == -1) {
                        $("#img_" + idMediaCarrusel).attr('src', pathImg);
                        $("#video_" + idMediaCarrusel).hide();
                        $("#img_" + idMediaCarrusel).show();
                    } else {
                        $("#video_" + idMediaCarrusel).attr('src', pathImg);
                        $("#video_" + idMediaCarrusel).show();
                        $("#img_" + idMediaCarrusel).hide();
                    }
                }, item.Content[i].Value);
            }
        }

    }
    static getMenu(idParent, itemColorDisabled, arrayDataItemsLength) {

        var idMenu = 'menu_' + idParent;
        var idMenuItemPrefix = 'item_' + idParent + '_';

        var items = '';

        for (var i = 0; i < arrayDataItemsLength; i++) {

            items += Views.MenuItem(idMenuItemPrefix + i, {
                'prefix': idMenuItemPrefix,
                'pos': i,
            }, itemColorDisabled);



        }

        return Views.Menu(idMenu, items);



    }

    static setClickMenu(idParent, itemColorEnable, itemColorDisabled, metodoUpdateItem, arrayDataItems) {

        const DISABLED = 1;
        const ENABLED = 0;


        var idMenuItemPrefix;
        var idMenuItem;



        idMenuItemPrefix = 'item_' + idParent + '_';

        window.DicMenuData[idMenuItemPrefix] = arrayDataItems;
        window.DicMenuMethodUpdate[idMenuItemPrefix] = metodoUpdateItem;
        window.DicMenuItemColors[idMenuItemPrefix] = [itemColorEnable, itemColorDisabled];

        for (var i = 0; i < arrayDataItems.length; i++) {
            idMenuItem = idMenuItemPrefix + i;

            $('#' + idMenuItem).click(function () {

                var prefix = $(this).attr('prefix');
                var pos = parseInt($(this).attr('pos'));

                if (!$(this).hasClass(window.DicMenuItemColors[prefix][ENABLED])) {


                    for (var j = 0, jF = window.DicMenuData[prefix].length; j < jF; j++) {
                        if (j != pos) {
                            $('#' + prefix + j).removeClass(window.DicMenuItemColors[prefix][ENABLED]);
                            $('#' + prefix + j).addClass(window.DicMenuItemColors[prefix][DISABLED]);
                        }
                    }

                    $(this).removeClass(window.DicMenuItemColors[prefix][DISABLED]);
                    $(this).addClass(window.DicMenuItemColors[prefix][ENABLED]);
                    window.DicMenuMethodUpdate[prefix](window.DicMenuData[prefix][pos]);

                }


            });
        }
        //pongo el primer item
        $('#' + idMenuItemPrefix + '0').click();




    }

    static Init() {

        window.DicMenuData = {};
        window.DicMenuMethodUpdate = {};
        window.DicMenuItemColors = {};
    }
}