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
        } else if (online < 0) {
            plazasDiv += '<label class="segundo"> &#8734; plazas online </label>';
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
        var divPrecio;
        if (precio > 0) {
            divPrecio = '<div class="precio"><label>' + precio + ' €</label></div>';
        }
        else if (precio < 0) {
            divPrecio = '<div class="precio"><label>A Consultar</label></div>';
        }
        else {
            divPrecio = '<div class="precio"><label>Gratuita</label></div>';
        }
        return divPrecio;
    }
    static GetId(curso, prefix = 'curso') {
        var id = prefix + '_' + Utils.ReplaceAll(curso.Nombre, ' ', '');
        return id;
    }


    
    static GetItemDiv(item, type) {

        var plazasOnline = 0, plazasPresenciales = 0;
        var divItem = '<div id="' + Views.GetId(item, type) + '" class="' + type + '">';

        if (item.hasOwnProperty('PlazasPresenciales') || item.hasOwnProperty('PlazasOnline')) {
            divItem += '<div><div class="fechaYPlazas">';
            divItem += '<div class="row">';
            if (item.hasOwnProperty('Fecha')) {
                divItem += Views.GetFechaInicio(item.Fecha);
            } else if (item.hasOwnProperty('FechaInicio') && item.hasOwnProperty('FechaFin')) {
                divItem += Views.GetFechaInicio(item.FechaInicio, item.FechaFin);
            } else {
                divItem += '<div class="sinFecha"></div>';
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
        if (item.hasOwnProperty('Content')) {
            divItem += Content.get(Views.GetId(item, type), item, !Content.DicDesplegado[type]);
        } 
        divItem += Views.GetPrecio(item.Precio);
        if (item.hasOwnProperty('Content')) {
            divItem += Views.GetMasOMenosInfo(Content.DicDesplegado[type]);
        } else {
            divItem += '<span class="noMasOMenosInfo">&nbsp;</span>';
        }
        if (item.hasOwnProperty('PlazasPresenciales') || item.hasOwnProperty('PlazasOnline')) {
            divItem += Views.GetModalidad(item.hasOwnProperty('PlazasPresenciales') && item.PlazasPresenciales > 0, item.hasOwnProperty('PlazasOnline') && (item.PlazasOnline > 0 || item.PlazasOnline < 0), item.SeGrabara);
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
            Content.setClicMenus(id, item);
            
        }

        $('#' + id + ' .masInfo').click(function () {
            $('#' + id + ' .masInfo').hide();
            $('#' + id + ' .menosInfo').show();
            $('#' + id + ' .content').show();
            $('#' + id + ' .preContent').hide();
            Content.DicDesplegado[tipo] = true;
        });
        $('#' + id + ' .menosInfo').attr('tipo', tipo);
        $('#' + id + ' .menosInfo').click(function () {
   
            
            $('#' + id + ' .masInfo').show();
            $('#' + id + ' .menosInfo').hide();
            $('#' + id + ' .content').hide();
            $('#' + id + ' .preContent').show();
            Content.DicDesplegado[tipo] = false;
            Utils.SaltaAAncora($(this).attr('tipo') + 'Principio');
             
     
            
        });

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







}