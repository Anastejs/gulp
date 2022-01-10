// Задача - обработка html-файлов

// gulp-file-include - плагин, который собирает из многих файлов один (header.html -> index.html) с помощью @@include('html/header.html',{})
import fileInclude from "gulp-file-include";
// gulp-webp-html-nosvg - плагин, подключает формат .webp автоматически
import webpHtmlNosvg from "gulp-webp-html-nosvg";
// gulp-version-number - плагин, избегает кеширования css/js файлов в браузере, добавляя к ним ключ - чтобы заказчик не кричал и сразу видел все изменения
import versionNumber from "gulp-version-number";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(                // обработка ошибок во время компиляции gulp-ом
            app.plugins.notify.onError({          // уведомление с ошибкой в каком-то файле всплывает прямо из Windows
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(fileInclude())
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(
            app.plugins.if(           // только если режим продакшна
                app.isBuild,
                webpHtmlNosvg()       // преобразование в webp формат
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                // добавление версий
                versionNumber({
                    'value': '%DT%',     // добавляем текущую дату и время до секунд
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'    // создаётся файл, в котором будет хранится этот ключ
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());      // обновление браузера
}
