// Задача - обработка шрифтов

import fs from "fs";     // плагин node, работает с файловой системой, уже встроен, скачивать не нужно
import fonter from "gulp-fonter";          // преобразовывает шрифты из формата otf в ttf и woff
import ttf2woff2 from "gulp-ttf2woff2";    // в woff2

export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})   // ищем файлы .otf в папке с исходниками
        .pipe(app.plugins.plumber(          // обработка ошибок во время компиляции gulp-ом
            app.plugins.notify.onError({    // уведомление с ошибкой в каком-то файле всплывает прямо из Windows
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(fonter({         // конвертируем в .ttf
            formats: ['ttf']
        }))
        //
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))    // выгружаем в исходную папку
}

export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})    // ищем файлы шрифтов .ttf
        .pipe(app.plugins.plumber(          // обработка ошибок во время компиляции gulp-ом
            app.plugins.notify.onError({    // уведомление с ошибкой в каком-то файле всплывает прямо из Windows
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(fonter({         // конвертируем .ttf в .woff
            formats: ['woff']
        }))
        //
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))    // выгружаем .woff в папку с результатами
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))   // ищем файлы .ttf в папке с исходниками
        .pipe(ttf2woff2())   // конвертируем .ttf в .woff2
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));   // выгружаем .woff2 в папку с результатами
}

