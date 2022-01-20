/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

const pages = {
	main: {
		content: () => html
			`<div id = "sections" class = "pageContainer flexColumnTop">
				${ SectionGroup ([
					Section ("Bill Mounce", [
						SectionLink ("BillMounce.com", null, "https://billmounce.com"),
						
						SectionLink ("Dictionary", null, "https://www.billmounce.com/greek-dictionary"),
						
						SectionLink ("Workbook Answer Key", null, "http://doxa.billmounce.com.s3.amazonaws.com/bbg4_answer_key.pdf")
					]),
					
					Section ("New Testament", [
						SectionLink ("Reader", null, "https://www.gntreader.com"),
						
						SectionLink ("Interlinear", null, "https://www.abarim-publications.com/Interlinear-New-Testament")
					])
				]) }
				
				${ SectionGroup ([
					Section ("Vocabulary", [
						SectionLink ("Dictionary", () => navigate ("dictionary")),
						
						SectionLink ("Practice", null, "https://quizlet.com/brady2384765/folders/biblical-greek-vocabulary")
					]),
					
					Section ("Paradigms", [
						SectionLink ("View", () => navigate ("viewParadigms")),
						
						...Object.values (constants.paradigms).map (paradigm => SectionLink (paradigm.name, () => {
							navigate ("practiceParadigms", {
								paradigmName: paradigm.name
							});
						}))
					]),
					
					Section ("Parsing", [
						SectionLink ("Parser", () => navigate ("parser")),
						
						SectionLink ("Practice", () => navigate ("practiceParsing", { forms: constants.parsingForms }))
					])
				]) }
				
				${ SectionGroup ([
					Section ("Other", [
						SectionLink ("Windows Typing Guide", null, "https://www.ctsfw.edu/wp-content/uploads/2016/02/Greek-Unicode-Keyboard-Input-Windows-10.pdf"),
						
						SectionLink ("About", () => navigate ("about"))
					])
				]) }
			</div>`
	},
	
	dictionary: {
		content: () => html
			`<div class = "pageContainer flexColumnTop largeGap mediumPadding">
				${ constants.vocabulary.map (word => Word (word)) }
			</div>`
	},
	
	viewParadigms: {
		content: () => html
			`<div class = "pageContainer flexColumnTop mediumGap mediumPadding">
				${ Object.values (constants.paradigms).map (paradigm => html
					`<p class = "largeFont">${ paradigm.name }</p> ${ Paradigm (paradigm.elements.map (element => ParadigmElementStatic (element))) }`
				) }
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
			`<div class = "pageContainer flexColumn mediumGap mediumPadding">
				<p class = "largeFont">${ pageData.paradigmName }</p>
				
				${ Paradigm (pageData.currentElements.map (element => ParadigmElement (element))) }
				
				${ Question (pageData.currentElement.text, pageData.currentElement.underlined) }
			</div>`
	},
	
	parser: {
		setup: () => {
			pageData.words = [];
		},
		
		content: () => html
			`<div class = "pageContainer flexColumnTop mediumGap mediumPadding">
				<input id = "parserInput" class = "mediumFont" placeholder = "Enter Greek..." oninput = ${ event => {
					pageData.words = [];
					
					const words = event.target.value.split (" ");
					
					for (let i = 0; i < words.length; i++) {
						for (let j = 0; j < constants.vocabulary.length; j++) {
							if (constants.vocabulary [j].forms.length === 0 && utilities.simplifyWord (constants.vocabulary [j].lexicalForm).toLowerCase () === utilities.simplifyWord (words [i]).toLowerCase ()) {
								pageData.words.push ({
									word: constants.vocabulary [j]
								});
							}
							
							else {
								for (let k = 0; k < constants.vocabulary [j].forms.length; k++) {
									if (utilities.simplifyWord (constants.vocabulary [j].forms [k].text).toLowerCase () === utilities.simplifyWord (words [i]).toLowerCase ()) {
										pageData.words.push ({
											word: constants.vocabulary [j],
											form: constants.vocabulary [j].forms [k]
										});
									}
								}
							}
						}
					}
					
					update ();
				} } />
				
				<div id = "parserWords" class = "flex mediumGap">
					${ pageData.words.map (word => Word (word.word, word.form === undefined ? undefined : [word.form])) }
				</div>
			</div>`
	},
	
	practiceParsing: {
		setup: () => {
			const vocabulary = JSON.parse (JSON.stringify (constants.vocabulary));
			
			pageData.remainingWords = [];
			
			//only add words with forms
			for (let i = 0; i < vocabulary.length; i++) {
				if (vocabulary [i].forms.length > 0) {
					pageData.remainingWords.push (vocabulary [i]);
				}
			}
			
			pageData.squares = {
				nominativesingularmasculine: {},
				nominativesingularfeminine: {},
				nominativesingularneuter: {},
				genitivesingularmasculine: {},
				genitivesingularfeminine: {},
				genitivesingularneuter: {},
				dativesingularmasculine: {},
				dativesingularfeminine: {},
				dativesingularneuter: {},
				accusativesingularmasculine: {},
				accusativesingularfeminine: {},
				accusativesingularneuter: {},
				nominativepluralmasculine: {},
				nominativepluralfeminine: {},
				nominativepluralneuter: {},
				genitivepluralmasculine: {},
				genitivepluralfeminine: {},
				genitivepluralneuter: {},
				dativepluralmasculine: {},
				dativepluralfeminine: {},
				dativepluralneuter: {},
				accusativepluralmasculine: {},
				accusativepluralfeminine: {},
				accusativepluralneuter: {}
			};
			
			pageData.getNewWord = () => {
				pageData.currentWord = utilities.randomElement (pageData.remainingWords);
				
				for (let j = 0; j < pageData.currentWord.forms.length; j++) {
					for (let k = 0; k < pageData.currentWord.forms [j].forms.length; k++) {
						pageData.squares [pageData.currentWord.forms [j].forms [k].case + pageData.currentWord.forms [j].forms [k].number + pageData.currentWord.forms [j].forms [k].gender].text = pageData.currentWord.forms [j].text;
					}
				}
				
				pageData.getNewForm ();
			};
			
			pageData.getNewForm = () => {
				pageData.currentForm = utilities.randomElement (pageData.currentWord.forms);
				
				pageData.remainingMatches = pageData.currentForm.forms.length;
			};
			
			pageData.getNewWord ();
		},
		
		content: () => html
			`<div class = "pageContainer flexColumn mediumGap mediumPadding">
				<p class = "largeFont">${ pageData.currentWord.lexicalForm }</p>
				
				${ Paradigm (Object.values (pageData.squares).map (square => ParadigmForm (square))) }
				
				${ Question (pageData.currentForm.text) }
			</div>`
	},
	
	about: {
		content: () => html
			`<div class = "pageContainer flexColumn mediumGap mediumPadding">
				<p class = "smallFont">Some data is taken from BillMounce.com, Basics of Biblical Greek, and GNTReader.com. Some data is modified. Data may not be accurate.</p>
			</div>`
	}
};