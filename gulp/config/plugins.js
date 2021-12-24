import replace from "gulp-replace";  // поиск и замена
import plumber from "gulp-plumber";  // обработка ошибок
import notify from "gulp-notify";  // сообщения (подсказки)
import browsersync from "browser-sync";   // локальный сервер - запускает локальный сервер, при сборке автоматически открывается браузер и обновляет его при любых изменениях

// Экспортируем объект
export  const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync
}