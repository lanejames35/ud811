const { watch, series } = require('gulp');
const browserSync = require('browser-sync');
const server = browserSync.create();
const { generateSW } = require('workbox-build');

function makeSW(){
    
}

function startServer(){
    server.init({
        notify: false,
        ui: false,
        port: 9000,
        server: {
            baseDir: './1-12-skeleton',
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    });
    watch(['./**/*.html',
           './**/**/*.js',
           './**/**/.css',]).on('change', server.reload);

};

let serve = series(startServer);
exports.serve = serve;