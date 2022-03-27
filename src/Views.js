class Views {
    static GetImagenesWeb() {
        return fetch("Data/ImagenesWeb.json")
            .then(r => r.json());
    }

    static GetPlazas(presenciales, online = 0) {
        var plazasDiv = '<div class="plazas segundo">';
        if (presenciales > 0) {
            plazasDiv += '<label>' + presenciales + ' plazas presenciales </label>';
        }
        if (online > 0) {
            plazasDiv += '<label class="segundo">' + online + ' plazas online </label>';
        }
        plazasDiv += '</div>';

        return plazasDiv;
    }
    static GetModalidad(presenciales = true, online = false, grabacion = false) {
        var modalidad = "<span class='modalidad'>";

        if (grabacion) {
            modalidad += "<img class='modalidadItem' src='Imagenes/videoPlayer.svg' />";
        }
        if (online) {
            modalidad += " <label class='modalidadItem'>online</label>";
        }
        if (presenciales) {
            modalidad += "<label class='modalidadItem'>presencial</label>";
        }


        modalidad += "</span>";

        return modalidad;
    }
    static GetTituloYSubtitulo(titulo, subtitulo) {
        return '<div class="tituloYSubtitulo"><div><label class="titulo colorPrincipal">' + titulo + '</label></div><div><label class="subtitulo colorSecundario">' + subtitulo + '</label></div></div>';
    }
    static GetMasInfo(hide = true) {
        var strHide = '';
        if (hide) {
            strHide = "style='display:none'";
        }
        return '<span class="masInfo" ' + strHide + '><label>Más información</label></span>';
    }
    static GetMenosInfo(hide = true) {
        var strHide = '';
        if (hide) {
            strHide = "style='display:none'";
        }
        return '<span class="menosInfo" ' + strHide + '><label >Menos información</label></span>';
    }
    static GetMasOMenosInfo(masInfoHide = false, ancora = 'introduccionReikiPrincipio') {
        return '<span class="masOMenosInfo textoSinDestacar">' + Views.GetMasInfo(masInfoHide) + Views.GetMenosInfo(!masInfoHide,ancora) + "</span>";
    }
    static GetDuracionYDescanso(duracion, hayDescanso) {
        var divDuracion = '<div class="duracion">';
        divDuracion += '<label>' + duracion + '</label>';
        if (hayDescanso) {
            divDuracion += '<label class="descanso textoSinDestacar segundo" >con descanso</label>';
        }
        divDuracion += '</div>';
        return divDuracion;
    }
    static GetPrecio(precio) {
        return '<div class="precio"><label>' + precio + ' €</label></div>';
    }
    static GetId(curso, prefix = 'curso') {
        var id = prefix + '_' + this.ReplaceAll(curso.Nombre, ' ', '');
        return id;
    }
    /**
     * Así es compatible con los navegadores viejos
     * @param {any} str
     * @param {any} toReplace
     * @param {any} toSet
     */
    static ReplaceAll(str, toReplace, toSet = '') {
        while (str.includes(toReplace)) {
            str = str.replace(toReplace, toSet);
        }
        return str;
    }


    static GetItemDiv(item, type) {

        var plazasOnline = 0, plazasPresenciales = 0;
        var divItem = '<div id="' + Views.GetId(item, type) + '" class="' + type + '">';

        if ((item.hasOwnProperty('PlazasPresenciales') || item.hasOwnProperty('PlazasOnline')) && (item.hasOwnProperty('Fecha') || (item.hasOwnProperty('FechaInicio') && item.hasOwnProperty('FechaFin')))) {
            divItem += '<div><div class="fechaYPlazas">';
            divItem += '<div class="row">';
            if (item.hasOwnProperty('Fecha')) {
                divItem += Views.GetFechaInicio(item.Fecha);
            } else {
                divItem += Views.GetFechaInicio(item.FechaInicio, item.FechaFin);
            }
            if (item.hasOwnProperty('PlazasPresenciales')) {
                plazasPresenciales = item.PlazasPresenciales;
            }
            if (item.hasOwnProperty('PlazasOnline')) {
                plazasOnline = item.PlazasOnline;
            }
            divItem += '</div>';
            divItem += '<div class="row">';
            divItem += Views.GetPlazas(plazasPresenciales, plazasOnline);
            divItem += '</div>';
            divItem += '</div>';
        } else if (item.hasOwnProperty('Plazas') && item.hasOwnProperty('Fecha')) {
            divItem += '<div><div class="fechaYPlazas">';
            divItem += '<div class="row">';
            divItem += Views.GetFechaInicio(item.Fecha);
            divItem += '</div>';
            divItem += '<div class="row">';
            divItem += Views.GetPlazas(item.Plazas);
            divItem += '</div>';
            divItem += '</div>';
        } else {
            divItem += '<div>';
            divItem += Views.GetFechaInicio(null, null, false);

        }
        if (item.hasOwnProperty('Duracion')) {
            divItem += Views.GetDuracionYDescanso(item.Duracion, item.hasOwnProperty('HayDescanso') && item.HayDescanso);

        }

        divItem += '</div>';

        divItem += Views.GetTituloYSubtitulo(item.Nombre, item.Descripcion);
        divItem += Views.GetContentView(Views.GetId(item, type), item, !window.DicDesplegado[type]);
        divItem += Views.GetPrecio(item.Precio);
        divItem += Views.GetMasOMenosInfo(window.DicDesplegado[type]);
        if (item.hasOwnProperty('PlazasPresenciales') || item.hasOwnProperty('PlazasOnline')) {
            divItem += Views.GetModalidad(item.hasOwnProperty('PlazasPresenciales') && item.PlazasPresenciales > 0, item.hasOwnProperty('PlazasOnline') && item.PlazasOnline > 0, item.SeGrabara);
        } else if (item.hasOwnProperty('Plazas')) {
            divItem += Views.GetModalidad(item.Plazas > 0, false, item.SeGrabara);
        } else if (item.hasOwnProperty('EsOnline') || item.hasOwnProperty('EsPresencial')) {
            divItem += Views.GetModalidad(item.hasOwnProperty('EsPresencial') && item.EsPresencial, item.hasOwnProperty('EsOnline') && item.EsOnline, item.SeGrabara);
        }
        divItem += '</div>';

        return divItem;
    }

    static GetCursoDiv(curso) {
        return Views.GetItemDiv(curso, 'curso');
    }
    static GetMeditacionDiv(meditacion) {
        return Views.GetItemDiv(meditacion, 'meditacion');
    }
    static GetCirculoDiv(circulo) {
        return Views.GetItemDiv(circulo, 'circulo');
    }

    static GetTerapiaDiv(terapia) {
        return Views.GetItemDiv(terapia, 'terapia');
    }

    static SetClicMasOMenosInfo(item, tipo) {
        var id = Views.GetId(item, tipo);
        if (item.Content) {
            Views.SetClicContentViewMenus(id, item);
            
        }

        $('#' + id + ' .masInfo').click(function () {
            $('#' + id + ' .masInfo').hide();
            $('#' + id + ' .menosInfo').show();
            $('#' + id + ' .content').show();
            $('#' + id + ' .preContent').hide();
            window.DicDesplegado[tipo] = true;
        });
        $('#' + id + ' .menosInfo').attr('tipo', tipo);
        $('#' + id + ' .menosInfo').click(function () {
   
            
            $('#' + id + ' .masInfo').show();
            $('#' + id + ' .menosInfo').hide();
            $('#' + id + ' .content').hide();
            $('#' + id + ' .preContent').show();
            window.DicDesplegado[tipo] = false;
            Views.SaltaAAncora($(this).attr('tipo') + 'Principio');
             
     
            
        });

    }
    static SaltaAAncora(idAncora) {
        
        var target = $('[name=' + idAncora + ']');
        if (target.length) {
            scrollTo({
                top: (target.offset().top-100)
            });
        }
 
    }
    static GetFechaInicio(inicio = null, fin = null, proximamente = true) {
        var divFecha = '<div class="fecha">';
        var ponerInicioYFin = !(inicio == null || fin == null);
        if (inicio != null) {
            if (ponerInicioYFin)
                divFecha += '<div><label><label class="textFecha"> Inicio </label>' + inicio + '</label></div>';
            else
                divFecha += '<label>' + inicio + '</label>';
        }
        if (fin != null) {
            if (ponerInicioYFin)
                divFecha += '<div  class="segundo2"><label><label class="textFecha"> Fin </label>' + fin + '</label></div>';
            else
                divFecha += '<label>' + fin + '</label>';
        }
        if (inicio == null && fin == null) {
            if (proximamente) {
                divFecha += '<label>Próximamente</label>';
            } else {
                divFecha += '<label>Concertar cita</label>';
            }
        }
        divFecha += '</div>';
        return divFecha;
    }


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

    static GetContentView(idParent, item, isHiden = false) {
        var divContent;
        var idMediaCarrusel;
        var strHide = '';
        if (isHiden) {
            strHide = "style='display:none'";
        }
        divContent = "<div id='content_" + idParent + "'class='content' " + strHide + ">";
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
                    divContent += "<div id='" + idMediaCarrusel + "' class='row' ><img id='img_" + idMediaCarrusel + "' class='col-12 carrusel'  style='display:none;' />";
                    divContent += "<iframe id='video_" + idMediaCarrusel + "' class='col-12 carrusel' style='display:none;' ></iframe></div>";
                    divContent += Views.getMenu(idMediaCarrusel, 'menuItemSecundarioOff', item.Content[i].Value.length);

                }
            } else {
                divContent += "<p class='row'>" + item.Content[i].Value + "</p>";
            }
        }

        divContent += "<p class='row'></p>";
        divContent += "</div>";

        return divContent;
    }
    static SetClicContentViewMenus(idParent, item) {
        var idMediaCarrusel;



        for (var i = 0; i < item.Content.length; i++) {
            if (item.Content[i].IsUrl && item.Content[i].Value.length > 1) {

                idMediaCarrusel = "media_" + i + "_" + idParent;
                this.setClickMenu(idMediaCarrusel, 'menuItemSecundarioOn', 'menuItemSecundarioOff', (pathImg, idMedia) => {

                    idMedia = idMedia.replace('item_', '');

                    if (pathImg.indexOf('www.') == -1) {
                        $("#img_" + idMedia).attr('src', pathImg);
                        $("#video_" + idMedia).hide();
                        $("#img_" + idMedia).show();
                    } else {
                        $("#video_" + idMedia).attr('src', pathImg);
                        $("#video_" + idMedia).show();
                        $("#img_" + idMedia).hide();
                    }
                }, item.Content[i].Value);
                //ahora pongo el gesto de pasar el item con el dedo


            }
        }


    }
    static getMenu(idParent, itemColorDisabled, arrayDataItemsLength) {

        var idMenu = 'menu_' + idParent;
        var idMenuItemPrefix = 'item_' + idParent;

        var items = '';

        for (var i = 0; i < arrayDataItemsLength; i++) {

            items += Views.MenuItem(idMenuItemPrefix + '_' + i, {
                'prefix': idMenuItemPrefix,
                'pos': i,
            }, itemColorDisabled);



        }

        return Views.Menu(idMenu, items);



    }

    static setClickMenu(idParent, itemColorEnable, itemColorDisabled, metodoUpdateItem, arrayDataItems, tipo = null) {
        const ISON = 'isON';
        const DISABLED = 1;
        const ENABLED = 0;


        var idMenuItemPrefix;
        var idMenuItem;



        idMenuItemPrefix = 'item_' + idParent;

        window.DicMenuData[idMenuItemPrefix] = arrayDataItems;
        window.DicMenuMethodUpdate[idMenuItemPrefix] = metodoUpdateItem;
        window.DicMenuItemColors[idMenuItemPrefix] = [itemColorEnable, itemColorDisabled];

        for (var i = 0; i < arrayDataItems.length; i++) {
            idMenuItem = idMenuItemPrefix + '_' + i;

            $('#' + idMenuItem).click(function () {

                var prefix = $(this).attr('prefix');
                var pos = parseInt($(this).attr('pos'));

                if (!$(this).hasClass(window.DicMenuItemColors[prefix][ENABLED])) {


                    for (var j = 0, jF = window.DicMenuData[prefix].length; j < jF; j++) {
                        if (j != pos) {
                            $('#' + prefix + '_' + j).removeClass(window.DicMenuItemColors[prefix][ENABLED]);
                            $('#' + prefix + '_' + j).addClass(window.DicMenuItemColors[prefix][DISABLED]);
                            $('#' + prefix + '_' + j).removeClass(ISON);
                        }
                    }

                    $(this).removeClass(window.DicMenuItemColors[prefix][DISABLED]);
                    $(this).addClass(window.DicMenuItemColors[prefix][ENABLED]);
                    $(this).addClass(ISON);
                    if (tipo != null) {
                        window.DicMenuMethodUpdate[prefix]([window.DicMenuData[prefix][pos], tipo], prefix);
                        if (window.DicNotFirstTime[tipo]) {
                            Views.SaltaAAncora(tipo + 'Principio');
                        } else {
                            window.DicNotFirstTime[tipo] = true;
                        }
                        
                    }
                    else
                        window.DicMenuMethodUpdate[prefix](window.DicMenuData[prefix][pos], prefix);

                }


            });
        }
        //pongo el primer item
        $('#' + idMenuItemPrefix + '_' + '0').click();




    }

    static Init() {

        window.DicMenuData = {};
        window.DicMenuMethodUpdate = {};
        window.DicMenuItemColors = {};
        window.DicDesplegado = {
            'circulo': false,
            'curso': false,
            'terapia': false,
            'meditacion': false

        };
        window.DicNotFirstTime = {
            'circulo': false,
            'curso': false,
            'terapia': false,
            'meditacion': false
        };

    }
}