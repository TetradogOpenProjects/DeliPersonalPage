class Views {
    static GetImagenesWeb() {
        return fetch("Data/ImagenesWeb.json")
            .then(r => r.json());
    }
    static MenuItem(id, dic = {}) {
        var div = '<div id="' + id + '" class="circulo" ';
        for (var key in dic) {
            div += key + '="' + dic[key] + '" ';
        }
        return div + '></div>';
    }
    static get MenuItemColorPhotosOn() {
        return "rgba(0, 88, 125, 1)";
    }
    static get MenuItemColorPhotosOff() {
        return "rgba(0, 88, 125, 0.36)";
    }
    static Menu(id, innerHTML = '') {
        return '<div id="' + id + '" class="menu">' + innerHTML + '</div>';
    }

    static GetContentView(idParent, item) {
        var idImgCarrusel;
        var divContent = "<div id='content_" + idParent +"'class='content'>";
        for (var i = 0; i < item.Content.length; i++) {
            if (item.Content[i].IsUrlImg) {
                if (item.Content[i].Value.length == 1) {

                    divContent += "<img src='" + item.Content[i].Value[0] + "'>";
                }
                else {
                    
                    idImgCarrusel = "imgs_" + i + "_" + idParent;
                    divContent += "<img id='" + idImgCarrusel + "' class='row col-10' ></img>";
                    console.log(item.Content[i].Value);
                    divContent += this._getMenu(idImgCarrusel, this.MenuItemColorPhotosOff, item.Content[i].Value.length);
                    
                }
            } else {
                divContent += "<label class='row'>" + item.Content[i].Value + "</label>";
            }
        }
        divContent += "</div>";

        return divContent;
    }
    static SetClicContentView(idParent, item) {
        var idImgCarrusel;
        for (var i = 0; i < item.Content.length; i++) {
            if (item.Content[i].IsUrlImg && item.Content[i].Value.length > 1) {
                
                    idImgCarrusel = "imgs_" + i + "_" + idParent;
                    this._setClickMenu(idImgCarrusel, this.MenuItemColorPhotosOn, this.MenuItemColorPhotosOff, (pathImg) => $("#" + idImgCarrusel).attr('src',pathImg), item.Content[i].Value);
            } 
        }

    }
    static _getMenu(idParent, itemColorDisabled, arrayDataItemsLength) {     
        
        var idMenu = 'menu_' + idParent;
        var idMenuItemPrefix = 'item_' + idParent + '_';
        
        var items = '';
        
        for (var i = 0; i < arrayDataItemsLength; i++) {
       
            items += Views.MenuItem(idMenuItemPrefix + i, {
                'prefix': idMenuItemPrefix,
                'pos': i,
                'background-color': itemColorDisabled
            });



        }

        return Views.Menu(idMenu,items);



    }
    
    static _setClickMenu(idParent, itemColorEnable, itemColorDisabled, metodoUpdateItem, arrayDataItems) {

    const ISON = 'isOn';
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

  


}


}