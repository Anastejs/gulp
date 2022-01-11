// Задача - обработка js-файлов
import webpack from "webpack-stream";

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(          // обработка ошибок во время компиляции gulp-ом
            app.plugins.notify.onError({    // уведомление с ошибкой в каком-то файле всплывает прямо из Windows
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js',    // указываем файл результатов
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))    // выгружаем в папку с результатом
        .pipe(app.plugins.browsersync.stream());    // обновляем браузер
}