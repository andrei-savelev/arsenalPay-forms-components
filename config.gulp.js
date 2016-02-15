module.exports = {
    browserSyncConfig: {
        server: {
            baseDir: "./dist"
        },
        tunnel: true,
        host: 'localhost',
        port: 9300,
        logPrefix: "Frontend_Build"
    },

    build: {
        js: './dist/assets/js/',
        css: './dist/assets/css/',
        html: './dist/'
    },

    src: {
        js: 'src/js/app.jsx',
        style: 'src/styles/**/*.scss',
        html: 'src/*.jade'
    },

    watch: {
        js: 'src/js/**/*.jsx',
        style: 'src/styles/**/*.scss',
        html: 'src/*.jade'
    },

    clean: './dist/'
};