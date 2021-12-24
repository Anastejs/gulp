// Задача - обработка css-файлов

import dartSass from "sass";    // плагин, препроцессор sass
import gulpSass from "gulp-sass";   // плагин для запуска препроцессора sass
import rename from "gulp-rename";   // плагин для переименования

import cleanCss from "gulp-clean-css";   // сжатие css файла
import webpcss from "gulp-webpcss";     // вывод webp-изображений
import autoprefixer from "gulp-autoprefixer";   // добавление вендорных префиксов (автоматическая кроссбраузерность)
import groupCssMediaQueries from "gulp-group-css-media-queries";   // группировка медиа запросов

const sass = gulpSass(dartSass);   // вызов из плагина gulpSass с передачей компилятора sass

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: true })
        .pipe(app.plugins.plumber(          // обработка ошибок
            app.plugins.notify.onError({    // уведомление с ошибкой в каком-то файле всплывает прямо из Windows
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.plugins.replace(/@img\//g, '../img/'))   // обработка алиасов - меняем путь к картинкам
        .pipe(sass({
            outputStyle: 'expanded'   // стиль: несжатый файл
        }))
        .pipe(groupCssMediaQueries())      // группировка медиа запросов
        .pipe(webpcss({
            webpClass: ".webp",         // если браузер поддерживает .webp
            noWebpClass: ".no-webp"     // если браузер не поддерживает
        }))
        .pipe(autoprefixer({     // добавим автопрефиксеры
            grid: true,                 // свойство grid обрабатываются автопрефиксерами
            overrideBrowserslist: ["last 3 versions"],  // количество версий у браузера (от самой современной)
            cascade: true
        }))
        .pipe(app.gulp.dest(app.path.build.css))    // выгружаем в папку результатов несжатый файл style.css (можно закомментить, если не нужно)
        .pipe(cleanCss())         // сжатие файла стиля
        .pipe(rename({
            extname: ".min.css"   // добавляет к названию файла .min.css
        }))
        .pipe(app.gulp.dest(app.path.build.css))    // выгружаем в папку с результатом
        .pipe(app.plugins.browsersync.stream());    // обновляем браузер
}