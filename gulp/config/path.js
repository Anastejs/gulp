// Получаем имя папки проекта (в данном случае - gulp)
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;      // Также можно использовать rootFolder
const srcFolder = `./src`;

// вся инфа о пути любого файла
export const path = {
    // объект путей к папке с результатом
    build: {
        images: `${buildFolder}/img/`,
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        // в - папку с результатом
        files: `${buildFolder}/files/`,
    },
    // объект путей к исходным файлам
    src: {
        svg: `${srcFolder}/img/**/*.svg`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        js: `${srcFolder}/js/app.js`,
        scss: `${srcFolder}/scss/style.scss`,
        // html - пути только тех файлов, что находятся в корне
        html: `${srcFolder}/*.html`,
        // абсолютно любые файлы с любым расширением в папке src
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        // html - наблюдать за всеми файлами (и те, что в корне, и в подпапках)
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/files/**/*.*`
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``     // можно указать папку на удалённом ftp-сервере
}