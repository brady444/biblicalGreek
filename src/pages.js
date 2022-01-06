/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

const pages = {
	main: {
		content: () => html
		`<div id = "sections" class = "container flexColumnTop">
			${ SectionGroup ([
				Section ("Bill Mounce", [
					SectionLink ("BillMounce.com", null, "https://billmounce.com"),
					
					SectionLink ("Dictionary", null, "https://www.billmounce.com/greek-dictionary"),
					
					SectionLink ("Workbook Answer Key", null, "http://doxa.billmounce.com.s3.amazonaws.com/bbg4_answer_key.pdf")
				]),
				
				Section ("New Testament", [
					SectionLink ("Reader", null, "https://www.gntreader.com"),
					
					SectionLink ("Interlinear", null, "https://www.abarim-publications.com/Interlinear-New-Testament")
				]),
				
				Section ("Other", [
					SectionLink ("Windows Typing Guide", null, "https://www.ctsfw.edu/wp-content/uploads/2016/02/Greek-Unicode-Keyboard-Input-Windows-10.pdf")
				])
			]) }
			
			${ SectionGroup ([
				Section ("Vocabulary", [
					SectionLink ("Dictionary", () => navigate ("resourcesVocabulary")),
					
					SectionLink ("Spreadsheet", null, "https://docs.google.com/spreadsheets/d/1phUbF1zjwF5YpiVExSZ7FZeG_XsgfkLgpF7ROgaLPCo"),
					
					SectionLink ("Practice", null, "https://quizlet.com/brady2384765/folders/biblical-greek-vocabulary")
				]),
				
				Section ("Paradigms", [
					SectionLink ("View", () => navigate ("resourcesParadigms")),
					
					...Object.values (constants.paradigms).map (paradigm => SectionLink (paradigm.name, () => {
						navigate ("practiceParadigms", {
							paradigmName: paradigm.name
						});
					}))
				]),
				
				Section ("Parsing", [
					SectionLink ("Parser"),
					
					SectionLink ("Practice", () => {
						navigate ("practiceParsing", {
							forms: constants.parsingForms
						});
					})
				])
			]) }
		</div>`
	},
	
	resourcesVocabulary: {
		content: () => html
			`<div class = "container flexColumnTop largeGap largePadding">
				${ constants.vocabulary.map (word => html
					`<div class = "vocabularyWord flexColumn mediumGap mediumPadding">
						<p class = "largeFont">${ word.lexicalForm }</p>
						
						<p class = "mediumFont">Frequency: ${ word.frequency.toLocaleString () }</p>
						
						${ word.forms.length > 0 ? html
							`${ word.forms.map (form => html
								`<div class = "vocabularyForm flexColumnLeft extraSmallGap">
									<p class = "smallFont">${ form.text }</p>
									
									${ form.forms.map (_form => html
										`<p class = "smallFont gray">${ _form.case } ${ _form.number } ${ _form.gender }</p>`
									) }
								</div>`
							) }` :
							null
						}
						
					</div>`
				) }
			</div>`
	},
	
	resourcesParadigms: {
		content: () => html
			`<div class = "container flexColumnTop mediumGap largePadding">
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
			`<div class = "container flexColumn mediumGap largePadding">
				<p class = "largeFont">${ pageData.paradigmName }</p>
			
				${ Paradigm (pageData.currentElements.map (element => ParadigmElement (element))) }
				
				${ Question (pageData.currentElement.text, pageData.currentElement.underlined) }
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
			`<div class = "container flexColumn mediumGap largePadding">
				<p class = "largeFont">${ pageData.currentWord.lexicalForm }</p>
				
				${ Paradigm (Object.values (pageData.squares).map (square => ParadigmForm (square))) }
				
				${ Question (pageData.currentForm.text) }
			</div>`
	}
};