"use strict";

import { render, html } from "https://unpkg.com/uhtml?module";

import utilities from "./utilities.js";

export const Header = () => html
	`<div id = "header" class = "flexRowCenter mediumFont">
		<a class = "smallPadding" onclick = ${ () => {
			navigate ("main");
		} }>Biblical Greek</a>
	</div>`
;

export const SectionGroup = (name, content) => html
	`<div class = "sectionGroup flexColumnCenter largePadding">
		<p class = "largeFont">${ name }</p>
		
		<div class = "flexRowCenterStart largeGap">${ content }</div>
	</div>`
;

export const Section = (name, content) => html
	`<div class = "mediumGap flexColumnCenter">
		<p class = "mediumFont">${ name }</p>
		
		${ content }
	</div>`
;

export const SectionLink = (text, onclick, href) => html`<a class = "sectionLink smallFont" onclick = ${ onclick } href = ${ href }>${ text }</a>`;

export const Paradigm = elements => html
	`<div class = "paradigm flexColumnCenter mediumPadding mediumGap">
		<div class = "paradigmRow flexRowCenter mediumGap">
			${ ParadigmLabel () }
			${ ParadigmLabel ("Masculine (2nd)") }
			${ ParadigmLabel ("Feminine (1st)") }
			${ ParadigmLabel ("Neuter (2nd)") }
		</div>
		
		${ [
			ParadigmRow ("Nominative Singular", [elements [0], elements [1], elements [2]]),
			ParadigmRow ("Genitive Singular", [elements [3], elements [4], elements [5]]),
			ParadigmRow ("Dative Singular", [elements [6], elements [7], elements [8]]),
			ParadigmRow ("Accusative Singular", [elements [9], elements [10], elements [11]]),
			ParadigmRow ("Nominative Plural", [elements [12], elements [13], elements [14]]),
			ParadigmRow ("Genitive Plural", [elements [15], elements [16], elements [17]]),
			ParadigmRow ("Dative Plural", [elements [18], elements [19], elements [20]]),
			ParadigmRow ("Accusative Plural", [elements [21], elements [22], elements [23]])
		] }
	</div>`
;

export const ParadigmRow = (labelText, row) => html
	`<div class = "paradigmRow flexRowCenter">
		${ ParadigmLabel (labelText) }
		
		${ row.map (element => ParadigmElement (element)) }
	</div>`
;

export const ParadigmLabel = text => html
	`<p class = "paradigmLabel flexRowCenter">${ text }</p>`
;

export const ParadigmElement = element => html
	`<div class = "paradigmElement flexRowCenter">
		<p class = ${ "flexRowCenter" + (element.answered ? (element.underlined ? " answered underlined" : " answered") : (element.incorrect ? " incorrect" : "")) } onclick = ${ () => {
			if (element.answered) {
				return;
			}
			
			if (pageData.remainingElements [pageData.questionElementIndex].text === element.text) {
				element.answered = true;
				
				for (let i = 0; i < pageData.currentElements.length; i++) {
					pageData.currentElements [i].incorrect = false;
				}
				
				pageData.remainingElements.splice (pageData.questionElementIndex, 1);
				
				if (pageData.remainingElements.length < 1) {
					pages [currentPage].setup ({
						elements: pageData.elements
					});
				}
				
				else {
					pageData.questionElementIndex = utilities.randomInteger (0, pageData.remainingElements.length - 1);
				}
			}
			
			else {
				element.incorrect = true;
			}
			
			update ();
		} }>${ element.answered ? element.text : null }</p>
	</div>`
;

export const Question = element => html
	`<div class = "flexRowCenter">
		<p class = "largePadding extraLargeFont">Where does <span id = "questionElement" class = ${ element.underlined ? "underlined" : null }>${ element.text }</span> go?</p>
	</div>`
;