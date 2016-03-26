# Arsenal Pay react components

Компоненты для постороения форм написанны на [React], с использованием синтаксиса [ES6].

### Установка
Для разработки форм с использованием этой библиотеки вам необходимы следующие инструмены:

- [Git]
- [Node.js]
- [npm]
- [Bower]
- [Gulp]

После того, как вы установили весь этот инструментарий, выполните следующие команды:

```sh
$ git clone <this-repository>
$ cd <this-project>
$ npm install
$ bower install
```

Теперь все пакеты установлены и вы можете приступать к разработке.

### Архитектура проекта
 - __src__ - здесь находятся все исходные данные
 - - __assets__ -  здесь лежат все статический файлы, например картинки
 - - __jade-templates__ - куски переиспользуемого кода для шаблонизатора **jade**
 - - __js__ javascript файлы компонентов и готовых форм.
 - - - __components__ - все компоненты разбиты по отдельным файлам.
 - - - __utils__ - модуль со вспомогательными функциями.
 - __styles__ - файлы стилей
 - __test__ - папка с тестами и спецификайией для тестов

### Разработка

Во-первых, запустите тесты, чтобы быть увереным в правильности вспомогательных функций
```sh
$ npm run test
```

Далее выполните команду:
```sh
$ npm run serve
```
Произойдет сборка проекта, запуститься сервер, доступный по адресу __localhost:9300__
В идеале должен индексная страница с проекта должна открыться автоматически в браузере по умолчанию,
если этого не произошло, то просто откройте новую вкалдку и введите описанный выше адрес.

#### Создание новой формы из готовых компонентов

В этом пимере описано как создать форму оплаты с помощью карты.

```sh
$ cd src/js/
$ touch card-from.jsx
```

После этого откройте созданный файл в вашем любимом редакторе и подключите базовые компоненты:
```javascript
import React from 'react'; // Подключаем React
import ReactDOM from 'react-dom'; // Подключаем модуль для рендера React компонентов в DOM
import Form from './components/Form.jsx'; // Базовый компонент формы
import CardInput from './components/card-input.jsx' // Компонент поля ввода номера карты
import ExpRow from './components/expire-row.jsx'; // Компонент выпадающих списков даты истечения и cvc
import AmountInput from './components/amount-input.jsx'; // Компонент поля вводы суммы
import SubmitButton from './components/submit-button.jsx'; // Компонент кнопки для сабмита
import Footer from './components/footer.jsx'; // Компонент футера с логотипами и ссылкой
import errorLogger from 'client-error-logger'; // Модуль логирования ошибок
import {loadFont} from './utils/utils'; // Модуль загрузки шрифтов

// вызов функции логирования ошибок клиента на сервер (Опционально)
errorLogger('https://arsenalpay.ru/p2p/log.php');

// Загружаем шрифты
loadFont();

// Создаем компнент формы карты
let Card = React.createClass({
    render() {
        return (
            <Form>
                <CardInput name="CARD" />
                <ExpRow name="Expire" />
                <AmountInput name="AMOUNT" label="Сумма перевода"/>
                <SubmitButton title="Перевести" />
                <Footer />
            </Form>
        );
    }
});

// Экспортируем компонент, (опционально)
export default Card;

// Рендерим компонент в контейнер на странице с id card-form
ReactDOM.render(<Card />, document.getElementById('card-form'));

```

-----

#### Валидация введенных значений
У каждого компонента ввода (основан на теге input) присутсвует приватный метод _validate,
который вызывается при событии __blur__ и __submit__.

Все вспомогательные методы валидации такие как возвращение только числовых значений,
только строк и тд. описаны в коллекции utils.

#### RoadMap
  - [x] Form - основной корневой компонент в нутри которого происходит подключение
        дочерних компонентов, и вызываются методы валидации введенных данных
  - [x] phoneInput - поле ввода номера телефона с маскированием и валидацией
  - [x] amountInput - поле ввода ссумы с маскированием и валидацией
  - [x] accountInput - поле воода номера договора с минимальной валидацией
  - [x] cardNumberInput - поле ввода номера карты с маскированием и валидацией
  - [ ] emailInput - поле ввода email
  - [ ] walletsSelect - выпадающий список для выбора метода платеже в форме для кошельков
  - [ ] expireSelect - выпадающие списки выбора даты истечения для карты
  - [ ] cvc - поле ввода 
  - [x] submitButton - кнопка для отправки формы
  
  
[//]: # (Вспомогательные ссылки и данные.)

[React]: <https://facebook.github.io/react/>
[jQuery Mask Plugin]: <https://github.com/igorescobar/jQuery-Mask-Plugin>
[jQuery.inputmask]: <https://github.com/RobinHerbots/jquery.inputmask>
[ES6]: <https://developer.mozilla.org/ru/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla>
[Git]: <https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-Git>
[Node.js]: <https://nodejs.org/en/>
[npm]: <https://www.npmjs.com/>
[Bower]: <http://bower.io/>
[Gulp]: <http://gulpjs.com/>