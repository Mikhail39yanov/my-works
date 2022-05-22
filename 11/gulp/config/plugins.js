import replace from 'gulp-replace'        // поиск замена
import plumber from 'gulp-plumber'        // обработка ошибок
import notify from 'gulp-notify'          // вплывающие подсказки
import browserSync from 'browser-sync'    // локальный сервер
import newer from 'gulp-newer'            // проверка обновлений картинок
import ifPlugin from 'gulp-if'            // условние ветвление
import sourcemaps from 'gulp-sourcemaps'

export default {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
  newer: newer,
  if: ifPlugin,
  sourcemaps: sourcemaps
}
