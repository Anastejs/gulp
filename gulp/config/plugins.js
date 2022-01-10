import replace from "gulp-replace";  // поиск и замена
import plumber from "gulp-plumber";  // обработка ошибок
import notify from "gulp-notify";  // сообщения (подсказки)
import browsersync from "browser-sync";   // локальный сервер - запускает локальный сервер, при сборке автоматически открывается браузер и обновляет его при любых изменениях
import newer from "gulp-newer";   // проверка обновлений (с помощью него обрабатываем только те изображения, которых ещё нет в папке с результатами)
import  ifPlugin from "gulp-if";   // условное ветвление

// Экспортируем объект
export  const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}