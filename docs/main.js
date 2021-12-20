"use strict";

import { render, html } from "https://unpkg.com/uhtml?module";

import constants from "./constants.js";
import utilities from "./utilities.js";

const Header = () => html
	`<div id = "header" class = "flexRowCenter mediumFont">
		<a class = "smallPadding" onclick = ${ () => {
			navigate ("");
		} }>Biblical Greek</a>
	</div>`
;

const SectionGroup = (name, content) => html
	`<div class = "sectionGroup flexColumnCenter largePadding">
		<p class = "largeFont">${ name }</p>
		
		<div class = "flexRowCenterStart largeGap">${ content }</div>
	</div>`
;

const Section = (name, content) => html
	`<div class = "mediumGap flexColumnCenter">
		${ SectionHeader (name) }
		
		${ content }
	</div>`
;

const SectionHeader = text => html`<p class = "mediumFont">${ text }</p>`;

const SectionLink = (text, onclick, href) => html`<a class = "sectionLink smallFont" onclick = ${ onclick } href = ${ href }>${ text }</a>`;

const Paradigm = elements => html
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

const ParadigmRow = (labelText, row) => html
	`<div class = "paradigmRow flexRowCenter">
		${ ParadigmLabel (labelText) }
		
		${ row.map (element => ParadigmElement (element)) }
	</div>`
;

const ParadigmLabel = text => html
	`<p class = "paradigmLabel flexRowCenter">${ text }</p>`
;

const ParadigmElement = element => html
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

const Question = element => html
	`<div class = "flexRowCenter">
		<p class = "largePadding extraLargeFont">Where does <span id = "questionElement" class = ${ element.underlined ? "underlined" : null }>${ element.text }</span> go?</p>
	</div>`
;

const navigate = (page, data) => {
	currentPage = page;
	
	//reset page data
	pageData = {};
	
	if (pages [currentPage].setup !== undefined) {
		pages [currentPage].setup (data);
	}
	
	update ();
	
	history.pushState (null, null);
};

let currentPage = "";
let pageData = {};

const pages = {
	"": {
		content: () => html
		`<div id = "sections" class = "container flexColumnStartCenter">
			${ SectionGroup ("Resources", [
				Section ("Bill Mounce", [
					SectionLink ("BillMounce.com", null, "https://billmounce.com"),
					
					SectionLink ("Greek Dictionary", null, "https://www.billmounce.com/greek-dictionary"),
					
					SectionLink ("Workbook Answer Key", null, "http://doxa.billmounce.com.s3.amazonaws.com/bbg4_answer_key.pdf")
				]),
				
				Section ("Greek New Testament", [
					SectionLink ("GNTReader", null, "https://www.gntreader.com"),
					
					SectionLink ("Abarim Publications", null, "https://www.abarim-publications.com/Interlinear-New-Testament")
				]),
				
				Section ("Vocabulary", [
					SectionLink ("Spreadsheet", null, "https://docs.google.com/spreadsheets/d/1phUbF1zjwF5YpiVExSZ7FZeG_XsgfkLgpF7ROgaLPCo")
				]),
				
				Section ("Paradigms", [
					SectionLink ("Images", () => navigate ("resourcesParadigms"))
				]),
				
				Section ("Other", [
					SectionLink ("Windows 10 Typing Guide", null, "https://www.ctsfw.edu/wp-content/uploads/2016/02/Greek-Unicode-Keyboard-Input-Windows-10.pdf")
				])
			]) }
			
			${ SectionGroup ("Practice", [
				Section ("Quizlet", [
					SectionLink ("Vocabulary", null, "https://quizlet.com/brady2384765/folders/biblical-greek-vocabulary"),
					
					SectionLink ("Parsing", null, "https://quizlet.com/brady2384765/folders/biblical-greek-parsing")
				]),
				
				Section ("Paradigms", constants.paradigms.map (paradigm => SectionLink (paradigm.name, () => {
					navigate ("practiceParadigms", {
						elements: paradigm.elements
					});
				})))
			]) }
		</div>`
	},
	
	resourcesParadigms: {
		content: () => html
			`<div class = "container flexColumnStartCenter largePadding mediumGap">
				${ constants.paradigms.map (paradigm => html`<img class = "paradigmImage" src = ${ paradigm.imageSrc } />`) }
			</div>`
	},
	
	practiceParadigms: {
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
	}
};

const update = () => {
	render (document.body, html
		`
		${ Header () }
		
		${ pages [currentPage].content () }
		`
	);
};

update ();

window.addEventListener ("popstate", () => {
	navigate ("");
});