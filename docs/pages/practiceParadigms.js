"use strict";

import { render, html } from "https://unpkg.com/uhtml?module";

import utilities from "../utilities.js";

import {
	Paradigm,
	Question
} from "../components.js";

export default {
	setup: data => {
		pageData.elements = data.elements;
		pageData.currentElements = JSON.parse (JSON.stringify (data.elements));
		pageData.remainingElements = [...pageData.currentElements];
		
		pageData.questionElementIndex = utilities.randomInteger (0, pageData.remainingElements.length - 1);
	},
	
	content: () => html
		`<div class = "container flexColumnCenter">
			${ Paradigm (pageData.currentElements) }
			
			${ Question (pageData.remainingElements [pageData.questionElementIndex], true) }
		</div>`
};