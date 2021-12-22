// Получаем имя папки проекта (в данном случае - gulp)
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;      // Также можно использовать rootFolder
const srcFolder = `./src`;

// вся инфа о пути любого файла
export const path = {
    // объект путей к папке с результатом
    build: {
        html: `${buildFolder}/`,
        // в - папку с результатом
        files: `${buildFolder}/files/`,
    },
    // объект путей к исходным файлам
    src: {
        // html - пути только тех файлов, что находятся в корне
        html: `${srcFolder}/*.html`,
        // абсолютно любые файлы с любым расширением в папке src
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        // html - наблюдать за всеми файлами (и те, что в корне, и в подпапках)
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``     // можно указать папку на удалённом ftp-сервере
}