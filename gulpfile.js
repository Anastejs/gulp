// Импортируем основной модуль gulp
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаём значения в глобальную переменную
global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins,
    isBuild: process.argv.includes('--build'),    // если переменная хранит в себе флаг '--build', то это режим продакшна
    isDev: !process.argv.includes('--build')      // если нет - то режим разработчика
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";

// Функция - наблюдатель за изменениями в файлах
function watcher(){
    // (путь к файлам, действие что нужно совершить)
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// Не включаем в стандартный сценарий задач, можно вызвать отдельно, когда нужно, и один раз создать спрайт
export { svgSprive }

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Построение сценариев выполнения задач (series - последовательное выполнение)
// const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));  // оригинальный сценарий, но мне не актуальна функция server так, как в WebStorm и так по умолчанию обновляет страницу в браузере
const dev = gulp.series(reset, mainTasks, watcher);                            // режим разработчика
const build = gulp.series(reset, mainTasks);                                   // режим продакшна
const deployZIP = gulp.series(reset, mainTasks, zip);                          // новый сценарий (удаление папки с результатом, основные задачи, создание архива)

// Экспорт сценариев
export { dev }
export { build }
export { deployZIP }

// Выполнение сценария по умолчанию
gulp.task('default', dev);
