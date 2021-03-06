import del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
    del(`./${app.path.rootFolder}.zip`);    // удаляем zip-архив, который возможно уже существует
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})     // получаем все файлы любого уровня вложенности
        .pipe(app.plugins.plumber(          // обработка ошибок во время компиляции gulp-ом
            app.plugins.notify.onError({    // уведомление с ошибкой в каком-то файле всплывает прямо из Windows
                title: "ZIP",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
        .pipe(app.gulp.dest('./'));
}