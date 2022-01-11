import { configFTP } from '../config/ftp.js';
import vinylFTP from "vinyl-ftp";
import util from "gulp-util";

export const ftp = () => {
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP);    // создаём подключение
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})     // получаем все файлы любого уровня вложенности
        .pipe(app.plugins.plumber(          // обработка ошибок во время компиляции gulp-ом
            app.plugins.notify.onError({    // уведомление с ошибкой в каком-то файле всплывает прямо из Windows
                title: "FTP",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}