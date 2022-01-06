/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

const pages = {
	main: {
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
				
				Section ("Parsing", []),
				
				Section ("Paradigms", [
					SectionLink ("Paradigms", () => navigate ("resourcesParadigms"))
				]),
				
				Section ("Other", [
					SectionLink ("Windows 10 Typing Guide", null, "https://www.ctsfw.edu/wp-content/uploads/2016/02/Greek-Unicode-Keyboard-Input-Windows-10.pdf")
				])
			]) }
			
			${ SectionGroup ("Practice", [
				Section ("Vocabulary", [
					SectionLink ("Quizlet", null, "https://quizlet.com/brady2384765/folders/biblical-greek-vocabulary")
				]),
				
				Section ("Paradigms", Object.values (constants.paradigms).map (paradigm => SectionLink (paradigm.name, () => {
					navigate ("practiceParadigms", {
						paradigmName: paradigm.name
					});
				}))),
				
				Section ("Parsing", [
					SectionLink ("Paradigm", () => {
						navigate ("practiceParsing", {
							forms: constants.parsingForms
						});
					})
				])
			]) }
		</div>`
	},
	
	resourcesParadigms: {
		content: () => html
			`<div class = "container flexColumnStartCenter mediumGap smallPadding">
				${ Object.values (constants.paradigms).map (paradigm => html`<p class = "largeFont">${ paradigm.name }</p> ${ Paradigm (paradigm.elements.map (element => ParadigmElementStatic (element))) }`) }
			</div>`
	},
	
	practiceParsing: {
		setup: () => {
			pageData.remainingWords = JSON.parse (JSON.stringify (constants.vocabulary));
			
			pageData.currentWord = utilities.randomElement (pageData.remainingWords);
			
			pageData.currentForm = utilities.randomElement (pageData.currentWord.forms);
			
			pageData.currentForm.remainingMatches = pageData.currentForm.cases.length * pageData.currentForm.numbers.length * pageData.currentForm.genders.length;
			
			pageData.squares = [
				{
					form: {
						case: "nominative",
						number: "singular",
						gender: "masculine"
					}
				},
				
				{
					form: {
						case: "nominative",
						number: "singular",
						gender: "feminine"
					}
				},
				
				{
					form: {
						case: "nominative",
						number: "singular",
						gender: "neuter"
					}
				},
				
				{
					form: {
						case: "genitive",
						number: "singular",
						gender: "masculine"
					}
				},
				
				{
					form: {
						case: "genitive",
						number: "singular",
						gender: "feminine"
					}
				},
				
				{
					form: {
						case: "genitive",
						number: "singular",
						gender: "neuter"
					}
				},
				
				{
					form: {
						case: "dative",
						number: "singular",
						gender: "masculine"
					}
				},
				
				{
					form: {
						case: "dative",
						number: "singular",
						gender: "feminine"
					}
				},
				
				{
					form: {
						case: "dative",
						number: "singular",
						gender: "neuter"
					}
				},
				
				{
					form: {
						case: "accusative",
						number: "singular",
						gender: "masculine"
					}
				},
				
				{
					form: {
						case: "accusative",
						number: "singular",
						gender: "feminine"
					}
				},
				
				{
					form: {
						case: "accusative",
						number: "singular",
						gender: "neuter"
					}
				},
				
				{
					form: {
						case: "nominative",
						number: "plural",
						gender: "masculine"
					}
				},
				
				{
					form: {
						case: "nominative",
						number: "plural",
						gender: "feminine"
					}
				},
				
				{
					form: {
						case: "nominative",
						number: "plural",
						gender: "neuter"
					}
				},
				
				{
					form: {
						case: "genitive",
						number: "plural",
						gender: "masculine"
					}
				},
				
				{
					form: {
						case: "genitive",
						number: "plural",
						gender: "feminine"
					}
				},
				
				{
					form: {
						case: "genitive",
						number: "plural",
						gender: "neuter"
					}
				},
				
				{
					form: {
						case: "dative",
						number: "plural",
						gender: "masculine"
					}
				},
				
				{
					form: {
						case: "dative",
						number: "plural",
						gender: "feminine"
					}
				},
				
				{
					form: {
						case: "dative",
						number: "plural",
						gender: "neuter"
					}
				},
				
				{
					form: {
						case: "accusative",
						number: "plural",
						gender: "masculine"
					}
				},
				
				{
					form: {
						case: "accusative",
						number: "plural",
						gender: "feminine"
					}
				},
				
				{
					form: {
						case: "accusative",
						number: "plural",
						gender: "neuter"
					}
				}
			];
		},
		
		content: () => html
			`<div class = "container flexColumnCenter smallPadding">
				<p class = "mediumPadding largeFont">${ pageData.currentWord.lexicalForm }</p>
				
				${ Paradigm (pageData.squares.map (square => ParadigmForm (square))) }
				
				${ Question (pageData.currentForm.text) }
			</div>`
	},
	
	practiceParadigms: {
		setup: data => {
			pageData.paradigmName = data.paradigmName;
			
			pageData.currentElements = JSON.parse (JSON.stringify (constants.paradigms [data.paradigmName].elements));
			
			pageData.remainingElements = [...pageData.currentElements];
			
			pageData.currentElement = utilities.randomElement (pageData.remainingElements);
		},
		
		content: () => html
			`<div class = "container flexColumnCenter smallPadding">
				<p class = "mediumPadding largeFont">${ pageData.paradigmName }</p>
			
				${ Paradigm (pageData.currentElements.map (element => ParadigmElement (element))) }
				
				${ Question (pageData.currentElement.text, pageData.currentElement.underlined) }
			</div>`
	}
};