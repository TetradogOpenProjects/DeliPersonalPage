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

        if (presenciales) {
            modalidad += "<label>presencial</label>";
        }
        if (online) {
            modalidad += " <label>online<label>";
        }
        if (grabacion) {
            modalidad += "<img src='Imagenes/videoPlayer.svg' />";
        }
        modalidad += "</div>";
        
        return modalidad;
    }
    static GetTituloYSubtitulo(titulo, subtitulo) {
        return '<div class="tituloYSubtitulo"><label class="titulo">' + titulo + '</label><label class="subtitulo">' + subtitulo + '</label></div>';
    }
    static GetMasInfo() {
        return '<div class="masInfo"><label>Más información</label></div>';
    }
    static GetMenosInfo(hide = true) {
        var strHide = '';
        if (hide) {
            strHide = "style='display:none'";
        }
        return '<div class="menosInfo" '+strHide+'><label>Menos información</label></div>';
    }
    static GetMasOMenosInfo() {
        return '<div class="masOMenosInfo">' + this.GetMasInfo() + this.GetMenosInfo(true) + "</div>";
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
        return prefix+'_' + curso.Nombre.replace(' ', '');
    }

    static GetCursoDiv(curso) {
        var divCurso = '<div id="' + this.GetId(curso) + '" class="curso">';

        divCurso += this.GetFechaInicio(curso.Inicio, curso.Fin);
        divCurso += this.GetPlazas(curso.PlazasPresenciales, curso.PlazasOnline);
        divCurso += this.GetDuracionYDescanso(curso.Duracion, curso.HayDescanso);
        divCurso += this.GetTituloYSubtitulo(curso.Nombre, curso.Descripcion);
        divCurso += this.GetContentView(this.GetId(curso), curso, true);
        divCurso += this.GetPrecio(curso.Precio);
        divCurso += this.GetMasOMenosInfo();
        divCurso += this.GetModalidad(curso.PlazasPresenciales > 0, curso.PlazasOnline > 0, curso.SeGrabara);
        divCurso += '</div>';

        return divCurso;
    }
    static GetMeditacionDiv(meditacion) {
        var divMeditacion = '<div id="' + this.GetId(meditacion, 'meditacion') + '" class="meditacion">';
        
        divMeditacion += this.GetFechaInicio(meditacion.Fecha);
        divMeditacion += this.GetPlazas(meditacion.PlazasPresenciales, meditacion.PlazasOnline);
        divMeditacion += this.GetDuracionYDescanso(meditacion.Duracion, meditacion.HayDescanso);
        divMeditacion += this.GetTituloYSubtitulo(meditacion.Nombre, meditacion.Descripcion);
        divMeditacion += this.GetContentView(this.GetId(meditacion, 'meditacion'), meditacion, true);
        divMeditacion += this.GetPrecio(meditacion.Precio);
        divMeditacion += this.GetMasOMenosInfo();
        divMeditacion += this.GetModalidad(meditacion.PlazasPresenciales > 0, meditacion.PlazasOnline > 0, meditacion.SeGrabara);
        divMeditacion += '</div>';

        return divMeditacion;
    }
    static GetCirculoDiv(circulo) {
        var divCirculo = '<div id="' + this.GetId(circulo, 'circulo') + '" class="circulo">';

        divCirculo += this.GetFechaInicio(circulo.Fecha);
        divCirculo += this.GetPlazas(circulo.Plazas);
        divCirculo += this.GetDuracionYDescanso(circulo.Duracion, circulo.HayDescanso);
        divCirculo += this.GetTituloYSubtitulo(circulo.Nombre, circulo.Descripcion);
        divCirculo += this.GetContentView(this.GetId(circulo, 'circulo'), circulo, true);
        divCirculo += this.GetPrecio(circulo.Precio);
        divCirculo += this.GetMasOMenosInfo();
        divCirculo += this.GetModalidad(true,false, curso.SeGrabara);
        divCirculo += '</div>';

        return divCirculo;
    }
    
    static GetTerapiaDiv(terapia) {
        var divTerapia = '<div id="' + this.GetId(terapia,'terapia') + '" class="terapia">';

        divTerapia += this.GetFechaInicio();
        divTerapia += this.GetTituloYSubtitulo(terapia.Nombre, terapia.Descripcion);
        divTerapia += this.GetContentView(this.GetId(terapia, 'terapia'), terapia, true);
        divTerapia += this.GetPrecio(terapia.Precio);
        divTerapia += this.GetMasOMenosInfo();
        divTerapia += this.GetModalidad(terapia.EsPresencial, terapia.EsOnline);
        divTerapia += '</div>';

        return divTerapia;
    }
    static SetClicMasOMenosInfo(item, tipo) {
        var id = this.GetId(item, tipo);
        $('#' + id + ' .masInfo').click(function () {
            $('#' + id + ' .masInfo').hide();
            $('#' + id + ' .menosInfo').show();
            $('#' + id + ' .content').show();
        });
        $('#' + id + ' .menosInfo').click(function () {
            $('#' + id + ' .masInfo').show();
            $('#' + id + ' .menosInfo').hide();
            $('#' + id + ' .content').hide();
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
        var div = '<div id="' + id + '" class="circulo ' + clases + '" ';
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
        var idMediaCarrusel;//falta que quede bien al mezclar videos con imagenes
        var strHide = '';
        if (hide) {
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