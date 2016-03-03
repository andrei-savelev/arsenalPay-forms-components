var _ = require('lodash');

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
 * Метод для обработки события ввода/вставки в текстовое поле.
 * Возвращает строку в верхнем регистре
 * @param target
 * @returns {string}
 * @private
 */
function _upperCase(target) {
    var value = target.value;
    return _.trim( target.value = value.toUpperCase() );
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

module.exports = {
    loadFont: _loadGFont,
    showInfoTooltip: _showInfo,
    upperCase: _upperCase,
    getOnlyNumbers: _getOnlyNumbers,

    phoneMaskOptions: {
        onInvalid: function () {
            _showInfo($('.js-error-tooltip'), 'error', 'Не правильно указан номер')
        },

        onComplete: function () {
            _hideInfo($('.js-error-tooltip'))
        }
    },

    amountMaskOptions: {
        onKeyPress: function(cep, e, field, options){
            var masks = ['00000', '0 0000', '00 000'];
            var numericValue = _getOnlyNumbers(cep);
            var trueValueLength = null;
            var mask = null;

            !_.isEmpty(cep) && (trueValueLength = _getOnlyNumbers(cep).length);

            /*if ( String(numericValue).charAt(0) == 0 ) {
                showInfo($($amountField), $($infoBLock), 'error', errorTexts.inCorrectInput);
            } else if ( numericValue > 60 && numericValue < 75000 ) {
                hideInfo($($amountField), $($infoBLock))
            }*/

            if (trueValueLength <= 3) {
                mask = masks[0];
            } else if (trueValueLength == 4) {
                mask = masks[1];
            } else if (trueValueLength == 5) {
                mask = masks[2];
            }

            $(field).mask(mask, options);
        }

        /*onInvalid: function () {
            _showInfo($($amountField), $($infoBLock), 'error', errorTexts.onlyNumbersAccepted);
        },

        onComplete: function () {
            if ( getOnlyNumbers($($amountField).val()) > 75000 ) {
                showInfo($($amountField), $($infoBLock), 'error', errorTexts.maxAmount);
            } else {
                hideInfo($($amountField), $($infoBLock))
            }
        }*/
    },

    messageTexts: {
        onlyNumbersAccepted: 'Допускается ввод только цифр от 0 - 9',
        availableOperators: 'Оплата с баланса мобильного телефона доступна для абонентов ....',
        typeAmount: 'Введите сумму оплаты',
        inCorrectInput: 'Поле заполнено неверно',
        maxAmount: 'Максимальная сумма возможного платежа 75000 руб',
        minAmount: 'Минимальная сумма для оплаты 60 руб',
        typePhone: 'Введите номер телефона',
        phoneFormat: 'Номер телефона должен соответствовать формату: +7 (___) ___ __ __',
        helpPrefix: 'Введите'
    }
};
