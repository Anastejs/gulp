// Задача - обработка изображений
import webp from "gulp-webp";   // создание webp-изображений
import imagemin from "gulp-imagemin";
import webpHtmlNosvg from "gulp-webp-html-nosvg";   // оптимизация изображений

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(          // обработка ошибок во время компиляции gulp-ом
            app.plugins.notify.onError({    // уведомление с ошибкой в каком-то файле всплывает прямо из Windows
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.plugins.newer(app.path.build.images))  // проверка картинок в папке результатов, чтобы не обновлять уже готовые
        .pipe(
            app.plugins.if(
                app.isBuild,
                webp()    // создание webp-изображений
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images)    // выгружаем webp-изображения в папку с результатами
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images)      // получение доступа к изображениям в папке исходников
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.newer(app.path.build.images)   // снова проверка изображений в папке результатов
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                imagemin({          // оптимизация (сжимание) изображений
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3   // 0 to 7 - насколько сильно сжимать
                })
            )
        )

        .pipe(app.gulp.dest(app.path.build.images))   // выгружаем оптимизированные картинки в папку с результатом
        .pipe(app.gulp.src(app.path.src.svg))         // получение доступа к svg-изображениям
        .pipe(app.gulp.dest(app.path.build.images))   // копирование/выгрузка svg-изображений в папку результатов
        .pipe(app.plugins.browsersync.stream());      // обновляем браузер
}
