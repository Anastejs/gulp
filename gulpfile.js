// Импортируем основной модуль gulp
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";

// Передаём значения в глобальную переменную
global.app = {
    path: path,
    gulp: gulp
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";

// Функция - наблюдатель за изменениями в файлах
function watcher(){
    // (путь к файлам, действие что нужно совершить)
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
}

const mainTasks = gulp.parallel(copy, html);

// Построение сценариев выполнения задач (series - последовательное выполнение)
const dev = gulp.series(reset, mainTasks, watcher);

// Выполнение сценария по умолчанию
gulp.task('default', dev);
