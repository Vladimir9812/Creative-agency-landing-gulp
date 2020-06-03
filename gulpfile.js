//----------------------
//Структура
// require('module name') - подключение модулей
// gulp.task('taskname',function() {}) - шаблон таска
// 1) gulp.src('source-files') - файлы для обработки
// 2) .pipe(plugin()) - выполнение плагина
// 3) .pipe(gulp.dest('folder')) - куда необходимо выгрузить готовое решение (папка folder)
//----------------------

let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let autoprefixer = require('gulp-autoprefixer');
// let ghPages = require('gulp-gh-pages');


// сборка

// управление sass файлами
gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss') //поиск по шаблонному пути
    .pipe(sass({outputStyle: "compressed"})) // сжатие файла
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 3 versions']   // добавление браузерных префиксов
    }))
    .pipe(rename({suffix: ".min"})) // добавление суффикса к имени
    .pipe(gulp.dest('app/css')) 
    .pipe(browserSync.reload({stream: true})) // чтобы страница обновлялась при изменении в css
});

// управление html файлами
gulp.task('html', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
})

// управление пользовательским скриптом
gulp.task('script', function() {
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
})

// управление скриптами библиотек
gulp.task('js', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/slick-carousel/slick/slick.js'
    ])
    .pipe(concat('libs.min.js')) // обьединение js файлов в один
    .pipe(uglify()) // минификация js файла
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
})

// чтобы автоматически перезагружался 
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app" //корневая папка сервера
        },
        notify: false // уведомления
    })
})

// отслеживание на изменение
gulp.task('watch', function() { 
    gulp.watch('app/sass/**/*.scss', gulp.parallel('sass')); // слежение за изменениями в файлах и какие при этом таски надо выполнять
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('sass','js','browser-sync', 'watch')) // параллельный запуск тасков