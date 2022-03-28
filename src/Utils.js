class Utils {
    static SaltaAAncora(idAncora) {

        var target = $('[name=' + idAncora + ']');
        if (target.length) {
            scrollTo({
                top: (target.offset().top - 100)
            });
        }

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
}