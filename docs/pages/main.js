"use strict";

import { render, html } from "https://unpkg.com/uhtml?module";

import constants from "../constants.js";

import {
	SectionGroup,
	Section,
	SectionLink
} from "../components.js";

export default {
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
			
			Section ("Parsing", [
				SectionLink ("Nouns", () => {
					navigate ("practiceParsing", {
						parsingForms: constants.parsingForms.nouns
					});
				})
			]),
			
			Section ("Paradigms", constants.paradigms.map (paradigm => SectionLink (paradigm.name, () => {
				navigate ("practiceParadigms", {
					elements: paradigm.elements
				});
			})))
		]) }
	</div>`
};