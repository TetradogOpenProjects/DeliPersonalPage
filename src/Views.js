class Views {
    static GetImagenesWeb() {
        return fetch("Data/ImagenesWeb.json")
            .then(r => r.json());
    }

    static GetPlazas(presenciales, online=0) {
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
        return '<span class="menosInfo" '+strHide+'><label>Menos información</label></span>';
    }
    static GetMasOMenosInfo(masInfoHide = false) {
        return '<span class="masOMenosInfo textoSinDestacar">' + Views.GetMasInfo(masInfoHide) + Views.GetMenosInfo(!masInfoHide) + "</span>";
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
        var id = prefix + '_' + this.ReplaceAll(curso.Nombre,' ', '');
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
    
    static GetCursoDiv(curso) {
        var divCurso = '<div id="' + Views.GetId(curso) + '" class="curso">';
        divCurso += '<div><div class="fechaYPlazas">';
        divCurso += Views.GetFechaInicio(curso.Inicio, curso.Fin);
        divCurso += Views.GetPlazas(curso.PlazasPresenciales, curso.PlazasOnline);
        divCurso += '</div>';
        divCurso += Views.GetDuracionYDescanso(curso.Duracion, curso.HayDescanso);
        divCurso += '</div>';
        divCurso += Views.GetTituloYSubtitulo(curso.Nombre, curso.Descripcion);
        divCurso += Views.GetContentView(Views.GetId(curso), curso, !window.DicDesplegado['curso']);
        divCurso += Views.GetPrecio(curso.Precio);
        divCurso += Views.GetMasOMenosInfo(window.DicDesplegado['curso']);
        divCurso += Views.GetModalidad(curso.PlazasPresenciales > 0, curso.PlazasOnline > 0, curso.SeGrabara);

        divCurso += '</div>';

        return divCurso;
    }
    static GetMeditacionDiv(meditacion) {
        var divMeditacion = '<div id="' + Views.GetId(meditacion, 'meditacion') + '" class="meditacion">';
        divMeditacion += '<div><div class="fechaYPlazas">';
        divMeditacion += Views.GetFechaInicio(meditacion.Fecha);
        divMeditacion += Views.GetPlazas(meditacion.PlazasPresenciales, meditacion.PlazasOnline);
        divMeditacion += '</div>';
        divMeditacion += Views.GetDuracionYDescanso(meditacion.Duracion, meditacion.HayDescanso);
        divMeditacion += '</div>';
        divMeditacion += Views.GetTituloYSubtitulo(meditacion.Nombre, meditacion.Descripcion);
        divMeditacion += Views.GetContentView(Views.GetId(meditacion, 'meditacion'), meditacion, !window.DicDesplegado['meditacion']);
        divMeditacion += Views.GetPrecio(meditacion.Precio);
        divMeditacion += Views.GetMasOMenosInfo(window.DicDesplegado['meditacion']);
        divMeditacion += Views.GetModalidad(meditacion.PlazasPresenciales > 0, meditacion.PlazasOnline > 0, meditacion.SeGrabara);
        divMeditacion += '</div>';

        return divMeditacion;
    }
    static GetCirculoDiv(circulo) {
        var divCirculo = '<div id="' + Views.GetId(circulo, 'circulo') + '" class="circulo ">';
        divCirculo += '<div><div class="fechaYPlazas">';
        divCirculo += Views.GetFechaInicio(circulo.Fecha);
        divCirculo += Views.GetPlazas(circulo.Plazas);
        divCirculo += '</div>';
        divCirculo += Views.GetDuracionYDescanso(circulo.Duracion, circulo.HayDescanso);
        divCirculo += '</div>';
        divCirculo += Views.GetTituloYSubtitulo(circulo.Nombre, circulo.Descripcion);
        divCirculo += Views.GetContentView(Views.GetId(circulo, 'circulo'), circulo, !window.DicDesplegado['circulo']);
        divCirculo += Views.GetPrecio(circulo.Precio);
        divCirculo += Views.GetMasOMenosInfo(window.DicDesplegado['circulo']);
        divCirculo += Views.GetModalidad(true,false, circulo.SeGrabara);
        divCirculo += '</div>';

        return divCirculo;
    }
    
    static GetTerapiaDiv(terapia) {
        var divTerapia = '<div id="' + Views.GetId(terapia,'terapia') + '" class="terapia">';
        divTerapia += '<div><div class="fechaYPlazas">';
        divTerapia += Views.GetFechaInicio();
        divTerapia += Views.GetTituloYSubtitulo(terapia.Nombre, terapia.Descripcion);
        divTerapia += '</div>';
        divTerapia += Views.GetContentView(Views.GetId(terapia, 'terapia'), terapia, !window.DicDesplegado['terapia']);
        divTerapia += Views.GetPrecio(terapia.Precio);
        divTerapia += Views.GetMasOMenosInfo(window.DicDesplegado['terapia']);
        divTerapia += Views.GetModalidad(terapia.EsPresencial, terapia.EsOnline);
        divTerapia += '</div>';

        return divTerapia;
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
            window.DicDesplegado[tipo]=true;
        });
        $('#' + id + ' .menosInfo').click(function () {
            $('#' + id + ' .masInfo').show();
            $('#' + id + ' .menosInfo').hide();
            $('#' + id + ' .content').hide();
            $('#' + id + ' .preContent').show();
            window.DicDesplegado[tipo] = false;
        });
        
    }
    static GetFechaInicio(inicio = null, fin = null) {
        var divFecha = '<div class="fecha">';
        var ponerInicioYFin = !(inicio == null || fin == null);
        if (inicio != null) {
            if (ponerInicioYFin)
                divFecha += '<div><label>Inicio ' + inicio + '</label></div>';
            else
                divFecha += '<label>' + inicio + '</label>';
        }
        if (fin != null) {
            if (ponerInicioYFin)
                divFecha += '<div><label  class="segundo">Fin' + fin + '</label></div>';
            else
                divFecha += '<label>' + fin + '</label>';
        }
        if (inicio == null && fin == null) {
            divFecha += '<label>Concertar cita</label>';
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
    
    static GetContentView(idParent, item,isHiden=false) {
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

    static setClickMenu(idParent, itemColorEnable, itemColorDisabled, metodoUpdateItem, arrayDataItems,tipo=null) {
        const ISON = 'isON';
        const DISABLED = 1;
        const ENABLED = 0;


        var idMenuItemPrefix;
        var idMenuItem;



        idMenuItemPrefix = 'item_' + idParent ;

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
                    if(tipo!=null)
                        window.DicMenuMethodUpdate[prefix]([window.DicMenuData[prefix][pos],tipo],prefix);
                    else
                        window.DicMenuMethodUpdate[prefix](window.DicMenuData[prefix][pos],prefix);

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
            'meditacion':false

        };
        window.DicSwipe = {};
    }
}