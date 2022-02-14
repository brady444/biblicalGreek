"use strict";

const gulp = require ("gulp");
const styleLint = require ("gulp-stylelint");
const esLint = require ("gulp-eslint-new");
const htmlMinify = require ("gulp-htmlmin");
const cleanCss = require ("gulp-clean-css");
const uglify = require ("gulp-uglify");
const concat = require ("gulp-concat");
const replace = require ("gulp-replace");
const browserSync = require ("browser-sync").create ();

//todo linthtml?

const lintcss = () =>
	gulp.src ("src/*.css")
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
	gulp.src ("src/*.js")
		.pipe (esLint ({
			configFile: ".eslintrc.json"
		}))
		.pipe (esLint.format ())
		.pipe (esLint.failAfterError ());

const minifyhtml = () =>
	gulp.src ("src/*.html")
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
	gulp.src ("src/*.css")
		.pipe (cleanCss ({
			level: 2
		}))
		.pipe (gulp.dest ("docs"));

const minifyjs = () =>
	gulp.src (["src/imports.js", "src/constants.js", "src/utilities.js", "src/components.js", "src/pages.js", "src/main.js"])
		.pipe (uglify ())
		.pipe (concat ("main.min.js"))
		.pipe (replace (/[\t\n]/gi, ""))
		.pipe (gulp.dest ("docs"));

const watch = callback => {
	browserSync.init ({
		server: "docs/",
		port: 81,
		ui: false,
		open: false,
		notify: false,
		ghostMode: false,
		online: false
	});
	
	gulp.watch ("src", callback => {
		gulp.series (minifyhtml, minifycss, minifyjs, () => browserSync.reload ()) ();
		
		callback ();
	});
	
	callback ();
};

module.exports = {
	lintcss: lintcss,
	lintjs: lintjs,
	minifyhtml: minifyhtml,
	minifycss: minifycss,
	minifyjs: minifyjs,
	watch: watch,
	
	default: gulp.series (lintcss, lintjs, minifyhtml, minifycss, minifyjs)
};