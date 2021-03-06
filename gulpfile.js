var gulp = require('gulp');
var gulputil = require('gulp-util');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var prompt = require('gulp-prompt');
var imagemin = require('gulp-imagemin');

var autoprefix = require('autoprefixer');
var browsersync = require('browser-sync').create();
var fs = require('fs-extra');


/* SETTINGS START - DO NOT CHANGE - IF YOU HAVE TO CHANGE THESE DO IT IN THE SETTINGS.JSON AND FTP.JSON */
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var version = pkg.version;

try{
    var settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
    
    var design = settings.design;
    var assets = design + '/' + settings.assets + '/';
    var master = design + '/' + settings.master;
}
catch(error){
    gulputil.log('settings.json is missing');   
}

/* SETTINGS END - DO NOT CHANGE - IF YOU HAVE TO CHANGE THESE DO IT IN THE SETTINGS.JSON AND FTP.JSON */

/* FILE MASKS START */
var watchSync = [
    design + '/**/*.html',
    design + '/**/*.cshtml',
    design + '/**/*.xslt',
    design + '/**/*.min.css',
    design + '/**/*.min.js'
];

var watchSass = [
    design + '/**/scss/**/*.scss',
];

var watchTs = [
    design + '/**/ts/**/*.ts'
];

var library = {
	css: [
        'code/content/materialize/css/materialize.css'
    ],
    js: [
        'code/Scripts/jquery-2.2.0.js',
        'code/Scripts/knockout-3.4.0.js',
        'code/Scripts/materialize/materialize.js'
    ]
};

var imgTypes = [
    design + '/assets/img/*.png',
    design + '/assets/img/*.jpg',
    design + '/assets/img/*.svg',
    design + '/assets/img/*.gif'
];
/* FILE MASKS END */

gulp.task('default', ['browsersync', 'watchSync', 'watchSass', 'watchTs']);

gulp.task('library', ['libraryCss', 'libraryJs']);

gulp.task('browsersync', function(){
    browsersync.init({
        server: {
            baseDir: "C:/Users/nicolai/GIT/github/code/code"
        }
    });
});

gulp.task('watchSync', function(){
    gulp.watch(watchSync).on('change', function(file) {
        return gulp.src(file.path, {base: design + '/', buffer: false})
            .pipe(browsersync.stream())
    });
});

gulp.task('watchSass', function(){
    gulp.watch(watchSass, ['sass']);
});

gulp.task('watchTs', function(){
    gulp.watch(watchTs, ['ts']);
});

gulp.task('sass', function(){
    return gulp.src(assets + 'scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.css'))
        .pipe(sass())
        .pipe(cssnano())
        .pipe(sourcemaps.write('map/'))
        .pipe(gulp.dest(assets + 'min/'))
});

gulp.task('ts', function(){
    return gulp.src(assets + 'ts/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({sortOutput:true}))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('map/'))
        .pipe(gulp.dest(assets + 'min/'))
});

gulp.task('libraryJs', function(){
    return gulp.src(library.js)
        .pipe(sourcemaps.init())
        .pipe(concat('library.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('map/'))
        .pipe(gulp.dest(assets + 'min/'))
});

gulp.task('libraryCss', function(){
    return gulp.src(library.css)
        .pipe(sourcemaps.init())
        .pipe(concat('library.min.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('map/'))
        .pipe(gulp.dest(assets + 'min/'))
});

gulp.task('imagemin', function(){
    return gulp.src(imgTypes)
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest(design + '/assets/img/'))
});

gulp.task('setup', function(){
    return gulp.src('')
        .pipe(prompt.prompt([{
            type: 'input',
            name: 'design',
            message: 'Please enter the path to your design folder (example: Templates/Designs/Website)'
        },
        {
            type: 'input',
            name: 'assets',
            message: 'Please enter your assets folder name (example: assets)'
        },
        {
            type: 'input',
            name: 'master',
            message: 'Please enter your master file name with extension (example: master.cshtml)'
        }], function(res){
                var jsonRes = JSON.stringify(res);
                fs.writeFile('settings.json', jsonRes, function(err){
            });
        }))
});