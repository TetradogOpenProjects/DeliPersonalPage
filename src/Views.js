class Views {
    static GetImagenesWeb() {
        return fetch("Data/ImagenesWeb.json")
            .then(r => r.json());
    }

    static GetPlazas(presenciales, online=0) {
        var plazasDiv = '<div class="plazas">';
        if (presenciales > 0) {
            plazasDiv += '<label>' + presenciales + ' plazas presenciales </label>';
        }
        if (online > 0) {
            plazasDiv += '<label>' + online + 'plazas online </label>';
        }
        plazasDiv += '</div>';

        return plazasDiv;
    }
    static GetModalidad(presenciales = true, online = false, grabacion = false) {
        var modalidad = "<div class='modalidad'>";
        
        if (grabacion) {
            modalidad += "<img src='Imagenes/videoPlayer.svg' />";
        }
        if (online) {
            modalidad += " <label>online<label>";
        }
        if (presenciales) {
            modalidad += "<label>presencial</label>";
        }
    
   
        modalidad += "</div>";
        
        return modalidad;
    }
    static GetTituloYSubtitulo(titulo, subtitulo) {
        return '<div class="tituloYSubtitulo"><label class="titulo colorPrincipal">' + titulo + '</label><label class="subtitulo colorSecundario">' + subtitulo + '</label></div>';
    }
    static GetMasInfo(hide = true) {
        var strHide = '';
        if (hide) {
            strHide = "style='display:none'";
        }
        return '<div class="masInfo" ' + strHide + '><label>Más información</label></div>';
    }
    static GetMenosInfo(hide = true) {
        var strHide = '';
        if (hide) {
            strHide = "style='display:none'";
        }
        return '<div class="menosInfo" '+strHide+'><label>Menos información</label></div>';
    }
    static GetMasOMenosInfo(masInfoHide = false) {
        return '<div class="masOMenosInfo">' + Views.GetMasInfo(masInfoHide) + Views.GetMenosInfo(!masInfoHide) + "</div>";
    }
    static GetDuracionYDescanso(duracion, hayDescanso) {
        var divDuracion = '<div class="duracion">';
        divDuracion += '<label>' + duracion + '</label>';
        if (hayDescanso) {
            divDuracion += '<label>con descanso</label>';
        }
        divDuracion += '</div>';
        return divDuracion;
    }
    static GetPrecio(precio) {
        return '<div class="precio"><label>' + precio + ' €</label></div>';
    }
    static GetId(curso, prefix = 'curso') {
        var id = prefix + '_' + curso.Nombre.replaceAll(' ', '');
        return id;
    }
    
    static GetCursoDiv(curso) {
        var divCurso = '<div id="' + Views.GetId(curso) + '" class="curso">';

        divCurso += Views.GetFechaInicio(curso.Inicio, curso.Fin);
        divCurso += Views.GetPlazas(curso.PlazasPresenciales, curso.PlazasOnline);
        divCurso += Views.GetDuracionYDescanso(curso.Duracion, curso.HayDescanso);
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
        
        divMeditacion += Views.GetFechaInicio(meditacion.Fecha);
        divMeditacion += Views.GetPlazas(meditacion.PlazasPresenciales, meditacion.PlazasOnline);
        divMeditacion += Views.GetDuracionYDescanso(meditacion.Duracion, meditacion.HayDescanso);
        divMeditacion += Views.GetTituloYSubtitulo(meditacion.Nombre, meditacion.Descripcion);
        divMeditacion += Views.GetContentView(Views.GetId(meditacion, 'meditacion'), meditacion, !window.DicDesplegado['meditacion']);
        divMeditacion += Views.GetPrecio(meditacion.Precio);
        divMeditacion += Views.GetMasOMenosInfo(window.DicDesplegado['meditacion']);
        divMeditacion += Views.GetModalidad(meditacion.PlazasPresenciales > 0, meditacion.PlazasOnline > 0, meditacion.SeGrabara);
        divMeditacion += '</div>';

        return divMeditacion;
    }
    static GetCirculoDiv(circulo) {
        var divCirculo = '<div id="' + Views.GetId(circulo, 'circulo') + '" class="circulo">';

        divCirculo += Views.GetFechaInicio(circulo.Fecha);
        divCirculo += Views.GetPlazas(circulo.Plazas);
        divCirculo += Views.GetDuracionYDescanso(circulo.Duracion, circulo.HayDescanso);
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

        divTerapia += Views.GetFechaInicio();
        divTerapia += Views.GetTituloYSubtitulo(terapia.Nombre, terapia.Descripcion);
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
                divFecha += '<label>Inicio ' + inicio + '</label>';
            else
                divFecha += '<label>' + inicio + '</label>';
        }
        if (fin != null) {
            if (ponerInicioYFin)
                divFecha += '<label>Fin' + fin + '</label>';
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
        return '<div id="' + id + '" class="menu col-auto">' + innerHTML + '</div>';
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
                    divContent += "<div id='" + idMediaCarrusel + "' class='row' ><img id='img_" + idMediaCarrusel + "' class='col-12'  style='display:none;' />";
                    divContent += "<iframe id='video_" + idMediaCarrusel + "' class='col-12' style='display:none;' ></iframe></div>";
                    divContent += Views.getMenu(idMediaCarrusel, 'menuItemSecundarioOff', item.Content[i].Value.length);

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
                //ahora pongo el gesto de pasar el item con el dedo

    
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

    static setClickMenu(idParent, itemColorEnable, itemColorDisabled, metodoUpdateItem, arrayDataItems,tipo=null) {
        const ISON = 'isON';
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
                            $('#' + prefix + j).removeClass(ISON);
                        }
                    }

                    $(this).removeClass(window.DicMenuItemColors[prefix][DISABLED]);
                    $(this).addClass(window.DicMenuItemColors[prefix][ENABLED]);
                    $(this).addClass(ISON);
                    if(tipo!=null)
                        window.DicMenuMethodUpdate[prefix]([window.DicMenuData[prefix][pos],tipo]);
                    else
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
        window.DicDesplegado = {
            'circulo': false,
            'curso': false,
            'terapia': false,
            'meditacion':false

        };
        window.DicSwipe = {};
    }
}