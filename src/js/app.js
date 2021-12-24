// импортирование модулей
import * as flsFunctions from "./modules/functions.js";

// Закомментила для удобства
flsFunctions.isWebp();

// Пример подключения js плагина - сенсорный слайдер Swiper (сначала npm i -D swiper)
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';
const swiper = new Swiper();

// Просто проверка
console.log('Ahoooj!');