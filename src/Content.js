class Content {

    static get(idParent, item, isHiden = false) {
        var divContent;
        var idMediaCarrusel;
        var strHide = '';
        
        Content.Init();

        if (isHiden) {
            strHide = "style='display:none'";
        }

        divContent = "<div id='content_" + idParent + "'class='content' " + strHide + ">";

        for (var i = 0; i < item.Content.length; i++) {
            if (item.Content[i].IsUrl) {
                if (item.Content[i].Value.length == 1) {
                    if (item.Content[i].Value[0].indexOf('http') == -1) {
                        divContent += "<img src='" + item.Content[i].Value[0] + "' class='row col-12' ></img>";
                    } else {
                        divContent += "<iframe src='" + item.Content[i].Value[0] + "' class='row col-12' ></iframe>";
                    }
                }
                else {

                    idMediaCarrusel = "media_" + i + "_" + idParent;
                    divContent += "<div id='" + idMediaCarrusel + "' class='row' ><img id='img_" + idMediaCarrusel + "' class='col-12 carrusel'  style='display:none;' />";
                    divContent += "<iframe id='video_" + idMediaCarrusel + "' class='col-12 carrusel' style='display:none;' ></iframe></div>";
                    divContent += Menu.get(idMediaCarrusel, 'menuItemSecundarioOff', item.Content[i].Value.length);

                }
            } else {
                divContent += "<p class='row'>" + item.Content[i].Value + "</p>";
            }
        }

        divContent += "<p class='row'></p>";
        divContent += "</div>";

        return divContent;
    }
    static setClicMenus(idParent, item) {
        var idMediaCarrusel;
        Content.Init();


        for (var i = 0; i < item.Content.length; i++) {
            if (item.Content[i].IsUrl && item.Content[i].Value.length > 1) {

                idMediaCarrusel = "media_" + i + "_" + idParent;
                Menu.setClick(idMediaCarrusel, 'menuItemSecundarioOn', 'menuItemSecundarioOff', (pathImg, idMedia) => {

                    idMedia = idMedia.replace('item_', '');

                    if (pathImg.indexOf('http') == -1) {
                        $("#img_" + idMedia).attr('src', pathImg);
                        $("#video_" + idMedia).hide();
                        $("#img_" + idMedia).show();
                    } else {
                        $("#video_" + idMedia).attr('src', pathImg);
                        $("#video_" + idMedia).show();
                        $("#img_" + idMedia).hide();
                    }
                }, (tipo) => {

                    if (Content.DicDesplegado[tipo]) {
                        Utils.SaltaAAncora(tipo + 'Principio');
                    }

                }, item.Content[i].Value);
                //ahora pongo el gesto de pasar el item con el dedo


            }
        }


    }
    static Init() {
        if (!Content.hasOwnProperty('DicDesplegado')) {
            Content.DicDesplegado = {
                'circulo': false,
                'curso': false,
                'terapia': false,
                'meditacion': false

            };
        
        }

    }

}