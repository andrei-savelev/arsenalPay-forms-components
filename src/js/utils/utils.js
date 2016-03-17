var _ = require('lodash');
var _cardsSetings = [{
    type: 'visaelectron',
    patterns: [4026, 417500, 4405, 4508, 4844, 4913, 4917],
    format: /(\d{1,4})/g,
    cardLength: [16],
    cvcLength: [3],
    luhn: true
},
{
    type: 'maestro',
    patterns: [50, 56, 57, 58, 59, 60, 61, 62, 63, 66, 67, 68, 69],
    format: /(\d{1,4})/g,
    cardLength: [12, 19],
    cvcLength: [3],
    luhn: true
},
{
    type: 'visa',
    patterns: [4],
    format: /(\d{1,4})/g,
    cardLength: [13, 16],
    cvcLength: [3],
    luhn: true
},
{
    type: 'mastercard',
    patterns: [51, 52, 53, 54, 55],
    format: /(\d{1,4})/g,
    cardLength: [16],
    cvcLength: [3],
    luhn: true
}];

/**
 * Метод показывает тултип под полем с ошибкой или вспомогательной информацией,
 * в зависимости от переданного второго параметра.
 * @param $element - jquery элемент
 * @param type {string} - тип подсказки
 * @param message {string} - сообщение в подсказке
 * @private
 */
function _showInfo($element, type, message) {
    var whichOfType = {
        error: function () {
            $element
                .text(message)
                .removeClass('_help')
                .addClass('_show')
                .addClass('_visible')
        },
        info: function() {
            $element
                .text(message)
                .removeClass('_show _visible')
                .toggleClass('_help')
                .toggleClass('_visible');
        }
    };

    whichOfType[type]();
}

/**
 * Метод принимает строку и возвращает единовременно все читсла, которые есть в строке
 * в том же порядке, в котором они переданы
 * @param value {string}
 * @returns {*|string}
 * @private
 */
function _getOnlyNumbers(value) {
    var numb = value.match(/\d/g);
    // Silent error
    try {
        return numb.join("");
    } catch (e) {}
}

/**
 * Метод для обработки события ввода/_cardsSetingsки в текстовое поле_cardsSetings@param target
 * @returns {string}
 * @private
 */
function _upperCase(value) {
    return _.trim( value.toUpperCase() );
}

/**
 * Метод загружает Google шрифт
 * @private
 */
function _loadGFont () {
    window.WebFontConfig = {
        google: { families: [ 'Open+Sans::cyrillic-ext' ] }
    };
    (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();
}

function _hideInfo($element) {
    $element.removeClass('_show')
}


function _cardFromNumber (num) {
    var card,
        i,
        j,
        len1,
        len2,
        p,
        pattern,
        ref,
        result;

    num = (num + '').replace(/\D/g, '');

    for (i = 0, len1 = _cardsSetings.length; i < len1; i++) {
        card = _cardsSetings[i];
        ref = card.patterns;

        for (j = 0, len2 = ref.length; j < len2; j++) {
            pattern = ref[j];
            p = pattern + '';

            if (num.substr(0, p.length) === p) {
                result = card;
            }
        }
    }

    return result || {};
}

function _luhnCheck (num) {
    var digit,
        digits,
        i,
        len1,
        odd,
        sum;

    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();

    for (i = 0, len1 = digits.length; i < len1; i++) {
        digit = digits[i];
        digit = parseInt(digit, 10);

        if ((odd = !odd)) {
            digit *= 2;
        }

        if (digit > 9) {
            digit -= 9;
        }

        sum += digit;
    }

    return sum % 10 === 0;
}

var utils = {
    loadFont: _loadGFont,
    showInfoTooltip: _showInfo,
    hideInfoTooltip: _hideInfo,
    upperCase: _upperCase,
    getOnlyNumbers: _getOnlyNumbers,
    getCard: _cardFromNumber,
    luhnCheck: _luhnCheck,

    /**
     * Список текстов для поля подсказки
     */
    messageTexts: {
        onlyNumbersAccepted: 'Допускается ввод только цифр от 0 - 9',
        emptyAmount: 'Введите сумму оплаты',
        emptyAccount: 'Заполните поле',
        incorrectAccount: 'Проверьте правильность ввода и попробуйте еще раз',
        maxAmount: 'Максимальная сумма возможного платежа 75000 руб',
        minAmount: 'Минимальная сумма для оплаты 60 руб',
        emptyPhone: 'Введите номер телефона',
        minPhoneLength: 'Номер введен не полностью, попробуйте еще раз',
        invalidFirstSymbol: 'Номер телефона должен начинаться с +79',
        checkOperators: 'Платежи доступны только для абонентов....',
        availableOperators: 'Оплата с баланса мобильного телефона доступна для абонентов ....',
        emptyCard: 'Введите номер карты',
        luhnFailed: 'Номер карты введен неверно, попробуйте еще раз'
    },

    /**
     * Список допустимых начальных первых цифр в номере карты
     */
    cardFirstLetters: ['4', '5', '6'],

    /**
     * Дефолтные настройки для определения типа карты
     */
    cardsSettings: _cardsSetings
};

module.exports = utils;
