import fs from 'fs'
import ttf2woff2 from 'gulp-ttf2woff2'
// import fonter from 'gulp-fonter' // для windows включить этот плагин
import fonter from 'gulp-fonter-unx' // для мак включить этот плагин

export const otfToTtf = () => {
  // поиск шрифтов с .otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      })
    ))
    // Конвертайция в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
  // поиск шрифтов с .ttf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      })
    ))
    // Конвертайция в .woff
    .pipe(fonter({
      formats: ['woff']
    }))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
  //Файл стилей подключения шрифтов
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`
  //Проверяем, существуют ли файлы шрифтов
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      //Проверяем, существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        //Если файла нет, создаём его
        fs.writeFile(fontsFile, '', cb)
        let newFileOnly
        for (var i = 0; i < fontsFiles.length; i++) {
          //Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900
            } else {
              fontWeight = 400
            }
            fs.appendFile(fontsFile,
              `@font-face{
                font-family: ${fontName};
                font-display: swap;
                src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                font-weight: ${fontWeight};
                font-style: normal;
              }\r\n`, cb)
            newFileOnly = fontFileName
          }
        }
      } else {
        //Если файл есть, выводим сообщение
        console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!");
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`)
  function cb() { }

}
