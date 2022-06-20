/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

pages.scrabble = {
	setup: () => {
		pageData.words = {};
		
		const addWord = word => {
			if (word.text.length < 2) {
				return;
			}
			
			if (pageData.words [word.text.length] === undefined) {
				pageData.words [word.text.length] = [];
			}
			
			for (let i = 0; i < pageData.words [word.text.length].length; i++) {
				if (pageData.words [word.text.length] [i].text === word.text) {
					return;
				}
			}
			
			pageData.words [word.text.length].push (word);
		};
		
		for (let i = 0; i < constants.vocabulary.length; i++) {
			addWord ({
				lexicalForm: constants.vocabulary [i].lexicalForm,
				text: utilities.simplifyGreek (constants.vocabulary [i].lexicalForm).toUpperCase ()
			});
			
			for (let j = 0; j < constants.vocabulary [i].forms.length; j++) {
				addWord ({
					lexicalForm: constants.vocabulary [i].lexicalForm,
					text: utilities.simplifyGreek (constants.vocabulary [i].forms [j].text).toUpperCase ()
				});
			}
		}
		
		pageData.currentWords = pageData.words;
	},
	
	content: () => html
		`<div class = "pageContainer flexColumnTop">
			<div class = "mediumWidth flex mediumPadding">
				<input class = "fullWidth mediumFont" placeholder = "Search..." oninput = ${ event => {
					pageData.currentWords = {};
					
					for (let i = 0; i < Object.keys (pageData.words).length; i++) {
						pageData.currentWords [Object.keys (pageData.words) [i]] = pageData.words [Object.keys (pageData.words) [i]].filter (word =>
							word.text.toLowerCase ().includes (utilities.simplifyGreek (utilities.englishToGreek (event.target.value.trim ())))
						);
						
						if (pageData.currentWords [Object.keys (pageData.words) [i]].length < 1) {
							delete pageData.currentWords [Object.keys (pageData.words) [i]];
						}
					}
					
					update ();
				} } />
			</div>
			
			<div class = "fullWidth flexTop flexWrap">
				${ Object.keys (pageData.currentWords).map (length =>
					SectionGroup (
						Section (length + "-Letter Words (" + pageData.currentWords [length].length + ")", html
							`<div class = "flex flexWrap extraLargeGap">
								${ pageData.currentWords [length].map (word =>
									SectionLink (word.text, "word/" + word.lexicalForm)
								) }
							</div>`
						)
					)
				) }
			</div>
		</div>`
};