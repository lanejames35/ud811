const { watch, series } = require('gulp');
const browserSync = require('browser-sync');
const server = browserSync.create();

function startServer(){
    server.init({
        notify: false,
        ui: false,
        port: 9000,
        server: {
            baseDir: './1-12-skeleton'
        }
    });
    watch(['./**/*.html',
           './**/**/*.js',
           './**/**/.css',]).on('change', server.reload);

};

let serve = series(startServer);
exports.serve = serve;