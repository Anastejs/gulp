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

// Задача - записывает подключения файлов шрифтов в файл стилей
export const fontsStyle = () => {
    // Файл стилей подключения шрифтов
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    // Проверяем существуют ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function (err, fontsFiles){
        if (fontsFiles){
            // Проверяем существует ли файл стилей для подключения шрифтов
            if(!fs.existsSync(fontsFile)){
                // Если файла нет, создаем его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++){
                    // Записываем подключение шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName){
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if(fontWeight.toLowerCase() === 'thin'){
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight'){
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'extralight'){
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light'){
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium'){
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold'){
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold'){
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy'){
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black'){
                            fontWeight = 900;
                        } else{
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile,`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format('woff2'), url("../fonts/${fontFileName}.woff") format('woff');\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else{
                // Если файл есть, выводим сообщение
                console.log("The file scss/fonts.scss is already exists. To update the file you need to delete it.");
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb(){}
}