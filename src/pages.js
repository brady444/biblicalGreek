/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

const pages = {
	main: {
		content: () => html
			`<div id = "sections" class = "pageContainer flexColumnTop fullWidth">
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
						SectionLink ("View", () => navigate ("viewParadigms", {
							paradigmName: Object.keys (constants.paradigms) [0]
						})),
						
						SectionLink ("Practice", () => navigate ("practiceParadigms", {
							paradigmName: Object.keys (constants.paradigms) [0]
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
		setup: () => {
			pageData.words = constants.vocabulary;
		},
		
		content: () => html
			`<div id = "dictionary" class = "pageContainer flexColumnTop fullWidth mediumGap mediumPadding">
				<input class = "mediumFont" placeholder = "Search..." oninput = ${ event => {
					pageData.words = constants.vocabulary.filter (word => utilities.simplifyGreek (word.lexicalForm).includes (utilities.simplifyGreek (utilities.englishToGreek (event.target.value.trim ()))));
					
					update ();
				} } />
				
				<div class = "flexTop flexWrap fullWidth mediumGap">
					${ pageData.words.map (word => Word (word)) }
				</div>
			</div>`
	},
	
	viewParadigms: {
		setup: data => {
			pageData.paradigm = JSON.parse (JSON.stringify (constants.paradigms [data.paradigmName]));
			
			for (let i = 0; i < pageData.paradigm.rows.length; i++) {
				for (let j = 0; j < pageData.paradigm.rows [i].elements.length; j++) {
					pageData.paradigm.rows [i].elements [j].answered = true;
				}
			}
		},
		
		content: () => html
			`<div class = "pageContainer flexColumnTop fullWidth mediumGap mediumPadding">
				<select class = "mediumFont" onchange = ${ event => {
					pages [currentPage].setup ({
						paradigmName: event.target.value
					});
					
					update ();
				} }>
					${ Object.keys (constants.paradigms).map (paradigm => html`<option class = "smallFont">${ paradigm }</option>`) }
				</select>
				
				${ Paradigm (pageData.paradigm.columnLabels, pageData.paradigm.rows) }
			</div>`
	},
	
	practiceParadigms: {
		setup: data => {
			pageData.paradigm = JSON.parse (JSON.stringify (constants.paradigms [data.paradigmName]));
			
			pageData.remainingElements = [];
			
			for (let i = 0; i < pageData.paradigm.rows.length; i++) {
				//todo remove, don't use empty elements in paradigms, replace loop with below concat
				// pageData.remainingElements = pageData.remainingElements.concat (pageData.paradigm.rows [i].elements);
				for (let j = 0; j < pageData.paradigm.rows [i].elements.length; j++) {
					if (pageData.paradigm.rows [i].elements [j].text !== undefined) {
						pageData.remainingElements.push (pageData.paradigm.rows [i].elements [j]);
					}
				}
			}
			
			pageData.currentElement = utilities.randomElement (pageData.remainingElements);
		},
		
		content: () => html
			`<div class = "pageContainer flexColumnTop fullWidth mediumGap mediumPadding">
				<select class = "mediumFont" onchange = ${ event => {
					pages [currentPage].setup ({
						paradigmName: event.target.value
					});
					
					update ();
				} }>
					${ Object.keys (constants.paradigms).map (paradigm => html`<option class = "smallFont">${ paradigm }</option>`) }
				</select>
				
				${ Paradigm (pageData.paradigm.columnLabels, pageData.paradigm.rows, element => {
					if (element.answered) {
						return;
					}
					
					//if answer is correct
					if (pageData.currentElement.text === element.text) {
						element.answered = true;
						
						//set incorrect to false for all elements
						for (let i = 0; i < pageData.remainingElements.length; i++) {
							pageData.remainingElements [i].incorrect = false;
						}
						
						pageData.remainingElements.splice (pageData.remainingElements.indexOf (element), 1);
						
						if (pageData.remainingElements.length < 1) {
							pages [currentPage].setup ({
								paradigmName: pageData.paradigm.name
							});
						}
						
						else {
							pageData.currentElement = utilities.randomElement (pageData.remainingElements);
						}
					}
					
					else {
						element.incorrect = true;
					}
					
					update ();
				}) }
				
				${ Question (pageData.currentElement.text, pageData.currentElement.underlined) }
			</div>`
	},
	
	parser: {
		setup: () => {
			pageData.words = [];
		},
		
		content: () => html
			`<div class = "pageContainer flexColumnTop fullWidth mediumGap mediumPadding">
				<input id = "parserInput" class = "mediumFont" placeholder = "Enter Greek..." oninput = ${ event => {
					pageData.words = [];
					
					const words = event.target.value.split (" ").map (word => utilities.simplifyGreek (utilities.englishToGreek (word)));
					
					for (let i = 0; i < words.length; i++) {
						for (let j = 0; j < constants.vocabulary.length; j++) {
							if (constants.vocabulary [j].forms.length === 0 && utilities.simplifyGreek (constants.vocabulary [j].lexicalForm) === utilities.simplifyGreek (words [i])) {
								pageData.words.push ({
									word: constants.vocabulary [j]
								});
							}
							
							else {
								const forms = [];
								
								for (let k = 0; k < constants.vocabulary [j].forms.length; k++) {
									if (utilities.simplifyGreek (constants.vocabulary [j].forms [k].text) === utilities.simplifyGreek (words [i])) {
										forms.push (constants.vocabulary [j].forms [k]);
									}
								}
								
								if (forms.length > 0) {
									pageData.words.push ({
										word: constants.vocabulary [j],
										forms: forms
									});
								}
							}
						}
					}
					
					update ();
				} } />
				
				<div id = "parserWords" class = "flexTop flexWrap fullWidth mediumGap">
					${ pageData.words.map (word => Word (word.word, word.forms)) }
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
			
			pageData.currentElements = {
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
			
			pageData.rows = [
				{
					label: "Nominative Singular",
					
					elements: [
						pageData.currentElements.nominativesingularmasculine,
						pageData.currentElements.nominativesingularfeminine,
						pageData.currentElements.nominativesingularneuter
					]
				},
				
				{
					label: "Genitive Singular",
					
					elements: [
						pageData.currentElements.genitivesingularmasculine,
						pageData.currentElements.genitivesingularfeminine,
						pageData.currentElements.genitivesingularneuter
					]
				},
				
				{
					label: "Dative Singular",
					
					elements: [
						pageData.currentElements.dativesingularmasculine,
						pageData.currentElements.dativesingularfeminine,
						pageData.currentElements.dativesingularneuter
					]
				},
				
				{
					label: "Accusative Singular",
					
					elements: [
						pageData.currentElements.accusativesingularmasculine,
						pageData.currentElements.accusativesingularfeminine,
						pageData.currentElements.accusativesingularneuter
					]
				},
				
				{
					label: "Nominative Plural",
					
					elements: [
						pageData.currentElements.nominativepluralmasculine,
						pageData.currentElements.nominativepluralfeminine,
						pageData.currentElements.nominativepluralneuter
					]
				},
				
				{
					label: "Genitive Plural",
					
					elements: [
						pageData.currentElements.genitivepluralmasculine,
						pageData.currentElements.genitivepluralfeminine,
						pageData.currentElements.genitivepluralneuter
					]
				},
				
				{
					label: "Dative Plural",
					
					elements: [
						pageData.currentElements.dativepluralmasculine,
						pageData.currentElements.dativepluralfeminine,
						pageData.currentElements.dativepluralneuter
					]
				},
				
				{
					label: "Accusative Plural",
					
					elements: [
						pageData.currentElements.accusativepluralmasculine,
						pageData.currentElements.accusativepluralfeminine,
						pageData.currentElements.accusativepluralneuter
					]
				}
			];
			
			pageData.getNewWord = () => {
				pageData.currentWord = utilities.randomElement (pageData.remainingWords);
				
				for (let j = 0; j < pageData.currentWord.forms.length; j++) {
					for (let k = 0; k < pageData.currentWord.forms [j].uses.length; k++) {
						pageData.currentElements [pageData.currentWord.forms [j].uses [k].case + pageData.currentWord.forms [j].uses [k].number + pageData.currentWord.forms [j].uses [k].gender].text = pageData.currentWord.forms [j].text;
					}
				}
				
				pageData.getNewForm ();
			};
			
			pageData.getNewForm = () => {
				pageData.currentForm = utilities.randomElement (pageData.currentWord.forms);
				
				pageData.remainingMatches = pageData.currentForm.uses.length;
			};
			
			pageData.getNewWord ();
		},
		
		content: () => html
			`<div class = "pageContainer flexColumn fullWidth mediumGap mediumPadding">
				<p class = "largeFont">${ pageData.currentWord.lexicalForm }</p>
				
				${ Paradigm ([
					"Masculine (2nd)",
					"Feminine (1st)",
					"Neuter (2nd)"
				], pageData.rows, element => {
					if (element.answered) {
						return;
					}
					
					//if the answer is correct
					if (pageData.currentForm.text === element.text) {
						pageData.remainingMatches -= 1;
						
						element.answered = true;
						
						//if we have answered all elements for this form
						if (pageData.remainingMatches < 1) {
							//set incorrect to false for all elements
							for (let i = 0; i < Object.values (pageData.currentElements).length; i++) {
								Object.values (pageData.currentElements) [i].incorrect = false;
							}
							
							pageData.currentWord.forms.splice (pageData.currentWord.forms.indexOf (pageData.currentForm), 1);
							
							if (pageData.currentWord.forms.length < 1) {
								pageData.remainingWords.splice (pageData.remainingWords.indexOf (pageData.currentWord), 1);
								
								if (pageData.remainingWords.length < 1) {
									pages [currentPage].setup ();
								}
								
								else {
									//set answered to false for all elements
									for (let i = 0; i < Object.values (pageData.currentElements).length; i++) {
										Object.values (pageData.currentElements) [i].answered = false;
									}
									
									pageData.getNewWord ();
								}
							}
							
							else {
								pageData.getNewForm ();
							}
						}
					}
					
					else {
						element.incorrect = true;
					}
					
					update ();
				}) }
				
				${ Question (pageData.currentForm.text) }
			</div>`
	},
	
	about: {
		content: () => html
			`<div class = "pageContainer flexColumn fullWidth mediumGap mediumPadding">
				<p class = "smallFont">Some data is taken from BillMounce.com, Basics of Biblical Greek, and GNTReader.com.</p>
				
				<p class = "smallFont">Some data is modified.</p>
				
				<p class = "smallFont">Data may not be accurate.</p>
				
				<p class = "smallFont">Word and form frequencies may not be accurate.</p>
			</div>`
	}
};