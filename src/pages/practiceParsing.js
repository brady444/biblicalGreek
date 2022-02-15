/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.practiceParsing = {
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
};