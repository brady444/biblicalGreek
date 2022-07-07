import gulp from "gulp";
import styleLint from "gulp-stylelint";
import esLint from "gulp-eslint-new";
import htmlMinify from "gulp-htmlmin";
import cleanCss from "gulp-clean-css";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import replace from "gulp-replace";
import _browserSync from "browser-sync";

const browserSync = _browserSync.create ();

//todo linthtml?

const lintcss = () =>
	gulp.src ("src/**/*.css")
		.pipe (styleLint ({
			reporters: [
				{
					formatter: "string",
					console: true
				}
			],
			
			config: {
				rules: {
					//todo
				}
			}
		}));

const lintjs = () =>
	gulp.src ("src/**/*.js")
		.pipe (esLint ({
			configFile: ".eslintrc.json"
		}))
		.pipe (esLint.format ())
		.pipe (esLint.failAfterError ());

const minifyhtml = () =>
	gulp.src ("src/**/*.html")
		.pipe (htmlMinify ({
			caseSensitive: true,
			collapseBooleanAttributes: true,
			collapseInlineTagWhitespace: true,
			collapseWhitespace: true,
			decodeEntities: true,
			minifyCSS: true,
			minifyJS: true,
			minifyURLs: true,
			quoteCharacter: "\"",
			removeAttributeQuotes: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeOptionalTags: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			sortAttributes: true,
			sortClassName: true,
			useShortDoctype: true
		}))
		.pipe (gulp.dest ("docs"));

const minifycss = () =>
	gulp.src ("src/**/*.css")
		.pipe (cleanCss ({
			level: 2
		}))
		.pipe (gulp.dest ("docs"));

const minifyjs = () =>
	gulp.src (["src/imports.js", "src/constants.js", "src/utilities.js", "src/components.js", "src/pages.js", "src/pages/*.js", "src/main.js"])
		.pipe (uglify ())
		.pipe (concat ("main.min.js"))
		.pipe (replace (/[\t\n]/gi, ""))
		.pipe (gulp.dest ("docs"));

gulp.task ("default", gulp.series (lintcss, lintjs, minifyhtml, minifycss, minifyjs));

gulp.task ("watch", callback => {
	browserSync.init ({
		server: "docs",
		port: 81,
		ui: false,
		open: false,
		notify: false,
		ghostMode: false,
		online: false
	});
	
	const series = gulp.series (minifyhtml, minifycss, minifyjs, () => browserSync.reload ());
	
	gulp.watch ("src", callback => {
		series ();
		
		callback ();
	});
	
	series ();
	
	callback ();
});