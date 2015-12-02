var gulp = require("gulp");
var babel = require("gulp-babel");
var runSequence = require('run-sequence');
var fs = require('fs');
var del = require('del');

var thisPackage = require( './package.json' );
thisPackage.devDependencies = null;

const dest = 'build/';

const babelOptions = {
    optional: [
        "spec.protoToAssign",
        "es7.classProperties",
        "es7.functionBind",
        "es7.decorators",
        "es7.exportExtensions"
    ]
};

gulp.task( 'clean', function (cb) {
    del(['./build/*'], cb);
});

gulp.task( 'build-js', function() {
    gulp.src("src/**/*.{js,jsx}")
        .pipe( babel( babelOptions ) )
        .pipe( gulp.dest( dest ) );
});

gulp.task( 'copy-md', function() {
    gulp.src( '*.md')
        .pipe(gulp.dest( dest ) );
});


gulp.task( 'copy-package-json', function( cb ) {
    // TODO: create folder build/npm when it doesn't exist
    fs.writeFile( dest + '/package.json', JSON.stringify( thisPackage ), cb );
});


gulp.task('default', function(cb){
    runSequence(
        [ 'build-js', 'copy-md', 'copy-package-json' ],
        'watch',
        cb
    );
});


gulp.task('build', function(cb){
    runSequence(
        [ 'clean', 'build-js', 'copy-md', 'copy-package-json' ],
        cb
    );
});
