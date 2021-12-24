"use strict";

import { render, html } from "https://unpkg.com/uhtml?module";

import constants from "./constants.js";
import utilities from "./utilities.js";

import {
	Header
} from "./components.js";

window.pages = {
	main: (await import ("./pages/main.js")).default,
	resourcesParadigms: (await import ("./pages/resourcesParadigms.js")).default,
	practiceParsing: (await import ("./pages/practiceParsing.js")).default,
	practiceParadigms: (await import ("./pages/practiceParadigms.js")).default
};

window.currentPage = "main";
window.pageData = {};

window.navigate = (page, data) => {
	currentPage = page;
	
	//reset page data
	pageData = {};
	
	if (pages [currentPage].setup !== undefined) {
		pages [currentPage].setup (data);
	}
	
	update ();
	
	history.pushState (null, null);
};

window.update = () => {
	render (document.body, html
		`
		${ Header () }
		
		${ pages [currentPage].content () }
		`
	);
};

window.addEventListener ("popstate", () => {
	navigate ("main");
});

update ();