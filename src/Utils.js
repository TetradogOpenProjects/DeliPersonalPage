class Utils {
    static SaltaAAncora(idAncora) {

        var target = $('[name=' + idAncora + ']');
        if (target.length) {
            scrollTo({
                top: (target.offset().top - 100)
            });
        }

    }
}