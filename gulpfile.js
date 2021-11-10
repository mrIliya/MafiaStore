const { src, dest, watch, parallel } = require('gulp')
const scss = require('gulp-sass')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

function browsersync() {
	browserSync.init({
		server: {
			baseDir: "app/"
		}
	})
}

function styles() {
	return src([
		'app/scss/**.scss',
		'node_modules/normalize.css/normalize.css'
	])
		.pipe(scss())
		.pipe(autoprefixer({
			overrirdeBrowserlist: ['last 10 version'],
			grid: true
		}))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function stylesMin() {
	return src('app/scss/*.scss')
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(autoprefixer({
			overrirdeBrowserlist: ['last 10 version'],
			grid: true
		}))
		.pipe(concat('style.min.css'))
		.pipe(dest('app/mincss'))
}

function scripts() {
	return src('app/script/*.js')
		.pipe(browserSync.stream())
}

function scriptsMin() {
	return src('app/script/*.js')
		.pipe(uglify())
		.pipe(concat('script.min.js'))
		.pipe(dest('app/minscript'))
}

function imageMin() {
	return src('app/images/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('dist/images'))
}

function build() {
	return src([
		'app/*html',
		'app/css/style.css',
		'app/script/*js',
		'app/fonts/**/*',
		'app/images/**/*'
	], { base: 'app' })
		.pipe(dest('dist'))
}

function watching() {
	watch(['app/scss/**/*.scss'], styles)
	watch(['app/script/**/*.js'], scripts)
	watch(['app/*.html']).on('change', browserSync.reload)
}

exports.styles = styles
exports.stylesMin = stylesMin     /* not included in dist folder */
exports.scripts = scripts
exports.scriptsMin = scriptsMin   /* not included in dist folder */
exports.imageMin = imageMin       /* not included in dist folder */
exports.watching = watching
exports.browsersync = browsersync
exports.build = build

exports.default = parallel(styles, watching, browsersync, scripts)